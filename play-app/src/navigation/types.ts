/**
 * Navigation type definitions.
 * Import these in screens to get typed navigation props.
 */

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  AccountLocked: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Course: {
    courseId: string;
    courseTitle: string;
    courseDescription?: string;
    thumbnail?: string;
    totalVideos?: number;
    isEnrolled?: boolean;
  };
  Playlist: {
    courseId: string;
    courseTitle: string;
    playlistId: string;
    playlistTitle: string;
    playlistDescription?: string;
    thumbnail?: string;
    totalVideos: number;
  };
  VideoPlayer: {
    videoId: string;
    courseId: string;
    playlistId: string;
    videoTitle: string;
    videoDescription?: string;
    resumeSeconds?: number;
    videoDuration?: number;
  };
  Profile: undefined;
};
