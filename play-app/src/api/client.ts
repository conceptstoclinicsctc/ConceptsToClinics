import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { useAuthStore } from "../store/authStore";
import { getDeviceId } from "../utils/deviceId";
import auth from "@react-native-firebase/auth";

/**
 * Axios instance for all API calls.
 *
 * Request interceptor: attaches Firebase ID token, session token, and device ID headers.
 * Response interceptor: on 401 SESSION_INVALID → clears session → triggers re-login.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// ── Request interceptor ────────────────────────────────────────────────────────
apiClient.interceptors.request.use(async (config) => {
  const { sessionToken } = useAuthStore.getState();
  const deviceId = await getDeviceId();

  // Attach Firebase ID token on every request (required by verifyToken middleware)
  let currentUser = auth().currentUser;
  
  // If currentUser is null, Firebase might just be initializing. Wait for the first state change.
  if (currentUser === null) {
    currentUser = await new Promise((resolve) => {
      const unsubscribe = auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    config.headers["Authorization"] = `Bearer ${idToken}`;
  }

  if (sessionToken) {
    config.headers["x-session-token"] = sessionToken;
  }
  if (deviceId) {
    config.headers["x-device-id"] = deviceId;
  }

  return config;
});


// ── Response interceptor ───────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const code = error?.response?.data?.code;

    // Session invalid — clear local session and force re-login
    if (status === 401 && code === "SESSION_INVALID") {
      await useAuthStore.getState().clearSession();
      // Navigation is handled by the root navigator watching isAuthenticated
    }

    // Account locked — set locked state
    if (status === 403 && (code === "ACCOUNT_LOCKED" || code === "DEVICE_MISMATCH_LOCKED")) {
      useAuthStore.getState().setLocked();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
