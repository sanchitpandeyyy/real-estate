// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sanchitestate.firebaseapp.com",
  projectId: "sanchitestate",
  storageBucket: "sanchitestate.appspot.com",
  messagingSenderId: "999277652210",
  appId: "1:999277652210:web:3900d53a1379b036fbc86b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);