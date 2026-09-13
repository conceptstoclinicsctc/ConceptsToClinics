import { NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { SecurityModule } = NativeModules;

/**
 * Checks whether the app is running in an emulator, virtual machine, or PC environment.
 * Uses a two-tier defense:
 * 1. Custom native Kotlin SecurityModule (checks QEMU/VBox pipes, BlueStacks/Nox/LDPlayer filesystem markers, /proc/cpuinfo desktop CPU flags, hardware sensors).
 * 2. react-native-device-info isEmulator() (cross-checks build properties and generic fingerprints).
 */
export const checkIsEmulator = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return false;
  }

  let nativeDetected = false;
  let deviceInfoDetected = false;

  // 1. Native Kotlin Security Check
  try {
    if (SecurityModule && typeof SecurityModule.isEmulator === 'function') {
      nativeDetected = await SecurityModule.isEmulator();
      if (nativeDetected) {
        console.warn('[Security] Emulator detected via native SecurityModule heuristics.');
        return true;
      }
    }
  } catch (err) {
    console.warn('[Security] Native SecurityModule check failed:', err);
  }

  // 2. React Native Device Info Check
  try {
    deviceInfoDetected = await DeviceInfo.isEmulator();
    if (deviceInfoDetected) {
      console.warn('[Security] Emulator detected via DeviceInfo.isEmulator().');
      return true;
    }
  } catch (err) {
    console.warn('[Security] DeviceInfo isEmulator check failed:', err);
  }

  return false;
};
