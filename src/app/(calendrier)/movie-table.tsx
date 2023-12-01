import { some, sortBy, take, uniqBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import { CalendrierStore, Quartier } from "@/lib/calendrier-store";
import { Movie } from "@/lib/types";
import {
  fetcher,
  floatHourToString,
  formatYYYYMMDD,
  isCoupDeCoeur,
  isTodayInParis,
  movie_info_containsFilteringTerm,
  nowInParis,
  splitIntoSubArrays,
} from "@/lib/util";

import coupDeCoeur from "./coup-de-coeur.png";

export default function MovieTable({
  useCalendrierStore,
}: {
  useCalendrierStore: CalendrierStore;
}) {
  const date = useCalendrierStore((s) => s.date);
  const minHour = useCalendrierStore((s) => s.minHour);
  const maxHour = useCalendrierStore((s) => s.maxHour);
  const filter = useCalendrierStore((s) => s.filter);
  const quartiers = useCalendrierStore((s) => s.quartiers);

  const { data: movies, isLoading } = useSWR(
    `/api/movies/by-day/${formatYYYYMMDD(date)}`,
    fetcher,
    { fallbackData: [] },
  );

  const minHourFilteringTodaysMissedFilms = useMemo(
    () => getMinHourFilteringTodaysMissedFilms(date, minHour),
    [minHour, date],
  );

  const sortedFilteredMovies = useMemo(
    () =>
      filterAndSortMovies(
        movies,
        minHourFilteringTodaysMissedFilms,
        maxHour,
        quartiers,
        filter,
      ),
    [movies, minHourFilteringTodaysMissedFilms, maxHour, quartiers, filter],
  );

  return (
    <div className="flex grow flex-col pb-9 lg:pb-6">
      <div className="flex">
        <div className="flex w-1/2 border-r border-retro-gray pr-2">
          <div className="grow border-y border-retro-gray bg-retro-green pl-1 text-xl font-semibold uppercase leading-10 text-retro-gray lg:py-3 lg:pl-5 lg:text-2xl">
            Films
          </div>
        </div>
        <div className="flex w-1/2 border-retro-gray pl-2">
          <div className="grow border-y border-retro-gray bg-retro-green pl-1 text-xl font-semibold uppercase leading-10 text-retro-gray lg:py-3 lg:pl-5 lg:text-2xl">
            Séances
          </div>
        </div>
      </div>
      {sortedFilteredMovies.length > 0 || isLoading ? null : (
        <div className="flex w-1/2 border-r border-retro-gray pr-2">
          <div className="flex grow items-center gap-1 border-b border-retro-gray px-1 py-4 font-medium leading-4 text-retro-black group-odd:bg-retro-green lg:py-4 lg:pl-5 lg:leading-5 group-odd:lg:bg-white">
            {filter.length > 0
              ? "Aucun film ne correspond à cette recherche aujourd'hui. Essayez demain ?"
              : "Aucun film ne joue à cette heure-ci aujourd'hui. Essayez demain ?"}
          </div>
        </div>
      )}
      {sortedFilteredMovies.map((movie) => (
        <div key={movie.id} className="group flex">
          <div className="flex w-1/2 border-r border-retro-gray pr-2">
            <div className="flex grow items-center gap-1 border-b border-retro-gray px-1 py-4 font-medium leading-4 text-retro-black group-odd:bg-retro-green lg:py-4 lg:pl-5 lg:leading-5 group-odd:lg:bg-white">
              <div className="grow">
                <Link
                  href={`/archives/${movie.id}`}
                  className="italic hover:underline"
                >
                  {movie.title}
                </Link>
                , {movie.directors} ({movie.year})
              </div>
              {isCoupDeCoeur(movie) ? (
                <div className="shrink-0">
                  <Image
                    className="w-[25px]"
                    alt="coup de coeur"
                    src={coupDeCoeur}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex w-1/2 border-retro-gray pl-2">
            <div className="flex grow border-b border-retro-gray px-1 py-4 font-medium leading-4 text-retro-black group-odd:bg-retro-green lg:py-4 lg:pl-5 lg:leading-5 group-odd:lg:bg-white">
              <Seances movie={movie} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex h-40">
        <div className="w-1/2 border-r border-retro-gray pr-2"></div>
        <div className="w-1/2 pl-2"></div>
      </div>
    </div>
  );
}

function Seances({ movie }: { movie: Movie }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );

  const sorted = useMemo(
    () =>
      sortBy(
        uniqBy(
          movie.showtimes_theater,
          (showtime_theater) => showtime_theater.clean_name,
        ),
        (showtime_theater) => showtime_theater.clean_name,
      ),
    [movie],
  );

  return (
    <div className="flex grow flex-col gap-4 lg:gap-1">
      {(isExpanded ? sorted : take(sorted)).map((showtime_theater) => (
        <div
          className="flex justify-between gap-3"
          key={showtime_theater.clean_name}
        >
          <div className="grow">
            {showtime_theater.clean_name} ({showtime_theater.zipcode_clean})
          </div>
          <div className="flex flex-col text-right">
            {splitIntoSubArrays(
              take(
                sortBy(showtime_theater.showtimes),
                isExpanded ? showtime_theater.showtimes.length : 3,
              ),
              3,
            ).map((showtimes, i) => (
              <div key={i} className="flex flex-col lg:flex-row">
                {showtimes.map((showtime) => (
                  <div key={showtime} className="group">
                    {floatHourToString(showtime)}
                    <span className="hidden group-last:hidden lg:inline">
                      &nbsp;•&nbsp;
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      {sorted.length > 1 ||
      some(
        sorted,
        (showtime_theater) => showtime_theater.showtimes.length > 3,
      ) ? (
        <div className="cursor-pointer font-semibold" onClick={toggleExpanded}>
          {isExpanded ? "Moins de séances ↑" : "Plus de séances ↓"}
        </div>
      ) : null}
    </div>
  );
}

function getMinHourFilteringTodaysMissedFilms(date: Date, minHour: number) {
  if (!isTodayInParis(date)) {
    return minHour;
  }

  const now = nowInParis();
  return Math.max(minHour, now.getHours() + now.getMinutes() / 60 - 0.3);
}

function filterAndSortMovies(
  movies: Movie[],
  minHourFilteringTodaysMissedFilms: number,
  maxHour: number,
  quartiers: Quartier[],
  filter: string,
) {
  const moviesWithFilteredShowtimes = movies
    .map((movie) => ({
      ...movie,
      showtimes_theater: movie.showtimes_theater
        .map((theater) => ({
          ...theater,
          showtimes: theater.showtimes.filter(
            (showtime) =>
              showtime >= minHourFilteringTodaysMissedFilms &&
              showtime <= maxHour,
          ),
        }))
        .filter(
          (theater) =>
            theater.showtimes.length > 0 &&
            some(quartiers, (quartier) => quartier === theater.location_2),
        ),
    }))
    .filter((movie) => movie.showtimes_theater.length > 0);

  const filteredMovies = moviesWithFilteredShowtimes.filter(
    (movie) => filter == "" || movie_info_containsFilteringTerm(movie, filter),
  );

  const sortedFilteredMovies = sortBy(filteredMovies, (movie) => [
    movie.year,
    movie.directors,
    movie.title,
  ]);

  return sortedFilteredMovies;
}
