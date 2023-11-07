import { getDayMovies } from "@/lib/movies";
import { startOfDay } from "date-fns";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  return Response.json(await getDayMovies(startOfDay(new Date(params.slug))));
}
