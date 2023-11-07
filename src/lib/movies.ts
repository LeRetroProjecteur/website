import { getDocs } from "firebase/firestore";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { cache } from "react";

import { getFirebase } from "./firebase";

export const revalidate = 3600;

export interface Movie {
  directors: string;
  tags: string;
  year: string;
  title: string;
  countries: string;
  original_title: string;
  id: string;
  language: string;
  showtimes_theater: ShowtimesTheater[];
}

export interface ShowtimesTheater {
  showtimes: number[];
  location_2: string;
  zipcode_clean: string;
  clean_name: string;
}

export function checkNotNull<T>(check: T | null | undefined): T {
  if (check == null) {
    throw new Error();
  }
  return check;
}

export const getDayMovies = cache(async (date: Date) => {
  const { db } = getFirebase();
  const q = query(
    collection(db, "website-by-date-screenings"),
    where("date", "==", dateToString(date)),
  );
  const docs: Movie[] = [];
  (await getDocs(q)).forEach((doc: any) => docs.push(...doc.data().movies));
  return docs;
});

export async function getMovies(): Promise<Movie[]> {
  const { db } = getFirebase();
  const q = doc(db, "website-extra-docs", "all-movies");
  const querySnapshot = await getDoc(q);
  return checkNotNull(querySnapshot.data()).elements as Movie[];
}

function dateToString(date: Date) {
  return String(date.getFullYear()).concat(
    "_",
    String(date.getMonth() + 1).padStart(2, "0"),
    "_",
    String(date.getDate()).padStart(2, "0"),
  );
}
