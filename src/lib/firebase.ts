import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { memoize } from "lodash-es";
import "server-only";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "le-retro-projecteur.firebaseapp.com",
  projectId: "le-retro-projecteur",
  storageBucket: "le-retro-projecteur.appspot.com",
  messagingSenderId: "257489536789",
  appId: "1:257489536789:web:5ef8b534d7d62b0d424b1c",
};

export const getFirebase = memoize(() => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  return { app, db };
});
