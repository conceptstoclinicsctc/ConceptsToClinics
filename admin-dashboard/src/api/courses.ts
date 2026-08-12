import apiClient from './client';
import axios from 'axios';
import * as tus from 'tus-js-client';

export interface InitiateUploadResult {
  videoId: string;
  bunnyVideoGuid: string;
  uploadUrl: string;
  apiKey: string;
  libraryId?: string;
  tusSignature?: string;
  tusExpire?: number;
}

export const initiateDirectUpload = async (
  courseId: string,
  playlistId: string,
  data: { title: string; description: string; order: number; isFreePreview: boolean }
): Promise<InitiateUploadResult> => {
  const res = await apiClient.post(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos/initiate-upload`,
    data
  );
  return res.data;
};

export const uploadVideoTusToBunny = (
  file: File,
  libraryId: string,
  bunnyVideoGuid: string,
  tusSignature: string,
  tusExpire: number,
  onProgress?: (percent: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: 'https://video.bunnycdn.com/tusupload',
      fingerprint: () => Promise.resolve(`bunny-tus-${libraryId}-${bunnyVideoGuid}`),
      retryDelays: [0, 1000, 3000, 5000, 10000, 20000],
      chunkSize: 5 * 1024 * 1024, // 5MB chunks for smooth background uploads
      headers: {
        AuthorizationSignature: tusSignature,
        AuthorizationExpire: String(tusExpire),
        VideoId: bunnyVideoGuid,
        LibraryId: String(libraryId),
      },
      onShouldRetry: (error) => {
        console.warn('[TUS Upload] Network or background disconnect detected, retrying chunk...', error);
        return true;
      },
      onError: (error: any) => {
        const msg = error?.originalResponse?.getBody?.() || error?.message || '';
        if (typeof msg === 'string' && msg.toLowerCase().includes('already been uploaded')) {
          console.log(`[TUS Upload] Video ${bunnyVideoGuid} already uploaded to Bunny Stream, marking as success.`);
          resolve();
          return;
        }
        console.error('[TUS Upload Error]', error);
        reject(error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        if (bytesTotal > 0) {
          const percent = Math.round((bytesUploaded / bytesTotal) * 100);
          onProgress?.(percent);
        }
      },
      onSuccess: () => {
        console.log(`[TUS Upload] Successfully completed upload for video ${bunnyVideoGuid}`);
        resolve();
      },
    });

    upload
      .findPreviousUploads()
      .then((previousUploads) => {
        if (previousUploads.length > 0) {
          console.log(`[TUS Upload] Found previous interrupted session for ${bunnyVideoGuid}, resuming from previous offset...`);
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
      })
      .catch((err) => {
        console.warn(`[TUS Upload] findPreviousUploads failed/empty, starting fresh upload session:`, err);
        upload.start();
      });
  });
};

export const uploadVideoDirectToBunny = async (
  uploadUrl: string,
  apiKey: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<void> => {
  try {
    await axios.put(uploadUrl, file, {
      headers: {
        AccessKey: apiKey,
        'Content-Type': 'application/octet-stream',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percent);
        }
      },
    });
  } catch (err: any) {
    const errMsg = err?.response?.data?.Message || err?.response?.data?.message || err?.message || '';
    if (typeof errMsg === 'string' && errMsg.toLowerCase().includes('already been uploaded')) {
      console.log('[Bunny Direct Upload] Video already uploaded to Bunny Stream CDN — marking as successful completion.');
      onProgress?.(100);
      return;
    }
    throw err;
  }
};

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  order: number;
  isPublished: boolean;
  durationDays?: number;
  totalPlaylists: number;
  totalVideos: number;
  createdAt: { _seconds: number };
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  order: number;
  totalVideos: number;
  createdAt: { _seconds: number };
}

export interface Video {
  id: string;
  title: string;
  description: string;
  bunnyVideoGuid: string;
  status: 'uploading' | 'processing' | 'ready' | 'failed';
  duration?: number;
  order: number;
  isFreePreview: boolean;
  uploadedAt?: { _seconds: number };
  createdAt: { _seconds: number };
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export const getCourses = async (): Promise<Course[]> => {
  const res = await apiClient.get('/admin/courses');
  return res.data.courses;
};

export const createCourse = async (data: {
  title: string;
  description: string;
  thumbnail: string;
  order: number;
  durationDays?: number;
}): Promise<Course> => {
  const res = await apiClient.post('/admin/courses', data);
  return res.data;
};

export const updateCourse = async (
  id: string,
  data: Partial<{ title: string; description: string; thumbnail: string; order: number; isPublished: boolean; durationDays?: number }>
): Promise<void> => {
  await apiClient.put(`/admin/courses/${id}`, data);
};

// ─── Playlists ────────────────────────────────────────────────────────────────

export const getCoursePlaylists = async (courseId: string): Promise<Playlist[]> => {
  const res = await apiClient.get(`/admin/courses/${courseId}/playlists`);
  return res.data.playlists;
};

export const createPlaylist = async (
  courseId: string,
  data: { title: string; description: string; thumbnail: string; order: number }
): Promise<Playlist> => {
  const res = await apiClient.post(`/admin/courses/${courseId}/playlists`, data);
  return res.data;
};

export const updatePlaylist = async (
  courseId: string,
  playlistId: string,
  data: Partial<{ title: string; description: string; thumbnail: string; order: number }>
): Promise<void> => {
  await apiClient.put(`/admin/courses/${courseId}/playlists/${playlistId}`, data);
};

export const deletePlaylist = async (courseId: string, playlistId: string): Promise<void> => {
  await apiClient.delete(`/admin/courses/${courseId}/playlists/${playlistId}`);
};

export interface AttachablePlaylist {
  playlistId: string;
  playlistTitle: string;
  playlistDescription: string;
  totalVideos: number;
  sourceCourseId: string;
  sourceCourseTitle: string;
}

export const getAllPlaylists = async (): Promise<AttachablePlaylist[]> => {
  const res = await apiClient.get('/admin/playlists/all');
  return res.data.playlists;
};

export const attachExistingPlaylist = async (
  targetCourseId: string,
  data: { sourceCourseId: string; sourcePlaylistId: string; order: number }
): Promise<Playlist> => {
  const res = await apiClient.post(`/admin/courses/${targetCourseId}/playlists/attach-existing`, data);
  return res.data;
};

// ─── Videos ───────────────────────────────────────────────────────────────────

export const getPlaylistVideos = async (courseId: string, playlistId: string): Promise<Video[]> => {
  const res = await apiClient.get(`/admin/courses/${courseId}/playlists/${playlistId}/videos`);
  return res.data.videos;
};

export const completeDirectUpload = async (
  courseId: string,
  playlistId: string,
  videoId: string
): Promise<void> => {
  await apiClient.post(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos/${videoId}/complete-upload`
  );
};

export const uploadVideo = async (
  courseId: string,
  playlistId: string,
  formData: FormData,
  onProgress?: (percent: number) => void
): Promise<Video> => {
  const res = await apiClient.post(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percent);
        }
      },
    }
  );
  return res.data;
};

export const replaceVideo = async (
  courseId: string,
  playlistId: string,
  videoId: string,
  formData: FormData,
  onProgress?: (percent: number) => void
): Promise<void> => {
  await apiClient.post(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos/${videoId}/replace`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percent);
        }
      },
    }
  );
};

export const createVideo = async (
  courseId: string,
  playlistId: string,
  data: { title: string; description: string; bunnyVideoGuid: string; order: number; isFreePreview: boolean }
): Promise<Video> => {
  const res = await apiClient.post(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos`,
    data
  );
  return res.data;
};

export const updateVideo = async (
  courseId: string,
  playlistId: string,
  videoId: string,
  data: Partial<{ title: string; description: string; bunnyVideoGuid: string; order: number; isFreePreview: boolean }>
): Promise<void> => {
  await apiClient.put(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos/${videoId}`,
    data
  );
};

export const deleteVideo = async (
  courseId: string,
  playlistId: string,
  videoId: string
): Promise<void> => {
  await apiClient.delete(
    `/admin/courses/${courseId}/playlists/${playlistId}/videos/${videoId}`
  );
};
