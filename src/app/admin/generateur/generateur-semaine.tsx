"use client";

import { capitalize, fromPairs, includes, sortBy, uniqBy } from "lodash-es";
import { DateTime } from "luxon";
import { use, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { SuspenseWithLoading } from "@/components/icons/loading";
import { TwoColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import { transformZipcode } from "@/components/theaters/theaters";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";
import GetHTML from "@/components/util/get-html";
import IFrame from "@/components/util/iframe";
import { MovieWithScreeningsSeveralDays, TheaterScreenings } from "@/lib/types";
import {
  checkNotNull,
  floatHourToString,
  formatLundi,
  formatLundi1Janvier,
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

export default function GenerateurSemaine({
  movies,
}: {
  movies: Promise<MovieWithScreeningsSeveralDays[]>;
}) {
  return (
    <>
      <PageHeader text="El Generator">
        <SousTitre1>Générateur de la Semaine Cinéma</SousTitre1>
      </PageHeader>
      <SuspenseWithLoading>
        <SemaineCinema movies={movies} />
      </SuspenseWithLoading>
    </>
  );
}

export function SemaineCinema({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsSeveralDays[]>;
}) {
  const movies = use(moviesPromise);
  const { register, watch } = useForm<Inputs>();

  const [html, setHtml] = useState("");

  const week = useMemo(() => getNextMovieWeek(), []);

  const days: Array<keyof Inputs> = useMemo(
    () => week.map((day) => formatLundi(day) as keyof Inputs),
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
      <TwoColumnPage
        left={
          <>
            {days.map((day, i) => (
              <div key={day} className="flex flex-col pb-10px">
                <BodyCopy>{capitalize(day)}</BodyCopy>
                <select id={day} {...register(day)}>
                  [<option value="">-----</option>
                  {sortBy(moviesByDay[i], (movie) => [movie.title]).map(
                    (movie) => (
                      <option value={movie.id} key={movie.id}>
                        {movie.title}, {movie.directors} ({movie.year})
                      </option>
                    ),
                  )}
                  ]
                </select>
              </div>
            ))}
          </>
        }
        right={
          <>
            <div className="flex grow">
              <IFrame html={html}></IFrame>
            </div>
          </>
        }
      >
        <div className="border-b py-20px font-mono">{html}</div>
        <GetHTML onChange={setHtml}>
          <div
            style={{ textAlign: "center", color: "#4d4d4d", lineHeight: 1.5 }}
          >
            <DaysMovies
              week={week}
              dayValues={dayValues}
              moviesById={moviesById}
            />
          </div>
        </GetHTML>
      </TwoColumnPage>
    </>
  );
}

export function DaysMovies({
  week,
  dayValues,
  moviesById,
}: {
  week: DateTime[];
  dayValues: string[];
  moviesById: { [key: string]: MovieWithScreeningsSeveralDays };
}) {
  return (
    <>
      {week.map((day, i) => {
        if (dayValues[i] == null || dayValues[i] === "") {
          return null;
        } else {
          const movie = checkNotNull(moviesById[dayValues[i]]);
          const showtimesTheaters = sortBy(
            uniqBy(
              movie.showtimes_by_day[formatYYYYMMDD(day)],
              (showtimesTheater) => showtimesTheater.name,
            ),
            (showtimesTheater) => showtimesTheater.name,
          );
          return (
            <DayMovie
              key={i}
              movie={movie}
              showtimesTheaters={showtimesTheaters}
              day={day}
              isLast={i == week.length - 1}
            />
          );
        }
      })}
    </>
  );
}

export function DayMovie({
  movie,
  day,
  showtimesTheaters,
  isLast,
}: {
  movie: MovieWithScreeningsSeveralDays;
  day: DateTime;
  showtimesTheaters: TheaterScreenings[];
  isLast: boolean;
}) {
  return (
    <>
      <div style={{ fontWeight: 700, textDecoration: "underline" }}>
        {capitalize(formatLundi1Janvier(day))}
      </div>
      <div style={{ fontWeight: 700 }}>
        <i style={{ textTransform: "uppercase" }}>{movie.title}</i>,{" "}
        {movie.directors} ({movie.year})
      </div>
      {showtimesTheaters.map((showtimesTheater) => (
        <div key={showtimesTheater.name}>
          {showtimesTheater.name} ({transformZipcode(showtimesTheater.zipcode)}
          )&nbsp;:{" "}
          {Object.values(showtimesTheater.seances)
            .map((screening) => floatHourToString(screening.time))
            .join(", ")}
        </div>
      ))}
      {!isLast && <div>•</div>}
    </>
  );
}
