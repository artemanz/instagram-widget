import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3fQP0p1-Xf3CzFTJTf3QJ-m1PJD0sTec",
  authDomain: "instagram-widget-f29f7.firebaseapp.com",
  projectId: "instagram-widget-f29f7",
  storageBucket: "instagram-widget-f29f7.appspot.com",
  messagingSenderId: "467497182860",
  appId: "1:467497182860:web:ab3617882586f06570fda9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
