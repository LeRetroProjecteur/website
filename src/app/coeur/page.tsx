import { Metadata } from "next";
import { cookies } from "next/headers";

import { getReviewedMovies } from "@/lib/movies";

import CoupsDeCoeur from "./coeur";

export const metadata: Metadata = {
  title: "Coups de cœur | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

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
