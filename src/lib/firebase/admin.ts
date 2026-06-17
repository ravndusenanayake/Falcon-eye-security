import * as admin from 'firebase-admin';

function getFirebaseAdmin() {
  if (admin.apps.length) {
    return admin;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  const isConfigured = 
    projectId && 
    clientEmail && 
    privateKey && 
    privateKey.includes('-----BEGIN PRIVATE KEY-----');

  if (!isConfigured) {
    return null;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    return admin;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    return null;
  }
}

export const getAdminDb = () => {
  const app = getFirebaseAdmin();
  return app ? app.firestore() : null;
};

export const getAdminAuth = () => {
  const app = getFirebaseAdmin();
  return app ? app.auth() : null;
};


