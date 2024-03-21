import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { memoize } from "lodash-es";
import "server-only";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "website-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb",
};

export const getFirebase = memoize(() => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  return { app, db };
});
