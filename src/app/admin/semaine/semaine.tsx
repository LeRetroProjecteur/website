"use client";

import { capitalize, groupBy, sortBy, toPairs, uniqBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import React from "react";

import { format, parse } from "date-fns";
import { fr } from "date-fns/locale";

import MovieTable from "@/components/movie-table";
import { MovieWithShowtimesByDay } from "@/lib/types";
import {
  floatHourToString,
  movie_info_containsFilteringTerm,
} from "@/lib/util";

import logo_square from "../../../assets/logo_square.png";

async function getApiMovies(): Promise<MovieWithShowtimesByDay[]> {
  return (await fetch("/admin/semaine/api")).json();
}

export default function Semaine() {
  const _ = useSearchParams();

  const [movies, setMovies] = useState<MovieWithShowtimesByDay[] | undefined>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      setMovies(await getApiMovies());
    })();
  }, []);

  return (
    <>
      <p style={{ margin: "7px" }}></p>
      <FilterableMovies movies={movies} />
    </>
  );
}

export function FilterableMovies({
  movies,
}: {
  movies: MovieWithShowtimesByDay[] | undefined;
}) {
  const [filter, setFilter] = useState("");
  const onChangeFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value),
    [setFilter],
  );

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: "7px" }}></p>
        &nbsp;
        <div className="filtering">
          <label htmlFor="filtering-box"></label>
          <input
            type="text"
            className="filtering-box"
            id="filtering-box"
            placeholder="Réalisateur, pays..."
            onChange={onChangeFilter}
          />
        </div>
      </div>
      <p style={{ margin: "7px" }}></p>
      <MovieTable>
        {movies == null ? (
          [...Array(20)].map((_, i) => (
            <tr key={i}>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))
        ) : (
          <Movies movies={movies} filter={filter} />
        )}
      </MovieTable>
      <br />
      <br />
      <Retrospectives movies={movies} />
    </>
  );
}

export function Retrospectives({
  movies,
}: {
  movies?: MovieWithShowtimesByDay[];
}) {
  const retrospectives = useMemo(
    () =>
      movies == null
        ? []
        : sortBy(
            toPairs(groupBy(movies, (movie) => movie.directors)).filter(
              ([_, movies]) => movies.length > 3,
            ),
            ([director]) => director,
          ),
    [movies],
  );

  return (
    <>
      <h2>Retrospectives :</h2>
      <div id="retrospectives">
        <br />
        {retrospectives.map(([director, movies], i, directors) => (
          <React.Fragment key={director}>
            <h3 style={{ textAlign: "left" }}>{director}</h3>
            <>
              {sortBy(movies, (movie) => [
                movie.year,
                movie.directors,
                movie.title,
              ]).map((movie, i, movies) => (
                <React.Fragment key={movie.title}>
                  <i>{movie.title}</i> ({movie.year})
                  {i < movies.length - 1 ? ", " : ""}
                </React.Fragment>
              ))}
            </>
            {i < directors.length - 1 ? (
              <>
                <br />
                <br />
              </>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export function Movies({
  movies,
  filter,
}: {
  movies: MovieWithShowtimesByDay[];
  filter: string;
}) {
  const filteredMovies = useMemo(
    () =>
      sortBy(movies, (movie) => [
        movie.year,
        movie.directors,
        movie.title,
      ]).filter(
        (movie) =>
          filter == "" || movie_info_containsFilteringTerm(movie, filter),
      ),
    [movies, filter],
  );

  return (
    <>
      {filteredMovies.length > 0 ? (
        sortBy(filteredMovies, (movie) => [
          movie.year,
          movie.directors,
          movie.title,
        ]).map((movie) => (
          <tr key={movie.id}>
            <td>
              <Link
                href={`/details/${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                {movie?.category === "COUP DE CŒUR" ? (
                  <div className="logo_cdc">
                    <Image
                      src={logo_square}
                      width={20}
                      height={17}
                      alt="coup-de-coeur"
                    />
                  </div>
                ) : null}
                <b>{movie.title}</b>, {movie.directors} ({movie.year})
              </Link>
            </td>
            <td>
              {sortBy(toPairs(movie.showtimes_by_day), ([day]) => day).map(
                ([day, showtimes_theater]) => (
                  <div key={day}>
                    <b>
                      {capitalize(
                        format(
                          parse(day, "y-MM-dd", new Date()),
                          "EEEE d MMMM",
                          { locale: fr },
                        ),
                      )}
                    </b>
                    &nbsp;
                    {sortBy(
                      uniqBy(
                        showtimes_theater,
                        (showtime_theater) => showtime_theater.clean_name,
                      ),
                      (showtime_theater) => showtime_theater.clean_name,
                    )
                      .map(
                        (showtime_theater) =>
                          `${showtime_theater.clean_name}: (${
                            showtime_theater.zipcode_clean
                          }) ${sortBy(showtime_theater.showtimes)
                            .map((showtime) => {
                              return floatHourToString(showtime);
                            })
                            .join(", ")}`,
                      )
                      .join(" ; ")}
                  </div>
                ),
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={2}>
            <b>Aucun film ne correspond à cette recherche</b>
          </td>
        </tr>
      )}
    </>
  );
}
