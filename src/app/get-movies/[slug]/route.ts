import { startOfDay } from "date-fns";

import { getDayMovies } from "@/lib/movies";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const dateRequested = startOfDay(new Date(params.slug));
  return Response.json(await getDayMovies(dateRequested));
}
