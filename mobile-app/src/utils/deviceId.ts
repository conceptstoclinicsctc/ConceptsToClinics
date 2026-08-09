import DeviceInfo from "react-native-device-info";
import * as SecureStore from "expo-secure-store";

const DEVICE_ID_KEY = "deviceId"; // fallback key only, kept for edge cases

/**
 * Returns a stable device identifier.
 *
 * Primary: Android ID — tied to the device + Google account, survives
 * app uninstall/reinstall, only resets on factory reset or Google
 * account removal. This is what device binding is actually checked against.
 *
 * Fallback: if AndroidID is genuinely unavailable (rare), falls back to a
 * SecureStore-persisted UUID so login never crashes — this fallback is
 * weaker (resets on uninstall) but keeps the app functional.
 */
export const getDeviceId = async (): Promise<string> => {
  try {
    const androidId = await DeviceInfo.getAndroidId();
    if (androidId && androidId !== "unknown" && androidId.length > 0) {
      console.log("[getDeviceId] Hardware AndroidID:", androidId);
      return androidId;
    }
  } catch (err) {
    console.warn("[getDeviceId] AndroidID unavailable, falling back:", err);
  }

  let fallbackId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (!fallbackId) {
    fallbackId = `fallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    await SecureStore.setItemAsync(DEVICE_ID_KEY, fallbackId);
  }
  return fallbackId;
};

/**
 * Returns human-readable device info (model, OS version, friendly name)
 * alongside the device ID, for display in the admin dashboard.
 */
export const getDeviceFingerprint = async () => {
  const deviceId = await getDeviceId();
  const model = DeviceInfo.getModel();
  const systemVersion = DeviceInfo.getSystemVersion();
  const friendlyName = await DeviceInfo.getDeviceName();

  return {
    deviceId,
    deviceName: `${model} (Android ${systemVersion})`,
    deviceFriendlyName: friendlyName,
  };
};

/**
 * Clears the SecureStore fallback ID only.
 * Cannot and does not clear AndroidID — it's tied to the OS/Google account,
 * not app storage. Only relevant for devices that landed on the fallback path.
 */
export const clearDeviceId = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
};
