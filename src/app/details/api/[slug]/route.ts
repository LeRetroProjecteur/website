import { getMovie } from "@/lib/movies";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const movieId = params.slug;
  return Response.json(await getMovie(movieId));
}
