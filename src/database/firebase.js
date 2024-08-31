import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQzzPdfSpiwv7SJvBkJlfc0f4tMrQ1x1o",
  authDomain: "donkey-business-9bd22.firebaseapp.com",
  projectId: "donkey-business-9bd22",
  storageBucket: "donkey-business-9bd22.appspot.com",
  messagingSenderId: "285067581032",
  appId: "1:285067581032:web:492c15ee75c1d133218ddd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth(app);

export const matchesRef = collection(database, "matches");
export const teamRef = collection(database, "team");
export const streamsRef = collection(database, "streams");
