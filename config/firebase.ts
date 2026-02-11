import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

// Safe access to environment variables supporting both Vite (import.meta.env) and standard (process.env)
const getEnv = (key: string) => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return undefined;
};

// Explicitly mapping VITE_ keys as provided in the environment
const firebaseConfig = {
  apiKey: 
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_API_KEY : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_API_KEY : undefined),
    
  authDomain: 
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_AUTH_DOMAIN : undefined),

  // Optional: Realtime Database URL (if using RTDB)
  databaseURL:
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_DATABASE_URL : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_DATABASE_URL : undefined),

  projectId: 
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_PROJECT_ID : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_PROJECT_ID : undefined),

  storageBucket: 
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_STORAGE_BUCKET : undefined),

  messagingSenderId: 
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_MESSAGING_SENDER_ID : undefined),

  appId: 
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_APP_ID : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_APP_ID : undefined),

  // Optional: Analytics measurement ID
  measurementId:
    // @ts-ignore
    (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FIREBASE_MEASUREMENT_ID : undefined) || 
    (typeof process !== 'undefined' && process.env ? process.env.VITE_FIREBASE_MEASUREMENT_ID : undefined),
};

let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;

// Only initialize if we have the critical API key
if (firebaseConfig.apiKey) {
    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
    } catch (error) {
        console.error("Firebase Initialization Error:", error);
    }
} else {
    console.warn("Firebase API key is missing. Authentication will be disabled.");
}

export { auth, googleProvider };