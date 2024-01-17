import { getReviewedMovies } from "@/lib/movies";

import CoupsDeCoeur from "./coeur";

export const dynamic = "force-static";
export const revalidate = 1;

export default async function CoupsDeCoeurPage() {
  const reviews = getReviewedMovies();

  return <CoupsDeCoeur fetchedReviews={reviews} />;
}
