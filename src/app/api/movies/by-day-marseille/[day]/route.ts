import { handleIfNoneMatch } from "@/lib/etag";
import { getDayMoviesMarseille } from "@/lib/movies";
import { safeDate } from "@/lib/util";

export async function GET(
  request: Request,
  { params }: { params: { day: string } },
) {
  const dateRequested = safeDate(params.day);
  const dayMovies = await getDayMoviesMarseille(dateRequested);

  return handleIfNoneMatch(request, dayMovies);
}
