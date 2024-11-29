"use client";

import { flatten, groupBy, sortBy, uniq } from "lodash-es";
import { Fragment, use, useMemo } from "react";

import CalendarFilters from "@/app/(calendrier)/calendar-filters";
import MovieTable from "@/app/(calendrier)/movie-table";
import {
  transformZipcode,
  transformZipcodeToString,
} from "@/components/theaters/theaters";
import { SousTitre2 } from "@/components/typography/typography";
import { MovieWithScreenings, MovieWithScreeningsByDay } from "@/lib/types";

type RetrospectiveItem = {
  director: string;
  movies: MovieWithScreeningsByDay[];
  cinemas: Array<{
    name: string;
    zipcode: string;
  }>;
};

export function CalendrierSemaineProchaine({
  serverMovies,
}: {
  serverMovies: Promise<MovieWithScreenings[] | MovieWithScreeningsByDay[]>;
}) {
  return (
    <>
      <CalendarFilters withTimeSlider={false} withQuartierSelector={false} />
      <div className="flex grow pt-18px lg:pt-28px">
        <MovieTable serverMovies={serverMovies} allMovies={false} />
      </div>
    </>
  );
}

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsByDay[]>;
}) {
  const movies = use(moviesPromise);

  const retrospectives = useMemo(() => {
    // First, create movie-cinema pairs with zipcode
    const movieCinemaPairs = flatten(
      movies.map((movie) =>
        flatten(Object.values(movie.showtimes_by_day)).map(
          ({ preposition_and_name, zipcode }) => ({
            movie,
            cinema: preposition_and_name,
            zipcode,
          }),
        ),
      ),
    );

    // Group by director, cinema and zipcode
    const groupedByCinemaAndDirector = groupBy(
      movieCinemaPairs,
      (item) => `${item.movie.directors}|||${item.cinema}|||${item.zipcode}`,
    );

    // Filter groups with at least 5 movies and transform into intermediate format
    const filteredGroups = Object.entries(groupedByCinemaAndDirector)
      .filter(([_, items]) => {
        const uniqueMovies = uniq(items.map((item) => item.movie.title));
        return uniqueMovies.length >= 5;
      })
      .map(([key, items]) => {
        const [director, cinema, zipcode] = key.split("|||");
        const uniqueMovies = uniq(items.map((item) => item.movie));
        return {
          director,
          movies: uniqueMovies,
          cinema,
          zipcode,
        };
      });

    // Group by director to merge cinemas.
    const groupedByDirector = groupBy(filteredGroups, "director");

    return sortBy(
      Object.entries(groupedByDirector).map(
        ([director, groups]): RetrospectiveItem => ({
          director,
          movies: uniq(flatten(groups.map((g) => g.movies))),
          cinemas: groups.map((g) => ({
            name: g.cinema,
            zipcode: g.zipcode,
          })),
        }),
      ),
      "director",
    );
  }, [movies]);

  return (
    <>
      <div className="pb-20px">
        <SousTitre2>Rétrospectives</SousTitre2>
      </div>
      <div>
        {retrospectives.map((retro, i) => (
          <Fragment key={retro.director}>
            <div className="font-bold">
              {retro.director}{" "}
              {retro.cinemas.map((cinema, j) => (
                <Fragment key={`${cinema.name}-${cinema.zipcode}`}>
                  {j === 0
                    ? ""
                    : j === retro.cinemas.length - 1
                      ? " et "
                      : ", "}
                  {cinema.name} ({transformZipcode(cinema.zipcode)})
                </Fragment>
              ))}
            </div>
            <>
              {sortBy(retro.movies, (movie) => [
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
            {i < retrospectives.length - 1 ? (
              <>
                <br />
                <br />
              </>
            ) : null}
          </Fragment>
        ))}
      </div>
      <br />
      <br />
      {
        <div className="font-mono text-sm">
          <pre className="whitespace-pre-wrap break-all">
            <div className="pb-5px">
              <SousTitre2>Rétrospectives (html)</SousTitre2>
            </div>
            {retrospectives
              .map((retro, index) => {
                const movieLinks = sortBy(retro.movies, (movie) => [
                  movie.year,
                  movie.directors,
                  movie.title,
                ])
                  .map(
                    (movie, i, movies) =>
                      `<a href="https://leretroprojecteur.com/film/${movie.id}">` +
                      `<u><em>${movie.title}</em></u></a> (${movie.year})` +
                      `${i < movies.length - 1 ? ", " : ""}`,
                  )
                  .join("");

                const cinemaList = retro.cinemas
                  .map(
                    (cinema, i) =>
                      `${
                        i === 0
                          ? ""
                          : i === retro.cinemas.length - 1
                            ? " et "
                            : ", "
                      }` +
                      `${cinema.name} (${transformZipcodeToString(
                        cinema.zipcode,
                      )})`,
                  )
                  .join("");

                const template = `
    <h2 class="null" style="text-align: center;">
      <strong>Rétrospective ${retro.director} ${cinemaList}</strong>
    </h2>
    <p style="text-align: center;">${movieLinks}</p>`;

                const bullet = `
    <h2 class="null" style="text-align: center;"><span style="font-size:Default Size">&bull;</span></h2>`;

                return (
                  template + (index < retrospectives.length - 1 ? bullet : "")
                );
              })
              .join("\n")}
          </pre>
        </div>
      }
    </>
  );
}
