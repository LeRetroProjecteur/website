import clsx from "clsx";
import { some, sortBy, take, uniqBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import { BodyCopy, SousTitre2 } from "@/components/typography/typography";
import { Quartier, useCalendrierStore } from "@/lib/calendrier-store";
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
}: {
  serverMovies: Movie[];
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
    <div className="flex grow flex-col">
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
      cellClassName="bg-retro-green lg:p-20px border-t"
      leftCol={<SousTitre2>Films</SousTitre2>}
      rightCol={<SousTitre2>Séances</SousTitre2>}
    />
  );
}

function EmptyTableState({ filter }: { filter: string }) {
  return (
    <Row
      cellClassName="lg:px-10px lg:py-20px"
      leftCol={
        <BodyCopy>
          {filter.length > 0
            ? "Aucun film ne correspond à cette recherche aujourd'hui. Essayez demain ?"
            : "Aucun film ne joue à cette heure-ci aujourd'hui. Essayez demain ?"}
        </BodyCopy>
      }
    />
  );
}

function MovieRows({ movies }: { movies: Movie[] }) {
  return movies.map((movie) => (
    <Row
      key={movie.id}
      rowClassName="group"
      cellClassName="group-odd:bg-retro-green group-odd:lg:bg-white lg:py-16px lg:group-hover:bg-retro-pale-green"
      leftCol={<MovieCell movie={movie} />}
      rightCol={<Seances movie={movie} />}
    />
  ));
}

function TableFooter() {
  return (
    <div className="flex h-640px">
      <div className="w-1/2 border-r"></div>
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
      <div className="flex w-1/2 border-r lg:pr-10px">
        <div className={clsx("grow border-b", cellClassName)}>{leftCol}</div>
      </div>
      <div className="flex w-1/2 lg:pl-10px">
        <div className={clsx("grow border-b", cellClassName)}>{rightCol}</div>
      </div>
    </div>
  );
}

function MovieCell({ movie }: { movie: Movie }) {
  return (
    <div className="flex lg:pl-10px">
      <div className="grow">
        <BodyCopy>
          <Link
            href={`/archives/${movie.id}`}
            className="italic hover:underline"
          >
            {movie.title}
          </Link>
          , {movie.directors} ({movie.year})
        </BodyCopy>
      </div>
      {isCoupDeCoeur(movie) && (
        <div className="shrink-0">
          <Image className="w-25px" alt="coup de coeur" src={coupDeCoeur} />
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
    <div className="flex grow flex-col lg:gap-5px lg:pl-10px">
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
        <div className="flex justify-end">
          <div className="cursor-pointer" onClick={toggleExpanded}>
            <BodyCopy className="font-semibold">
              {isExpanded ? "Moins de séances ↑" : "Plus de séances ↓"}
            </BodyCopy>
          </div>
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
      <div className="pr-5px grow">
        <BodyCopy>
          {showtimesTheater.clean_name} ({showtimesTheater.zipcode_clean})
        </BodyCopy>
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
          <BodyCopy>{floatHourToString(showtime)}</BodyCopy>
          <div className="hidden group-last:hidden lg:block">
            <BodyCopy>&nbsp;•&nbsp;</BodyCopy>
          </div>
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
