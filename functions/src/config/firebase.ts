import * as admin from "firebase-admin";

/**
 * Firebase Admin SDK initialisation.
 * Called once at cold start. All modules import from here.
 */
if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();
export const auth = admin.auth();
export { admin };
