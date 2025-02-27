// lib/directors.ts
import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { getFirebase } from "./firebase";

export interface DirectorInfo {
  director_id: string;
  director_name: string;
  director_movies: string[];
}

export const getDirectorMovies = unstable_cache(
  async (directorId: string): Promise<DirectorInfo> => {
    const { db } = getFirebase();
    const docRef = doc(db, "director-info", directorId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Director not found");
    }

    return docSnap.data() as DirectorInfo;
  },
  ["director-info"],
  { revalidate: 60 },
);
