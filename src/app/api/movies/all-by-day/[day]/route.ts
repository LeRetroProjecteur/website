import { handleIfNoneMatch } from "@/lib/etag";
import { getDayMovies } from "@/lib/movies";
import { safeDate } from "@/lib/utils";

export async function GET(
  request: Request,
  props: { params: Promise<{ day: string }> },
) {
  const params = await props.params;
  const dateRequested = safeDate(params.day);
  const dayMovies = await getDayMovies(dateRequested, { allMovies: true });

  return handleIfNoneMatch(request, dayMovies);
}
