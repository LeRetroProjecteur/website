import { every, omit, padStart, some } from "lodash-es";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";

import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  startOfDay,
  startOfISOWeek,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { fr } from "date-fns/locale";

import { MovieWithNoShowtimes, Review } from "./types";

export function isCoupDeCoeur({ category }: { category?: string }) {
  return category === "COUP DE CŒUR";
}

export function getNextMovieWeek() {
  const today = nowInParis();
  const startOfNextWeek = addDays(
    addWeeks(
      startOfISOWeek(today),
      [0, 1, 2, 3, 4].includes(today.getDay()) ? 0 : 1,
    ),
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

export function nowInParis() {
  return utcToZonedTime(new Date(), "Europe/Paris");
}

export function getStartOfTodayInParis() {
  return startOfDay(nowInParis());
}

export function getStartOfDayInParis(date: string) {
  return startOfDay(utcToZonedTime(safeDate(date), "Europe/Paris"));
}

export function isTodayInParis(date: Date) {
  return isSameDay(nowInParis(), date);
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
  f: MovieWithNoShowtimes | Review,
  filteringTerm: string,
) {
  if (filteringTerm.slice(-1) === "|") {
    filteringTerm = filteringTerm.slice(0, -1);
  }
  const filtering_field = get_movie_info_string(omit(f, "year"));
  const filteringTerms = filteringTerm.split("|");
  return some(filteringTerms, (filteringTerm) =>
    string_match(filteringTerm, filtering_field),
  );
}

function get_movie_info_string(f: Record<string, string>) {
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

export function formatLundi1Janvier(date: Date) {
  return format(date, "EEEE d MMMM", { locale: fr });
}

export function formatYYYYMMDD(date: Date) {
  return format(date, "yyyy-MM-dd", { locale: fr });
}

export function formatDDMMYYWithSlashes(date: Date) {
  return format(date, "dd/MM/yy", { locale: fr });
}

export function splitIntoSubArrays<T>(array: T[], subArraySize: number) {
  return [...Array(Math.ceil(array.length / subArraySize))].map((_, i) =>
    array.slice(i * subArraySize, i * subArraySize + subArraySize),
  );
}

export function useIsMobile() {
  const { width } = useWindowSize();
  return useMemo(() => width > 1 && width < 1024, [width]);
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function getMovieTags({ tags }: { tags: string }) {
  return Array.from(tags.matchAll(/#([^\s]+)/g)).map(([_, tag]) => tag);
}

export const TAG_MAP: Record<string, string> = {
  cdc: "coup de coeur",
  curio: "on est curieux",
  female: "femmes réalisatrices",
  jamesbond: "james bond",
  "s&s": "top 100 du sondage sight & sound",
};

export function getImageUrl({ id }: { id: string }) {
  return `https://firebasestorage.googleapis.com/v0/b/website-cine.appspot.com/o/images%2F${id}.jpg?alt=media`;
}

export function getReviewSortKey(review: Review) {
  return `${formatYYYYMMDD(safeDate(review.review_date))}-${review.id}`;
}
