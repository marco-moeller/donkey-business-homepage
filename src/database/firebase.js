import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth(app);

export const matchesRef = collection(database, "matches");
export const teamRef = collection(database, "team");
export const streamsRef = collection(database, "streams");

export const matchesArchiveRef = collection(database, "matches_archive");
export const teamArchiveRef = collection(database, "team_archive");
export const streamsArchiveRef = collection(database, "streams_archive");
