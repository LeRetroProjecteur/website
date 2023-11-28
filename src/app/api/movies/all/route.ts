import { handleIfNoneMatch } from "@/lib/etag";
import { getMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const movies = await getMovies();
  return handleIfNoneMatch(request, movies);
}
