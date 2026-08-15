import React, { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import * as tus from 'tus-js-client';
import { initiateDirectUpload, uploadVideoTusToBunny, uploadVideoDirectToBunny, completeDirectUpload, deleteVideo, type Video } from '../api/courses';
import toast from 'react-hot-toast';

export interface UploadTask {
  id: string;
  title: string;
  courseId: string;
  playlistId: string;
  videoId?: string;
  file: File;
  progress: number;
  status: 'uploading' | 'paused' | 'encoding' | 'completed' | 'error';
  errorMessage?: string;
}

interface UploadContextType {
  tasks: UploadTask[];
  startUpload: (
    courseId: string,
    playlistId: string,
    title: string,
    description: string,
    order: number,
    isFreePreview: boolean,
    file: File,
    onSuccess?: (newVid: Video) => void
  ) => Promise<void>;
  dismissTask: (taskId: string) => void;
  clearCompleted: () => void;
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Map of taskId → tus.Upload instance for active TUS uploads.
  // Using a ref so the visibilitychange listener always sees the latest map.
  const tusUploadsRef = useRef<Map<string, tus.Upload>>(new Map());

  // ─── Page Visibility: pause on hidden, resume on visible ──────────────────
  //
  // Mobile Chrome aggressively kills background XHR streams when the user
  // switches apps. We intercept this by calling upload.abort() when the page
  // goes hidden (pause) and upload.start() when it comes back (resume).
  // TUS resumes from the last successfully uploaded byte — no data is lost.
  //
  const handleVisibilityChange = useCallback(() => {
    const isHidden = document.visibilityState === 'hidden';

    if (isHidden) {
      // Pause all active TUS uploads
      for (const [taskId, upload] of tusUploadsRef.current.entries()) {
        console.log(`[UploadContext] Tab hidden — pausing TUS upload for task ${taskId}`);
        upload.abort(false); // false = don't terminate the request, just stop sending chunks
      }
      // Mark uploading tasks as paused in the UI
      setTasks((prev) =>
        prev.map((t) =>
          t.status === 'uploading' && tusUploadsRef.current.has(t.id)
            ? { ...t, status: 'paused' }
            : t
        )
      );
    } else {
      // Resume all paused TUS uploads
      for (const [taskId, upload] of tusUploadsRef.current.entries()) {
        console.log(`[UploadContext] Tab visible — resuming TUS upload for task ${taskId}`);
        upload.start();
      }
      // Mark paused tasks back to uploading
      setTasks((prev) =>
        prev.map((t) =>
          t.status === 'paused' && tusUploadsRef.current.has(t.id)
            ? { ...t, status: 'uploading' }
            : t
        )
      );
    }
  }, []);

  // Register/unregister the visibility listener whenever the set of active
  // TUS uploads changes (i.e. when uploads start or finish).
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  // ─── startUpload ──────────────────────────────────────────────────────────

  const startUpload = async (
    courseId: string,
    playlistId: string,
    title: string,
    description: string,
    order: number,
    isFreePreview: boolean,
    file: File,
    onSuccess?: (newVid: Video) => void
  ) => {
    const taskId = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newTask: UploadTask = {
      id: taskId,
      title,
      courseId,
      playlistId,
      file,
      progress: 0,
      status: 'uploading',
    };

    setTasks((prev) => [...prev, newTask]);
    setIsMinimized(false);

    let createdVideoId: string | null = null;
    try {
      // Step 1: Initiate upload slot on our backend (~1KB lightweight API call)
      const initRes = await initiateDirectUpload(courseId, playlistId, {
        title,
        description,
        order,
        isFreePreview,
      });
      createdVideoId = initRes.videoId;

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, videoId: initRes.videoId } : t))
      );

      const newVid: Video = {
        id: initRes.videoId,
        title,
        description,
        bunnyVideoGuid: initRes.bunnyVideoGuid,
        status: 'uploading',
        order,
        isFreePreview,
        createdAt: { _seconds: Math.floor(Date.now() / 1000) },
      };

      onSuccess?.(newVid);

      // Step 2: Upload binary directly from browser to Bunny CDN
      const onProgress = (percent: number) => {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, progress: percent } : t))
        );
      };

      if (initRes.libraryId && initRes.bunnyVideoGuid && initRes.tusSignature && initRes.tusExpire) {
        console.log(`[UploadContext] TUS Resumable Upload for video: ${initRes.bunnyVideoGuid}`);
        try {
          // Get the upload handle so we can abort/resume it via visibilitychange
          const handle = uploadVideoTusToBunny(
            file,
            initRes.libraryId,
            initRes.bunnyVideoGuid,
            initRes.tusSignature,
            initRes.tusExpire,
            onProgress
          );

          // Register the tus.Upload instance so the visibility listener can control it
          tusUploadsRef.current.set(taskId, handle.upload);

          // Wait for the upload to complete
          await handle.promise;
        } catch (tusError: any) {
          console.warn(`[UploadContext] TUS upload failed for ${initRes.bunnyVideoGuid}, falling back to direct upload:`, tusError);
          // Clean up TUS fingerprint so direct upload starts fresh
          try {
            window.localStorage.removeItem(
              `tus::bunny-tus-${initRes.libraryId}-${initRes.bunnyVideoGuid}::${initRes.tusExpire}`
            );
          } catch { /* ignore */ }
          await uploadVideoDirectToBunny(initRes.uploadUrl, initRes.apiKey, file, onProgress);
        } finally {
          // Always remove the upload instance from the active map when done
          tusUploadsRef.current.delete(taskId);
        }
      } else {
        console.log(`[UploadContext] Falling back to direct upload for video: ${initRes.bunnyVideoGuid}`);
        await uploadVideoDirectToBunny(initRes.uploadUrl, initRes.apiKey, file, onProgress);
      }

      // Step 3: Notify backend — flip Firestore status from 'uploading' → 'ready'
      try {
        await completeDirectUpload(courseId, playlistId, initRes.videoId);
      } catch (completeErr) {
        console.warn(`[UploadContext] completeDirectUpload notice failed:`, completeErr);
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t))
      );
      toast.success(`"${title}" uploaded to Bunny Stream!`);
    } catch (err: any) {
      tusUploadsRef.current.delete(taskId);
      console.error(`Upload error for task ${taskId}:`, err);
      const rawMsg = err.response?.data?.Message || err.response?.data?.message || err.message || '';
      const msg = typeof rawMsg === 'string' ? rawMsg : 'Upload failed.';

      // Bunny CDN already has this video — mark as complete
      if (msg.toLowerCase().includes('already been uploaded')) {
        console.log(`[UploadContext] Video "${title}" already on Bunny CDN. Completing registration...`);
        if (createdVideoId) {
          try {
            await completeDirectUpload(courseId, playlistId, createdVideoId);
          } catch (completeErr) {
            console.warn(`[UploadContext] completeDirectUpload notice failed:`, completeErr);
          }
        }
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: 'completed', progress: 100 } : t))
        );
        toast.success(`"${title}" uploaded to Bunny Stream!`);
        return;
      }

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'error', errorMessage: msg } : t))
      );

      // Clean up orphaned Firestore video document
      if (createdVideoId) {
        try {
          await deleteVideo(courseId, playlistId, createdVideoId);
        } catch (cleanupErr) {
          console.warn(`[UploadContext] Failed to clean up video doc ${createdVideoId}:`, cleanupErr);
        }
      }

      toast.error(`Failed to upload "${title}": ${msg}`);
    }
  };

  const dismissTask = (taskId: string) => {
    // If this is an active TUS upload, abort it before dismissing
    const tusUpload = tusUploadsRef.current.get(taskId);
    if (tusUpload) {
      tusUpload.abort(true); // true = terminate the upload entirely
      tusUploadsRef.current.delete(taskId);
    }
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => t.status !== 'completed'));
  };

  return (
    <UploadContext.Provider
      value={{
        tasks,
        startUpload,
        dismissTask,
        clearCompleted,
        isMinimized,
        setIsMinimized,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadManager = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUploadManager must be used within an UploadProvider');
  }
  return context;
};
