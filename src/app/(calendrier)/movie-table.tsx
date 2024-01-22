"use client";

import clsx from "clsx";
import {
  capitalize,
  orderBy,
  some,
  sortBy,
  take,
  toPairs,
  uniqBy,
} from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import {
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";

import { Loading, SuspenseWithLoading } from "@/components/icons/loading";
import { BodyCopy, SousTitre2 } from "@/components/typography/typography";
import { Quartier, useCalendrierStore } from "@/lib/calendrier-store";
import {
  Movie,
  MovieWithNoShowtimes,
  MovieWithShowtimesByDay,
  ShowtimesTheater,
} from "@/lib/types";
import {
  checkNotNull,
  fetcher,
  floatHourToString,
  formatLundi1Janvier,
  formatYYYYMMDD,
  isCoupDeCoeur,
  isMovieWithShowtimesByDay,
  isMoviesWithShowtimesByDay,
  isTodayInParis,
  movie_info_containsFilteringTerm,
  nowInParis,
  safeDate,
  splitIntoSubArrays,
} from "@/lib/util";

import coupDeCoeur from "../../assets/coup-de-coeur.png";

export default function MovieTable({
  serverMovies,
  allMovies,
}: {
  serverMovies: Promise<Movie[] | MovieWithShowtimesByDay[]>;
  allMovies?: boolean;
}) {
  useEffect(() => {
    useCalendrierStore.getState().reset();
  }, []);

  const date = useCalendrierStore((s) => s.date);
  const useClientData = useCalendrierStore((s) => s.dateChanged);
  const minHour = useCalendrierStore((s) => s.minHour);
  const maxHour = useCalendrierStore((s) => s.maxHour);
  const filter = useCalendrierStore((s) => s.filter);
  const quartiers = useCalendrierStore((s) => s.quartiers);

  const url =
    allMovies ?? false
      ? `/api/movies/all-by-day/${formatYYYYMMDD(date)}`
      : `/api/movies/by-day/${formatYYYYMMDD(date)}`;

  const { data: clientMovies, isLoading } = useSWR<
    Movie[] | MovieWithShowtimesByDay[]
  >(useClientData ? url : false, fetcher);

  const minHourFilteringTodaysMissedFilms = useMemo(
    () => getMinHourFilteringTodaysMissedFilms(date, minHour),
    [minHour, date],
  );

  return (
    <SuspenseWithLoading>
      {isLoading ? (
        <Loading />
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
  serverMovies: Promise<Movie[] | MovieWithShowtimesByDay[]>;
  clientMovies?: Movie[] | MovieWithShowtimesByDay[];
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
      cellClassName="bg-retro-green lg:px-20px border-t lg:py-17px p-6px"
      leftCol={<SousTitre2>Films</SousTitre2>}
      rightCol={<SousTitre2>Séances</SousTitre2>}
    />
  );
}

function EmptyTableState({ filter }: { filter: string }) {
  return (
    <Row
      cellClassName="lg:px-10px lg:py-20px py-13px px-6px"
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

function MovieRows({
  movies,
}: {
  movies: Movie[] | MovieWithShowtimesByDay[];
}) {
  return movies.map((movie) => (
    <Row
      key={movie.id}
      rowClassName="group"
      cellClassName="group-odd:bg-retro-green group-odd:lg:bg-white lg:group-hover:bg-retro-pale-green"
      leftCol={<MovieCell movie={movie} />}
      rightCol={
        isMovieWithShowtimesByDay(movie) ? (
          <div className="py-12px lg:py-17px">
            <MultiDaySeances movie={movie} />
          </div>
        ) : (
          <Seances movie={movie} />
        )
      }
    />
  ));
}

function TableFooter() {
  return (
    <div className="flex grow">
      <div className="h-300px w-1/2 border-r"></div>
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
        <div className={clsx("grow border-b", cellClassName)}>{leftCol}</div>
      </div>
      <div className="flex w-1/2">
        <div className={clsx("grow border-b", cellClassName)}>{rightCol}</div>
      </div>
    </div>
  );
}

function MovieCell({ movie }: { movie: MovieWithNoShowtimes }) {
  return (
    <Link
      href={`/archives/${movie.id}`}
      className="block cursor-pointer py-12px pr-10px lg:py-17px"
    >
      <div className="flex px-6px lg:pl-10px lg:pr-0">
        <div className="grow">
          <BodyCopy>
            <i className="italic group-hover:underline">{movie.title}</i>,{" "}
            {movie.directors} ({movie.year})
          </BodyCopy>
        </div>
        {isCoupDeCoeur(movie) && (
          <div className="shrink-0">
            <Image className="w-25px" alt="coup de coeur" src={coupDeCoeur} />
          </div>
        )}
      </div>
    </Link>
  );
}

function MultiDaySeances({ movie }: { movie: MovieWithShowtimesByDay }) {
  return (
    <div className="multi-day flex grow flex-col gap-20px px-6px lg:gap-10px lg:pl-10px lg:pr-0">
      {orderBy(
        toPairs(movie.showtimes_by_day).map<[Date, ShowtimesTheater[]]>(
          ([day, theaters]) => [safeDate(day), theaters],
        ),
        ([day]) => day,
      ).map(([day, theaters], i) => (
        <div key={i} className="flex grow flex-col gap-10px lg:gap-5px">
          <BodyCopy>
            <strong className="font-semibold">
              {capitalize(formatLundi1Janvier(day))}
            </strong>
          </BodyCopy>
          <div className="flex grow flex-col gap-10px lg:gap-5px">
            {sortBy(
              uniqBy(
                theaters,
                (showtime_theater) => showtime_theater.clean_name,
              ),
              (showtime_theater) => showtime_theater.clean_name,
            ).map((theater) => (
              <SceancesTheater
                showtimesTheater={theater}
                key={theater.clean_name}
                isExpanded={true}
              />
            ))}
          </div>
        </div>
      ))}
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
      sortedTheaters.length > 3 ||
      sortedTheaters.reduce((total, curr) => total + curr.showtimes.length, 0) >
        6,
    [sortedTheaters],
  );

  return (
    <div
      onClick={toggleExpanded}
      className={clsx(
        { "cursor-pointer": needsExpanding },
        "single-day flex grow flex-col gap-10px px-6px py-12px lg:gap-5px lg:py-17px lg:pl-10px lg:pr-0",
      )}
    >
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
          <BodyCopy className="font-semibold">
            {isExpanded ? "Moins de séances ↑" : "Plus de séances ↓"}
          </BodyCopy>
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
      <div className="grow pr-20px">
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
  movies: Movie[] | MovieWithShowtimesByDay[],
  minHourFilteringTodaysMissedFilms: number,
  maxHour: number,
  quartiers: Quartier[],
  filter: string,
) {
  const moviesWithFilteredShowtimes = isMoviesWithShowtimesByDay(movies)
    ? movies
    : movies
        .map<Movie>((movie) => ({
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

  return sortedFilteredMovies as Movie[] | MovieWithShowtimesByDay[];
}
