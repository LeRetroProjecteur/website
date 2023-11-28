import { handleIfNoneMatch } from "@/lib/etag";
import { getDayMovies } from "@/lib/movies";

export async function GET(
  request: Request,
  { params }: { params: { day: string } },
) {
  const dateRequested = new Date(params.day);
  const dayMovies = await getDayMovies(dateRequested, { allMovies: true });

  return handleIfNoneMatch(request, dayMovies);
}
