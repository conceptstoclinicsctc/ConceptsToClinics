import apiClient from "./client";

export interface ProgressUpdateParams {
  videoId: string;
  courseId: string;
  playlistId?: string;
  watchedSeconds: number;
  totalSeconds: number;
}

export interface ProgressRecord {
  videoId: string;
  courseId: string;
  watchedSeconds: number;
  totalSeconds: number;
  percentComplete: number;
  isCompleted: boolean;
  lastWatchedAt: string;
}

// ─── Update Progress ──────────────────────────────────────────────────────────

export const updateProgress = async (params: ProgressUpdateParams): Promise<void> => {
  await apiClient.post("/progress/update", params);
};

// ─── Fetch Course Progress ────────────────────────────────────────────────────

export const fetchCourseProgress = async (
  courseId: string
): Promise<ProgressRecord[]> => {
  const response = await apiClient.get<{ progress: ProgressRecord[] }>(
    `/progress/${courseId}`
  );
  return response.data.progress;
};
