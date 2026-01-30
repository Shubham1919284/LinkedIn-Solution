import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        const projectId = process.env.FIREBASE_PROJECT_ID || "linkedin-games-solver-e8de7";
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;

        // If we have credentials, use them
        if (clientEmail && privateKey) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
                storageBucket: "linkedin-games-solver-e8de7.appspot.com",
            });
            console.log("Firebase Admin initialized with service account");
        } else {
            // Fallback: Use application default credentials (for local development)
            admin.initializeApp({
                projectId,
                storageBucket: "linkedin-games-solver-e8de7.appspot.com",
            });
            console.log("Firebase Admin initialized with default credentials");
        }
    } catch (error) {
        console.error("Firebase Admin initialization error:", error);
        throw error;
    }
}

export const adminDb = admin.firestore();
export const adminStorage = admin.storage();
export const adminAuth = admin.auth();
