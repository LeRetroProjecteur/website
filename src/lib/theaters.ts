import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { getFirebase } from "@/lib/firebase";

import { SearchTheater } from "./types";

export const getTheaters = unstable_cache(
  async (): Promise<SearchTheater[]> => {
    const { db } = getFirebase();
    const docRef = doc(db, "website-extra-docs", "all-theaters");
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return (data?.elements as SearchTheater[]) ?? [];
  },
  ["all-theaters"],
  { revalidate: 1 },
);
