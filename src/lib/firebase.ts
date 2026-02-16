import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxrMOVz0sJptznxCndRJ3JgkRrtRBghrk",
  authDomain: "zenith-5284d.firebaseapp.com",
  projectId: "zenith-5284d",
  storageBucket: "zenith-5284d.firebasestorage.app",
  messagingSenderId: "197778950032",
  appId: "1:197778950032:web:dc5eb6eae3c13a1d42d515",
  measurementId: "G-B22HV8MPXM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();