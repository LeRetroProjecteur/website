import { DateTime } from "luxon";

import { getMovie } from "@/lib/movies";

// Serves a séance as a real text/calendar file rather than a data: URL, which
// iOS Chrome and in-app browsers don't handle.
export async function GET(
  request: Request,
  props: { params: Promise<{ movieId: string }> },
) {
  const { movieId } = await props.params;
  const searchParams = new URL(request.url).searchParams;
  const start = DateTime.fromISO(searchParams.get("start") ?? "");
  const theater = searchParams.get("theater") ?? "";
  if (!start.isValid || theater.length === 0) {
    return new Response("Bad request", { status: 400 });
  }

  const movie = await getMovie(movieId);
  if (movie == null) {
    return new Response("Not found", { status: 404 });
  }

  const durationSeconds = parseInt(movie.duration ?? "");
  const eventMinutes = isNaN(durationSeconds)
    ? 120
    : Math.round(durationSeconds / 60) + 15;
  const end = start.plus({ minutes: eventMinutes });
  const title = `${movie.title}, ${movie.directors} (${movie.year})`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Le Retro Projecteur//FR",
    "BEGIN:VEVENT",
    `UID:${movieId}-${toIcsDate(start)}-${theater.replace(
      /\W/g,
      "",
    )}@leretroprojecteur.com`,
    `DTSTAMP:${toIcsDate(DateTime.now())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(theater)}`,
    `DESCRIPTION:https://leretroprojecteur.com/film/${movieId}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  const filename = `${movie.title} (${theater}).ics`;
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="seance.ics"; filename*=UTF-8''${encodeURIComponent(
        filename,
      )}`,
    },
  });
}

function toIcsDate(date: DateTime) {
  return date.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

function escapeText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, ";")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}
