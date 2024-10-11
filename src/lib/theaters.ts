import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { getFirebase } from "@/lib/firebase";

export const getTheaters = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const { db } = getFirebase();
      const docRef = doc(db, "website-extra-docs", "all-theaters");
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();
      if (data && "elements" in data && Array.isArray(data.elements)) {
        return data.elements as string[];
      } else {
        console.warn("Theater names data is not in the expected format");
        return []; // Return an empty array if data is not in the expected format
      }
    } catch (error) {
      console.error("Error fetching theater names:", error);
      return []; // Return an empty array in case of any error
    }
  },
  ["all-theaters"],
  { revalidate: 1 },
);
