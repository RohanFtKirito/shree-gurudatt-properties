import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFgvYRboJdhvB4vCzbZ52cjlTF0lef8Fk",
  authDomain: "shree-gurudatt-properties.firebaseapp.com",
  projectId: "shree-gurudatt-properties",
  storageBucket: "shree-gurudatt-properties.firebasestorage.app",
  messagingSenderId: "1020247950978",
  appId: "1:1020247950978:web:971864b45f75e4fdcd969b"
};

// Initialize Firebase only on client side or if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

