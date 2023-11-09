import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "server-only";

import { format } from "date-fns";

import { getFirebase } from "./firebase";
import { Movie } from "./types";
import { checkNotNull } from "./util";

export const getDayMovies = async (date: Date) => {
  const { db } = getFirebase();
  const q = query(
    collection(db, "website-by-date-screenings"),
    where("date", "==", format(date, "Y_MM_dd")),
  );
  const docs: Movie[] = [];
  (await getDocs(q)).forEach((doc: any) => docs.push(...doc.data().movies));
  return docs;
};

export async function getMovies(): Promise<Movie[]> {
  const { db } = getFirebase();
  const q = doc(db, "website-extra-docs", "all-movies");
  const querySnapshot = await getDoc(q);
  return checkNotNull(querySnapshot.data()).elements as Movie[];
}
