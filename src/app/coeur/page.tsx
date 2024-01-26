import { cookies } from "next/headers";

import { getReviewedMovies } from "@/lib/movies";

import CoupsDeCoeur from "./coeur";

export const dynamic = "force-dynamic";

export default async function CoupsDeCoeurPage() {
  const reviews = getReviewedMovies();
  const cdcDisplay = (cookies().get("cdc-display")?.value ?? "thumbnails") as
    | "thumbnails"
    | "list";

  return (
    <CoupsDeCoeur fetchedReviews={reviews} displayPreference={cdcDisplay} />
  );
}
