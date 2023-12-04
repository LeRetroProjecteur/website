import clsx from "clsx";
import { some, sortBy, take, uniqBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import { CalendrierStore, Quartier } from "@/lib/calendrier-store";
import { Movie, ShowtimesTheater } from "@/lib/types";
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
  serverMovies,
  useCalendrierStore,
}: {
  serverMovies: Movie[];
  useCalendrierStore: CalendrierStore;
}) {
  const date = useCalendrierStore((s) => s.date);
  const dateChanged = useCalendrierStore((s) => s.dateChanged);
  const minHour = useCalendrierStore((s) => s.minHour);
  const maxHour = useCalendrierStore((s) => s.maxHour);
  const filter = useCalendrierStore((s) => s.filter);
  const quartiers = useCalendrierStore((s) => s.quartiers);

  const { data: clientMovies } = useSWR<Movie[]>(
    dateChanged ? `/api/movies/by-day/${formatYYYYMMDD(date)}` : false,
    fetcher,
  );

  const movies = useMemo(
    () => clientMovies ?? serverMovies,
    [clientMovies, serverMovies],
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
      <TableHeader />
      {sortedFilteredMovies.length == 0 && <EmptyTableState filter={filter} />}
      <MovieRows movies={sortedFilteredMovies} />
      <TableFooter />
    </div>
  );
}

function TableHeader() {
  return (
    <Row
      cellClassName="font-semibold uppercase leading-10 text-retro-gray lg:text-2xl bg-retro-green text-xl lg:py-3 px-1 lg:px-5 border-t"
      leftCol="Films"
      rightCol="Séances"
    />
  );
}

function EmptyTableState({ filter }: { filter: string }) {
  return (
    <Row
      cellClassName="font-medium lg:leading-5 leading-4 px-1 lg:px-2"
      leftCol={
        filter.length > 0
          ? "Aucun film ne correspond à cette recherche aujourd'hui. Essayez demain ?"
          : "Aucun film ne joue à cette heure-ci aujourd'hui. Essayez demain ?"
      }
    />
  );
}

function MovieRows({ movies }: { movies: Movie[] }) {
  return movies.map((movie) => (
    <Row
      key={movie.id}
      rowClassName="group"
      cellClassName="font-medium leading-4 lg:leading-5 group-odd:bg-retro-green group-odd:lg:bg-white py-4 px-1 lg:px-2"
      leftCol={<MovieCell movie={movie} />}
      rightCol={<Seances movie={movie} />}
    />
  ));
}

function TableFooter() {
  return (
    <div className="flex h-40">
      <div className="w-1/2 border-r pr-2"></div>
    </div>
  );
}

function Row({
  leftCol,
  rightCol,
  cellClassName,
  rowClassName,
}: {
  leftCol?: ReactNode;
  rightCol?: ReactNode;
  cellClassName?: string;
  rowClassName?: string;
}) {
  return (
    <div className={clsx("flex", rowClassName)}>
      <div className="flex w-1/2 border-r pr-2">
        <div className={clsx("grow border-b", cellClassName)}>{leftCol}</div>
      </div>
      <div className="flex w-1/2  pl-2">
        <div className={clsx("grow border-b", cellClassName)}>{rightCol}</div>
      </div>
    </div>
  );
}

function MovieCell({ movie }: { movie: Movie }) {
  return (
    <div className="flex">
      <div className="grow">
        <Link href={`/archives/${movie.id}`} className="italic hover:underline">
          {movie.title}
        </Link>
        , {movie.directors} ({movie.year})
      </div>
      {isCoupDeCoeur(movie) && (
        <div className="shrink-0">
          <Image className="w-[25px]" alt="coup de coeur" src={coupDeCoeur} />
        </div>
      )}
    </div>
  );
}

function Seances({ movie }: { movie: Movie }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(
    () => setIsExpanded(!isExpanded),
    [isExpanded, setIsExpanded],
  );

  const sortedTheaters = useMemo(
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

  const needsExpanding = useMemo(
    () =>
      sortedTheaters.length > 2 ||
      some(
        sortedTheaters,
        (showtime_theater) => showtime_theater.showtimes.length > 3,
      ),
    [sortedTheaters],
  );

  return (
    <div className="flex grow flex-col gap-4 lg:gap-1">
      {take(sortedTheaters, isExpanded ? sortedTheaters.length : 2).map(
        (theater) => (
          <SceancesTheater
            showtimesTheater={theater}
            key={theater.clean_name}
            isExpanded={isExpanded}
          />
        ),
      )}
      {needsExpanding && (
        <div className="cursor-pointer font-semibold" onClick={toggleExpanded}>
          {isExpanded ? "Moins de séances ↑" : "Plus de séances ↓"}
        </div>
      )}
    </div>
  );
}

function SceancesTheater({
  showtimesTheater,
  isExpanded,
}: {
  showtimesTheater: ShowtimesTheater;
  isExpanded: boolean;
}) {
  const groupsOfThree = splitIntoSubArrays(
    take(
      sortBy(showtimesTheater.showtimes),
      isExpanded ? showtimesTheater.showtimes.length : 3,
    ),
    3,
  );
  return (
    <div className="flex justify-between" key={showtimesTheater.clean_name}>
      <div className="grow pr-3">
        {showtimesTheater.clean_name} ({showtimesTheater.zipcode_clean})
      </div>
      <div className="flex flex-col">
        {groupsOfThree.map((showtimes, i) => (
          <ThreeShowtimes key={i} threeShowtimes={showtimes} />
        ))}
      </div>
    </div>
  );
}

function ThreeShowtimes({ threeShowtimes }: { threeShowtimes: number[] }) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-end">
      {threeShowtimes.map((showtime) => (
        <div key={showtime} className="group flex justify-end">
          {floatHourToString(showtime)}
          <div className="hidden group-last:hidden lg:block">&nbsp;•&nbsp;</div>
        </div>
      ))}
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
