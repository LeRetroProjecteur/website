import { getReviewedMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getReviewedMovies());
}
