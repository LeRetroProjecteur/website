import { handleIfNoneMatch } from "@/lib/etag";
import { getDayMovies } from "@/lib/movies";
import { safeDate } from "@/lib/util";

export async function GET(
  request: Request,
  { params }: { params: { day: string } },
) {
  const dateRequested = safeDate(params.day);
  const dayMovies = await getDayMovies(dateRequested);

  return handleIfNoneMatch(request, dayMovies);
}
