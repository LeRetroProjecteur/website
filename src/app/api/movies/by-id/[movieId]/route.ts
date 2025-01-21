import { handleIfNoneMatch } from "@/lib/etag";
import { getMovie } from "@/lib/movies";

export async function GET(
  _request: Request,
  props: { params: Promise<{ movieId: string }> },
) {
  const params = await props.params;
  const movieId = params.movieId;
  const movie = await getMovie(movieId);
  return handleIfNoneMatch(_request, movie);
}
