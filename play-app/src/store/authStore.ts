import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const SESSION_TOKEN_KEY = "sessionToken";

interface AuthState {
  // State
  uid: string | null;
  email: string | null;
  displayName: string | null;
  studentId: string | null;
  sessionToken: string | null;
  isAuthenticated: boolean;
  isLocked: boolean;
  lockReason: string | null;

  // Actions
  setSession: (params: {
    uid: string;
    email: string;
    displayName: string;
    studentId: string;
    sessionToken: string;
  }) => Promise<void>;
  clearSession: () => Promise<void>;
  setLocked: (reason?: string) => void;
  loadSession: () => Promise<boolean>;
}

/**
 * Zustand auth store.
 * Persists sessionToken to SecureStore for app restarts.
 */
export const useAuthStore = create<AuthState>((set) => ({
  uid: null,
  email: null,
  displayName: null,
  studentId: null,
  sessionToken: null,
  isAuthenticated: false,
  isLocked: false,
  lockReason: null,

  setSession: async ({ uid, email, displayName, studentId, sessionToken }) => {
    await SecureStore.setItemAsync(SESSION_TOKEN_KEY, sessionToken);
    set({ uid, email, displayName, studentId, sessionToken, isAuthenticated: true, isLocked: false, lockReason: null });
  },

  clearSession: async () => {
    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
    set({
      uid: null,
      email: null,
      displayName: null,
      studentId: null,
      sessionToken: null,
      isAuthenticated: false,
      isLocked: false,
      lockReason: null,
    });
  },

  setLocked: (reason?: string) => {
    set({ isLocked: true, isAuthenticated: false, lockReason: reason ?? 'DEVICE_MISMATCH_LOCKED' });
  },

  /**
   * Called at app startup — restores session from SecureStore.
   * Returns true if a session was found.
   */
  loadSession: async () => {
    const token = await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
    if (token) {
      set({ sessionToken: token, isAuthenticated: true });
      return true;
    }
    return false;
  },
}));
