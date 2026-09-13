# Signing Key — DO NOT REGENERATE

This app is permanently signed with:
`android/app/concepts-to-clinics-release.keystore`

**This file and its credentials must be preserved and reused for EVERY future release build, forever.**

Generating a new keystore or changing signing keys will break updates for all students who have already installed the app. They will encounter:
1. **"Package conflicts with an existing package"** when attempting to install an update.
2. **`AndroidID` recalculation** (Android OS derives `ANDROID_ID` using the app's signing key on Android 8.0+), causing the backend device-binding check to detect a "new device" and lock the student's account.

---

### Keystore Specifications
- **File Location**: `mobile-app/android/app/concepts-to-clinics-release.keystore`
- **Key Alias**: `conceptstoclinics`
- **Certificate Owner**: `CN=ConceptsToClinics, OU=Mobile, O=ConceptsToClinics, L=City, ST=State, C=US`
- **Validity**: Until **Dec 31, 2053**
- **SHA-256 Fingerprint**: `5D:6F:23:8D:EC:F0:71:5B:9D:08:DB:3B:1C:39:AB:9D:B7:88:C5:72:6E:33:99:D0:FA:AD:5D:63:B9:FD:D7:14`
- **SHA-1 Fingerprint**: `9B:DA:59:D4:A2:03:EB:57:8B:47:0D:84:68:FE:EE:DF:97:43:35:94`

---

### Credentials Configuration
Stored locally in `mobile-app/android/gradle.properties` (gitignored, never commit to GitHub):
```properties
CC_KEYSTORE_PASSWORD=conceptstoclinics123
CC_KEY_ALIAS=conceptstoclinics
CC_KEY_PASSWORD=conceptstoclinics123
```
Or passed via environment variables during CI/CD:
`CC_KEYSTORE_PASSWORD`, `CC_KEY_ALIAS`, `CC_KEY_PASSWORD`.

---

### Standard Build Command
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```
Output APK:
`android/app/build/outputs/apk/release/app-release.apk`
