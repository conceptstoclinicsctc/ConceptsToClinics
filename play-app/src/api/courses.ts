import apiClient from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  totalPlaylists: number;
  totalVideos: number;
  completedVideos: number;
  progressPercent: number;
  isEnrolled?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  order: number;
  totalVideos: number;
  completedVideos: number;
  progressPercent: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  bunnyVideoGuid?: string;
  status?: string;
  duration?: number;
  order: number;
  isFreePreview: boolean;
  isCompleted: boolean;
  watchedSeconds: number;
  percentComplete: number;
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export const fetchEnrolledCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get<{ courses: Course[] }>("/courses");
  return response.data.courses;
};

// ─── Playlists ────────────────────────────────────────────────────────────────

export const fetchCoursePlaylists = async (courseId: string): Promise<Playlist[]> => {
  const response = await apiClient.get<{ playlists: Playlist[] }>(
    `/courses/${courseId}/playlists`
  );
  return response.data.playlists;
};

// ─── Videos ───────────────────────────────────────────────────────────────────

export const fetchPlaylistVideos = async (
  courseId: string,
  playlistId: string
): Promise<Video[]> => {
  const response = await apiClient.get<{ videos: Video[] }>(
    `/courses/${courseId}/playlists/${playlistId}/videos`
  );
  return response.data.videos;
};

// ─── Stream ───────────────────────────────────────────────────────────────────

export interface StreamResult {
  embedUrl: string;
  title: string;
  videoId: string;
  courseId: string;
  playlistId: string;
}

export const fetchVideoStream = async (
  videoId: string,
  courseId: string,
  playlistId: string
): Promise<StreamResult> => {
  const response = await apiClient.get<StreamResult>(`/videos/${videoId}/stream`, {
    params: { courseId, playlistId },
  });
  return response.data;
};
