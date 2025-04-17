"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { memoize } from "lodash-es";

// Use the same configuration structure as the server-side firebase.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "webs  ite-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb",
};

// Check if Firebase is already initialized
export const getClientFirebase = memoize(() => {
  // Use existing app if already initialized, otherwise initialize a new one
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { app, db };
});

// Load movie by ID
export async function loadMovieById(movieId) {
  const { db } = getClientFirebase();
  const docRef = doc(db, "website-by-movie-screenings", movieId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

// Update movie data
export async function updateMovieData(movieId, data) {
  const { db } = getClientFirebase();
  const docRef = doc(db, "website-by-movie-screenings", movieId);
  return updateDoc(docRef, data);
}
