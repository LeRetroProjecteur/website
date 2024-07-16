"use client";

import clsx from "clsx";
import {
  capitalize,
  orderBy,
  pickBy,
  size,
  some,
  sortBy,
  toPairs,
} from "lodash-es";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, use, useEffect, useMemo } from "react";
import useSWR from "swr";

import { Loading, SuspenseWithLoading } from "@/components/icons/loading";
import Seances from "@/components/seances/seances";
import { CalendrierCopy, SousTitre2 } from "@/components/typography/typography";
import { Quartier, useCalendrierStore } from "@/lib/calendrier-store";
import {
  MovieWithNoScreenings,
  MovieWithScreenings,
  MovieWithScreeningsByDay,
  TheaterScreenings,
} from "@/lib/types";
import {
  checkNotNull,
  fetcher,
  formatLundi1Janvier,
  formatYYYYMMDD,
  getStartOfTodayInParis,
  isCoupDeCoeur,
  isMovieWithShowtimesByDay,
  isMoviesWithShowtimesByDay,
  movieInfoContainsFilteringTerm,
  nowInParis,
  safeDate,
} from "@/lib/util";

import coupDeCoeur from "../../assets/coup-de-coeur.png";

export default function MovieTable({
  serverMovies,
  allMovies,
  marseille,
}: {
  serverMovies: Promise<MovieWithScreenings[] | MovieWithScreeningsByDay[]>;
  allMovies?: boolean;
  marseille?: boolean;
}) {
  const date = useCalendrierStore((s) => s.date);
  const setDate = useCalendrierStore((s) => s.setDate);
  const useClientData = useCalendrierStore((s) => s.dateChanged);
  const minHour = useCalendrierStore((s) => s.minHour);
  const maxHour = useCalendrierStore((s) => s.maxHour);
  const filter = useCalendrierStore((s) => s.filter);
  const quartiers = useCalendrierStore((s) => s.quartiers);

  const url = marseille
    ? allMovies ?? false
      ? `/api/movies/all-by-day-marseille/${formatYYYYMMDD(date)}`
      : `/api/movies/by-day-marseille/${formatYYYYMMDD(date)}`
    : allMovies ?? false
      ? `/api/movies/all-by-day/${formatYYYYMMDD(date)}`
      : `/api/movies/by-day/${formatYYYYMMDD(date)}`;

  const { data: clientMovies, isLoading } = useSWR<
    MovieWithScreenings[] | MovieWithScreeningsByDay[]
  >(useClientData ? url : false, fetcher);

  const minHourFilteringTodaysMissedFilms = useMemo(
    () => getMinHourFilteringTodaysMissedFilms(date, minHour),
    [minHour, date],
  );

  useEffect(() => {
    const keydown = (ev: KeyboardEvent) => {
      if (
        document?.activeElement?.tagName?.toLowerCase() === "input" ||
        document?.activeElement?.tagName?.toLowerCase() === "textarea"
      ) {
        return;
      }

      if (ev.key === "ArrowLeft") {
        const today = getStartOfTodayInParis();
        if (date > today) {
          setDate(date.minus({ days: 1 }));
        }
      } else if (ev.key === "ArrowRight") {
        setDate(date.plus({ days: 1 }));
      }
    };

    addEventListener("keydown", keydown);
    return () => removeEventListener("keydown", keydown);
  }, [date, setDate]);

  return (
    <div className="flex grow flex-col">
      <TableHeader />
      <SuspenseWithLoading className="h-60px border-b py-10px">
        {isLoading ? (
          <Loading className="h-60px border-b py-10px" />
        ) : (
          <LoadedTable
            {...{
              useClientData,
              serverMovies,
              clientMovies,
              minHourFilteringTodaysMissedFilms,
              maxHour,
              quartiers,
              filter,
            }}
          />
        )}
      </SuspenseWithLoading>
      <TableFooter />
    </div>
  );
}

function LoadedTable({
  serverMovies: serverMoviesPromise,
  clientMovies,
  useClientData,
  minHourFilteringTodaysMissedFilms,
  maxHour,
  quartiers,
  filter,
}: {
  serverMovies: Promise<MovieWithScreenings[] | MovieWithScreeningsByDay[]>;
  clientMovies?: MovieWithScreenings[] | MovieWithScreeningsByDay[];
  useClientData: boolean;
  minHourFilteringTodaysMissedFilms: number;
  maxHour: number;
  quartiers: Quartier[];
  filter: string;
}) {
  const serverMovies = use(serverMoviesPromise);
  const movies = useMemo(
    () => (useClientData ? checkNotNull(clientMovies) : serverMovies),
    [clientMovies, serverMovies, useClientData],
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

  return sortedFilteredMovies.length == 0 ? (
    <EmptyTableState filter={filter} />
  ) : (
    <MovieRows movies={sortedFilteredMovies} />
  );
}

function TableHeader() {
  return (
    <Row
      cellClassName="bg-retro-green lg:px-20px border-t lg:py-17px p-6px"
      leftCol={<SousTitre2>Films</SousTitre2>}
      rightCol={<SousTitre2>Séances</SousTitre2>}
    />
  );
}

function EmptyTableState({ filter }: { filter: string }) {
  return (
    <div className="flex justify-center border-b py-13px lg:py-20px">
      <CalendrierCopy>
        {filter.length > 0
          ? "Aucun film ne correspond à cette recherche aujourd'hui. Essayez demain ?"
          : "Aucun film ne joue à cette heure-ci aujourd'hui. Essayez demain ?"}
      </CalendrierCopy>
    </div>
  );
}

function MovieRows({
  movies,
}: {
  movies: MovieWithScreenings[] | MovieWithScreeningsByDay[];
}) {
  return movies.map((movie) => (
    <Row
      key={movie.id}
      rowClassName="group"
      cellClassName="px-6px lg:px-10px xl:px-15px group-odd:bg-retro-pale-green group-odd:lg:bg-white lg:group-hover:bg-retro-pale-green"
      leftCol={<MovieCell movie={movie} />}
      rightCol={
        <div className="py-12px lg:py-17px">
          {isMovieWithShowtimesByDay(movie) ? (
            <MultiDaySeances screenings={movie.showtimes_by_day} />
          ) : (
            <Seances screenings={movie.showtimes_theater} />
          )}
        </div>
      }
    />
  ));
}

function TableFooter() {
  return (
    <div className="flex grow">
      <div className="min-h-100px w-1/2 border-r"></div>
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
      <div className="flex w-1/2 border-r">
        <div className={clsx("flex grow border-b", cellClassName)}>
          {leftCol}
        </div>
      </div>
      <div className="flex w-1/2">
        <div className={clsx("grow border-b", cellClassName)}>{rightCol}</div>
      </div>
    </div>
  );
}

function MovieCell({ movie }: { movie: MovieWithNoScreenings }) {
  return (
    <Link href={`/film/${movie.id}`} className="block cursor-pointer">
      <div className="flex items-center">
        {isCoupDeCoeur(movie) && (
          <div className="shrink-0 pr-10px">
            <Image className="w-25px" alt="coup de coeur" src={coupDeCoeur} />
          </div>
        )}
        <div className="grow py-12px lg:py-17px">
          <CalendrierCopy>
            <i className="font-semibold uppercase group-hover:underline">
              {movie.title}
            </i>
            , {movie.directors} ({movie.year})
          </CalendrierCopy>
        </div>
      </div>
    </Link>
  );
}

function MultiDaySeances({
  screenings,
}: {
  screenings: { [day: string]: TheaterScreenings[] };
}) {
  return (
    <div className="flex grow flex-col gap-20px lg:gap-10px">
      {orderBy(
        toPairs(screenings).map<[DateTime, TheaterScreenings[]]>(
          ([day, screeningsTheaters]) => [safeDate(day), screeningsTheaters],
        ),
        ([day]) => day,
      ).map(([day, screeningsTheaters], i) => (
        <div key={i} className="flex grow flex-col gap-10px lg:gap-5px">
          <CalendrierCopy>
            <strong>{capitalize(formatLundi1Janvier(day))}</strong>
          </CalendrierCopy>
          <Seances screenings={screeningsTheaters} />
        </div>
      ))}
    </div>
  );
}

function getMinHourFilteringTodaysMissedFilms(date: DateTime, minHour: number) {
  if (!date.hasSame(nowInParis(), "day")) {
    return minHour;
  }

  const now = nowInParis();
  return Math.max(minHour, now.hour + now.minute / 60 - 0.3);
}

function filterAndSortMovies(
  movies: MovieWithScreenings[] | MovieWithScreeningsByDay[],
  minHourFilteringTodaysMissedFilms: number,
  maxHour: number,
  quartiers: Quartier[],
  filter: string,
) {
  const moviesWithFilteredShowtimes = isMoviesWithShowtimesByDay(movies)
    ? movies
        .map((movie) => ({
          ...movie,
          showtimes_by_day: pickBy(
            movie.showtimes_by_day,
            (_, date) => safeDate(date) >= getStartOfTodayInParis(),
          ),
        }))
        .filter((movie) => size(movie.showtimes_by_day) > 0)
    : movies
        .map<MovieWithScreenings>((movie) => ({
          ...movie,
          showtimes_theater: movie.showtimes_theater
            .map((theater) => ({
              ...theater,
              screenings: theater.screenings.filter(
                (screening) =>
                  screening.time >= minHourFilteringTodaysMissedFilms &&
                  screening.time <= maxHour,
              ),
            }))
            .filter(
              (theater) =>
                theater.screenings.length > 0 &&
                (quartiers.length === 0 ||
                  some(
                    quartiers,
                    (quartier) => quartier === theater.neighborhood,
                  )),
            ),
        }))
        .filter((movie) => movie.showtimes_theater.length > 0);

  const filteredMovies = moviesWithFilteredShowtimes.filter(
    (movie) => filter == "" || movieInfoContainsFilteringTerm(movie, filter),
  );

  const sortedFilteredMovies = sortBy(filteredMovies, (movie) => [
    movie.year,
    movie.directors,
    movie.title,
  ]);

  return sortedFilteredMovies as
    | MovieWithScreenings[]
    | MovieWithScreeningsByDay[];
}
