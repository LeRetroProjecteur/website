"use client";

import { flatten, groupBy, sortBy, uniq } from "lodash-es";
import { use, useMemo } from "react";

import CalendarFilters from "@/app/(calendrier)/calendar-filters";
import MovieTable from "@/app/(calendrier)/movie-table";
import { TextBox } from "@/components/layout/text-boxes";
import {
  transformZipcode,
  transformZipcodeToString,
} from "@/components/theaters/theaters";
import { SousTitre2 } from "@/components/typography/typography";
import { MovieWithScreeningsSeveralDays } from "@/lib/types";

type RetrospectiveItem = {
  director: string;
  movies: MovieWithScreeningsSeveralDays[];
  cinemas: Array<{
    name: string;
    zipcode: string;
  }>;
};

export function CalendrierSemaineProchaine({
  serverMovies,
}: {
  serverMovies: Promise<MovieWithScreeningsSeveralDays[]>;
}) {
  return (
    <>
      <CalendarFilters withTimeSlider={false} />
      <div className="flex grow pt-18px lg:pt-28px">
        <MovieTable serverMovies={serverMovies} allMovies={false} />
      </div>
    </>
  );
}

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsSeveralDays[]>;
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
        return uniqueMovies.length >= 3;
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

  const html = retrospectives
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
            `${i === 0 ? "" : i === retro.cinemas.length - 1 ? " et " : ", "}` +
            `${cinema.name} (${transformZipcodeToString(cinema.zipcode)})`,
        )
        .join("");
      const template = `
<h2 class="null" style="text-align: center;">
<strong>Rétrospective ${retro.director} ${cinemaList}</strong>
</h2>
<p style="text-align: center;">${movieLinks}</p>`;
      const bullet = `
<h2 class="null" style="text-align: center;"><span style="font-size:Default Size">&bull;</span></h2>`;
      return template + (index < retrospectives.length - 1 ? bullet : "");
    })
    .join("\n");

  return (
    <>
      <SousTitre2>Rétrospectives</SousTitre2>
      <div className="flex flex-col gap-y-10px py-20px">
        {retrospectives.map((retro, i) => (
          <div key={i}>
            <div className="font-bold">
              {retro.director}{" "}
              {retro.cinemas.map((cinema, j) => (
                <span key={j}>
                  {j === 0
                    ? ""
                    : j === retro.cinemas.length - 1
                      ? " et "
                      : ", "}
                  {cinema.name} ({transformZipcode(cinema.zipcode)})
                </span>
              ))}
            </div>
            {sortBy(retro.movies, (movie) => [
              movie.year,
              movie.directors,
              movie.title,
            ]).map((movie, i, movies) => (
              <span key={i}>
                <i>{movie.title}</i> ({movie.year})
                {i < movies.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        ))}
      </div>
      <TextBox
        className="bg-retro-pale-green"
        onClick={() => {
          navigator.clipboard.writeText(html);
        }}
      >
        Copier le code HTML pour le MailChimp
      </TextBox>
    </>
  );
}
