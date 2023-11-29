import classnames from "classnames";
import { some, sortBy, take, uniqBy } from "lodash-es";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { CalendrierStore, Quartier } from "@/lib/calendrier-store";
import { Movie } from "@/lib/types";
import {
  floatHourToString,
  isTodayInParis,
  movie_info_containsFilteringTerm,
  nowInParis,
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
  const movies = useCalendrierStore((s) => s.movies);

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
      <div className="flex">
        <div className="border-retro-gray flex w-1/2 border-r pr-1">
          <div className="bg-retro-green text-retro-gray border-retro-gray grow border-y py-2 pl-1 text-xl font-semibold uppercase">
            Films
          </div>
        </div>
        <div className="border-retro-gray flex w-1/2 pl-1">
          <div className="bg-retro-green text-retro-gray border-retro-gray grow border-y py-2 pl-1 text-xl font-semibold uppercase">
            Séances
          </div>
        </div>
      </div>
      {sortedFilteredMovies.map((movie, i) => (
        <div key={movie.id} className="flex">
          <div className="border-retro-gray flex w-1/2 border-r pr-1">
            <div
              className={classnames(
                { "bg-retro-green": i % 2 == 1 },
                "text-retro-black border-retro-gray flex grow items-center gap-1 border-b px-1 py-2 font-medium",
              )}
            >
              <div className="grow">
                <i className="italic">{movie.title}</i>, {movie.directors} (
                {movie.year})
              </div>
              {movie?.category === "COUP DE CŒUR" ? (
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
          <div className="border-retro-gray flex w-1/2 pl-1">
            <div
              className={classnames(
                { "bg-retro-green": i % 2 == 1 },
                "text-retro-black border-retro-gray flex grow border-b px-1 py-2 font-medium",
              )}
            >
              <Seances movie={movie} />
            </div>
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
    <div className="flex grow flex-col gap-3">
      {(isExpanded ? sorted : take(sorted)).map((showtime_theater) => (
        <div
          className="flex justify-between gap-3"
          key={showtime_theater.clean_name}
        >
          <div className="grow">
            {showtime_theater.clean_name} ({showtime_theater.zipcode_clean})
          </div>
          <div className="flex flex-col text-right">
            {sortBy(showtime_theater.showtimes).map((showtime, i) => (
              <div key={i}>{floatHourToString(showtime)}</div>
            ))}
          </div>
        </div>
      ))}
      {sorted.length > 1 ? (
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
