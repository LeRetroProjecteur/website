import { CalendarEvent, ics } from "calendar-link";
import { DateTime } from "luxon";

import { checkNotNull } from "./utils";

export function getSeanceCalendarEvent({
  movie: { id, title, directors, year, duration },
  movieDate,
  movieTheater,
}: {
  movie: {
    id: string;
    title: string;
    directors: string;
    year: string;
    duration?: string;
  };
  movieDate: DateTime;
  movieTheater: string;
}): CalendarEvent {
  const durationSeconds = parseInt(duration ?? "");
  const eventMinutes = isNaN(durationSeconds)
    ? 120
    : Math.round(durationSeconds / 60) + 15;
  return {
    title: `${title}, ${directors} (${year})`,
    start: movieDate.toISO(),
    end: movieDate.plus({ minutes: eventMinutes }).toISO(),
    location: movieTheater,
    description: `https://leretroprojecteur.com/film/${id}`,
  };
}

// calendar-link only returns a data: URL; extract the .ics content from it.
export function getIcsContent(event: CalendarEvent) {
  const dataUrl = ics(event);
  return decodeURIComponent(dataUrl.slice(dataUrl.indexOf(",") + 1));
}

export function getSeanceIcsPath({
  movieId,
  movieDate,
  movieTheater,
}: {
  movieId: string;
  movieDate: DateTime;
  movieTheater: string;
}) {
  return `/api/ics/${encodeURIComponent(movieId)}?${new URLSearchParams({
    start: checkNotNull(movieDate.toISO()),
    theater: movieTheater,
  })}`;
}
