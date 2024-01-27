"use client";

import {
  capitalize,
  fromPairs,
  groupBy,
  includes,
  sortBy,
  toPairs,
  uniqBy,
} from "lodash-es";
import { Fragment, use, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre2 } from "@/components/typography/typography";
import GetHTML from "@/components/util/get-html";
import IFrame from "@/components/util/iframe";
import { MovieWithShowtimesByDay } from "@/lib/types";
import {
  checkNotNull,
  floatHourToString,
  formatYYYYMMDD,
  getNextMovieWeek,
} from "@/lib/util";

interface Inputs {
  mercredi: string;
  jeudi: string;
  vendredi: string;
  samedi: string;
  dimanche: string;
  lundi: string;
  mardi: string;
}

export default function GenerateNewsletter({
  movies,
}: {
  movies: Promise<MovieWithShowtimesByDay[]>;
}) {
  return (
    <>
      <PageHeader text="Newsletter"></PageHeader>
      <div className="flex flex-col pl-20px">
        <SuspenseWithLoading>
          <div className="flex flex-col border-b pb-44px">
            <Movies movies={movies} />
          </div>
          <div className="flex flex-col pt-44px">
            <Retrospectives movies={movies} />
          </div>
        </SuspenseWithLoading>
      </div>
    </>
  );
}

export function Movies({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithShowtimesByDay[]>;
}) {
  const movies = use(moviesPromise);
  const { register, watch } = useForm<Inputs>();

  const [html, setHtml] = useState("");

  const week = useMemo(() => getNextMovieWeek(), []);

  const days: Array<keyof Inputs> = useMemo(
    () =>
      week.map((day) => format(day, "eeee", { locale: fr }) as keyof Inputs),
    [week],
  );

  const dayValues = watch(days);

  const moviesByDay = useMemo(
    () =>
      week.map((date) => {
        const dateString = formatYYYYMMDD(date);
        return movies.filter(({ showtimes_by_day }) =>
          includes(Object.keys(showtimes_by_day), dateString),
        );
      }),
    [week, movies],
  );

  const moviesById = useMemo(
    () => fromPairs(movies.map((movie) => [movie.id, movie])),
    [movies],
  );

  return (
    <>
      <div className="pb-20px">
        <SousTitre2>Semaine de cinéma</SousTitre2>
      </div>
      <div className="flex flex-col gap-10px">
        {days.map((day, i) => (
          <div key={day} className="flex flex-col gap-5px">
            <BodyCopy>{capitalize(day)}</BodyCopy>
            <select id={day} {...register(day)}>
              [<option value="">-----</option>
              {sortBy(moviesByDay[i], (movie) => [movie.title]).map((movie) => (
                <option value={movie.id} key={movie.id}>
                  {movie.title}, {movie.directors} ({movie.year})
                </option>
              ))}
              ]
            </select>
          </div>
        ))}
      </div>
      <IFrame html={html} className="h-[1000px] w-[600px]"></IFrame>
      <div className="font-mono">{html}</div>
      <GetHTML onChange={setHtml}>
        <div className="days">
          {week.map((day, i) => {
            if (dayValues[i] == null || dayValues[i] === "") {
              return null;
            } else {
              const movie = checkNotNull(moviesById[dayValues[i]]);
              const showtimes = sortBy(
                uniqBy(
                  movie.showtimes_by_day[formatYYYYMMDD(day)],
                  (showtimes_theater) => showtimes_theater.clean_name,
                ),
                (showtimes_theater) => showtimes_theater.clean_name,
              );
              return (
                <Fragment key={i}>
                  <div>
                    <div>
                      <u>
                        <span>
                          {capitalize(
                            format(day, "EEEE d MMMM", { locale: fr }),
                          )}
                        </span>
                      </u>
                    </div>
                    <div>
                      <i>{movie.title}</i>, {movie.directors} ({movie.year})
                    </div>
                  </div>
                  {showtimes.map((showtimes_theater) => (
                    <div key={showtimes_theater.clean_name}>
                      {showtimes_theater.clean_name} (
                      {showtimes_theater.zipcode_clean})&nbsp;:{" "}
                      {showtimes_theater.showtimes
                        .map((showtime) => floatHourToString(showtime))
                        .join(", ")}
                    </div>
                  ))}
                </Fragment>
              );
            }
          })}
        </div>
      </GetHTML>
    </>
  );
}

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithShowtimesByDay[]>;
}) {
  const movies = use(moviesPromise);
  const retrospectives = useMemo(
    () =>
      sortBy(
        toPairs(groupBy(movies, (movie) => movie.directors)).filter(
          ([_, movies]) => movies.length > 3,
        ),
        ([director]) => director,
      ),
    [movies],
  );

  return (
    <>
      <div className="pb-20px">
        <SousTitre2>Rétrospectives</SousTitre2>
      </div>
      <div>
        {retrospectives.map(([director, movies], i, directors) => (
          <Fragment key={director}>
            <div>{director}</div>
            <>
              {sortBy(movies, (movie) => [
                movie.year,
                movie.directors,
                movie.title,
              ]).map((movie, i, movies) => (
                <Fragment key={movie.title}>
                  <i>{movie.title}</i> ({movie.year})
                  {i < movies.length - 1 ? ", " : ""}
                </Fragment>
              ))}
            </>
            {i < directors.length - 1 ? (
              <>
                <br />
                <br />
              </>
            ) : null}
          </Fragment>
        ))}
      </div>
    </>
  );
}
