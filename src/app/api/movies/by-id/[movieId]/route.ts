import { handleIfNoneMatch } from "@/lib/etag";
import { getMovie } from "@/lib/movies";

export async function GET(
  _request: Request,
  { params }: { params: { movieId: string } },
) {
  const movieId = params.movieId;
  const movie = await getMovie(movieId);
  return handleIfNoneMatch(_request, movie);
  return Response.json(await getMovie(movieId));
}
