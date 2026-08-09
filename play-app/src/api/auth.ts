import auth from "@react-native-firebase/auth";
import apiClient from "./client";
import { getDeviceFingerprint } from "../utils/deviceId";

// ─── Register ──────────────────────────────────────────────────────────────────

export interface RegisterParams {
  email: string;
  password: string;
  displayName: string;
  signupCode: string;
}

export const registerStudent = async (params: RegisterParams): Promise<LoginResult> => {
  // Step 1: Create the account on the backend (validates signup code, creates Firebase user)
  await apiClient.post("/auth/register", params);

  // Step 2: Sign in with Firebase Auth to get an ID token
  const userCredential = await auth().signInWithEmailAndPassword(params.email, params.password);
  const idToken = await userCredential.user.getIdToken();
  const { deviceId, deviceName, deviceFriendlyName } = await getDeviceFingerprint();

  // Step 3: Call our backend login to bind device + get session token
  const response = await apiClient.post<{ sessionToken: string; studentId: string }>(
    "/auth/login",
    { deviceName, deviceFriendlyName },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "x-device-id": deviceId,
      },
    }
  );

  return {
    sessionToken: response.data.sessionToken,
    studentId: response.data.studentId,
    uid: userCredential.user.uid,
    email: userCredential.user.email ?? params.email,
    displayName: userCredential.user.displayName ?? params.displayName,
  };
};

// ─── Login ────────────────────────────────────────────────────────────────────

export interface LoginResult {
  sessionToken: string;
  uid: string;
  email: string;
  displayName: string;
  studentId: string;
}

export const loginStudent = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  // Step 1: Sign in with Firebase Auth to get ID token
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  const idToken = await userCredential.user.getIdToken();
  const { deviceId, deviceName, deviceFriendlyName } = await getDeviceFingerprint();

  // Step 2: Call our backend login endpoint with ID token + device ID.
  const response = await apiClient.post<{ sessionToken: string; studentId: string }>(
    "/auth/login",
    { deviceName, deviceFriendlyName },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "x-device-id": deviceId,
      },
    }
  );

  return {
    sessionToken: response.data.sessionToken,
    studentId: response.data.studentId,
    uid: userCredential.user.uid,
    email: userCredential.user.email ?? email,
    displayName: userCredential.user.displayName ?? "",
  };
};

// ─── Logout ───────────────────────────────────────────────────────────────────

export const logoutStudent = async (idToken: string): Promise<void> => {
  try {
    await apiClient.post(
      "/auth/logout",
      {},
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
  } finally {
    // Always sign out of Firebase even if backend call fails
    await auth().signOut();
  }
};

// ─── Get current ID token ─────────────────────────────────────────────────────

export const getCurrentIdToken = async (): Promise<string | null> => {
  const user = auth().currentUser;
  if (!user) return null;
  return user.getIdToken();
};
