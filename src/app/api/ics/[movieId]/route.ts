import { DateTime } from "luxon";

import { getIcsContent, getSeanceCalendarEvent } from "@/lib/calendar";
import { getMovie } from "@/lib/movies";

// Serves a séance as a real text/calendar file rather than a data: URL, which
// iOS Chrome and in-app browsers don't handle.
export async function GET(
  request: Request,
  props: { params: Promise<{ movieId: string }> },
) {
  const { movieId } = await props.params;
  const searchParams = new URL(request.url).searchParams;
  const movieDate = DateTime.fromISO(searchParams.get("start") ?? "", {
    setZone: true,
  });
  const movieTheater = searchParams.get("theater") ?? "";
  if (!movieDate.isValid || movieTheater.length === 0) {
    return new Response("Bad request", { status: 400 });
  }

  const movie = await getMovie(movieId);
  if (movie == null) {
    return new Response("Not found", { status: 404 });
  }

  const ics = getIcsContent(
    getSeanceCalendarEvent({ movie, movieDate, movieTheater }),
  );
  const filename = `${movie.title} (${movieTheater}).ics`;
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="seance.ics"; filename*=UTF-8''${encodeURIComponent(
        filename,
      )}`,
    },
  });
}
