import { createHash } from "crypto";

import { handleIfNoneMatch } from "@/lib/etag";
import { getDayMovies } from "@/lib/movies";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const dateRequested = new Date(params.slug);
  const dayMovies = await getDayMovies(dateRequested, { allMovies: true });

  return handleIfNoneMatch(request, dayMovies);
}
