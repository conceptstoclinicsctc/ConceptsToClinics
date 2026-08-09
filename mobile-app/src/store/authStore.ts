import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const SESSION_TOKEN_KEY = "sessionToken";
const SESSION_PROFILE_KEY = "sessionProfile";

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
 * Persists sessionToken AND profile data to SecureStore for app restarts.
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
    await SecureStore.setItemAsync(
      SESSION_PROFILE_KEY,
      JSON.stringify({ uid, email, displayName, studentId })
    );
    set({
      uid,
      email,
      displayName,
      studentId,
      sessionToken,
      isAuthenticated: true,
      isLocked: false,
      lockReason: null,
    });
  },

  clearSession: async () => {
    await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
    await SecureStore.deleteItemAsync(SESSION_PROFILE_KEY);
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
   * Called at app startup — restores session AND profile from SecureStore.
   * Returns true if a valid session was found.
   */
  loadSession: async () => {
    const token = await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
    const profileStr = await SecureStore.getItemAsync(SESSION_PROFILE_KEY);

    if (token && profileStr) {
      try {
        const { uid, email, displayName, studentId } = JSON.parse(profileStr);
        set({
          sessionToken: token,
          uid,
          email,
          displayName,
          studentId,
          isAuthenticated: true,
        });
        return true;
      } catch {
        // Corrupted profile data — treat as no session, force fresh login
        await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
        await SecureStore.deleteItemAsync(SESSION_PROFILE_KEY);
        return false;
      }
    }

    // Token exists but profile doesn't (or vice versa) — inconsistent state, clear both
    if (token || profileStr) {
      await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
      await SecureStore.deleteItemAsync(SESSION_PROFILE_KEY);
    }

    return false;
  },
}));