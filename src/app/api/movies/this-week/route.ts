import { handleIfNoneMatch } from "@/lib/etag";
import { getWeekMovies } from "@/lib/movies";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const weekMovies = await getWeekMovies();
  return handleIfNoneMatch(request, weekMovies);
}
