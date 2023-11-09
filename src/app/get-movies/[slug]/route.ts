import { startOfDay } from "date-fns";

import { getDayMovies } from "@/lib/movies";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  return Response.json(await getDayMovies(startOfDay(new Date(params.slug))));
}
