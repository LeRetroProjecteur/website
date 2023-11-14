import { every, padStart, some } from "lodash-es";

import { addDays, addWeeks, isSameDay, startOfISOWeek } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { MovieWithNoShowtimes } from "./types";

export function getNextMovieWeek() {
  const today = utcToZonedTime(new Date(), "Europe/Paris");
  const startOfNextWeek = addDays(
    addWeeks(startOfISOWeek(today), [1, 2].includes(today.getDay()) ? 0 : 1),
    2,
  );

  return [...Array(7)].map((_, i) => addDays(startOfNextWeek, i));
}

export function checkNotNull<T>(check: T | null | undefined): T {
  if (check == null) {
    throw new Error();
  }
  return check;
}

export function floatHourToString(hour: number) {
  return `${Math.floor(hour)}h${padStart(
    parseInt((60 * (hour - Math.floor(hour))).toPrecision(2)).toString(),
    2,
    "0",
  )}`;
}

export function safeDate(date: string) {
  return new Date(date.replaceAll("_", "-"));
}

export function isTodayInParis(date: Date) {
  return isSameDay(utcToZonedTime(new Date(), "Europe/Paris"), date);
}

function clean_string(str: string) {
  str = str.replaceAll("-", " ");
  str = str.replaceAll(/['’]/g, "'");
  str = str.replaceAll("'", " ");
  str = str.replaceAll("&", "and");
  str = str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  str = str.replaceAll(/[^a-zA-Z0-9 #]/g, "");
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.toLowerCase();
  return str;
}

function at_least_one_word_starts_with_substring(
  list: string[],
  substring: string,
) {
  return some(list, (word) => word.startsWith(substring));
}

export function string_match(term: string, search_field: string) {
  const fields = clean_string(search_field).split(" ");
  const keywords = clean_string(term).split(" ");
  return every(keywords, (keyword) =>
    at_least_one_word_starts_with_substring(fields, keyword),
  );
}

export function movie_info_containsFilteringTerm(
  f: MovieWithNoShowtimes,
  filteringTerm: string,
) {
  if (filteringTerm.slice(-1) === "|") {
    filteringTerm = filteringTerm.slice(0, -1);
  }
  const filtering_field = get_movie_info_string(f);
  const filteringTerms = filteringTerm.split("|");
  return some(filteringTerms, (filteringTerm) =>
    string_match(filteringTerm, filtering_field),
  );
}

function get_movie_info_string(f: MovieWithNoShowtimes) {
  return (
    [
      "language",
      "title",
      "original_title",
      "directors",
      "countries",
      "tags",
    ] as Array<keyof MovieWithNoShowtimes>
  )
    .map((key) => {
      return f[key] == null ? "" : `${f[key]}`;
    })
    .join(" ");
}
