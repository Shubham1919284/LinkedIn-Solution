import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDTOJ5PPI7kHhu8haF-fO1EWHdUSoerCsg",
  authDomain: "linkedin-games-solver-e8de7.firebaseapp.com",
  projectId: "linkedin-games-solver-e8de7",
  storageBucket: "linkedin-games-solver-e8de7.firebasestorage.app",
  messagingSenderId: "579123426950",
  appId: "1:579123426950:web:0761d835c702c704688307",
  measurementId: "G-68BBHW0NQB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics (safe check for SSR)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}
export { analytics };
