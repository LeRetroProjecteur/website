import { handleIfNoneMatch } from "@/lib/etag";
import { getReviewedMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const reviewedMovies = await getReviewedMovies();
  return handleIfNoneMatch(request, reviewedMovies);
}
