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
import { floatHourToString, safeDate } from "@/lib/utils";

type SeanceSpeciale = {
  movie: MovieWithScreeningsSeveralDays;
  cinema: string;
  day: string;
  time: number;
  notes: string;
};

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

export function Evenements({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsSeveralDays[]>;
}) {
  const movies = use(moviesPromise);

  const formatDay = (day: string) =>
    safeDate(day).toFormat("ccc d MMM").replaceAll(".", "");

  const seancesSpeciales = useMemo(() => {
    const items: SeanceSpeciale[] = [];

    for (const movie of movies) {
      for (const [day, theaters] of Object.entries(movie.showtimes_by_day)) {
        for (const theater of theaters) {
          for (const seance of Object.values(theater.seances)) {
            if (seance.notes != null) {
              items.push({
                movie,
                cinema: theater.preposition_and_name,
                day,
                time: seance.time,
                notes: seance.notes,
              });
            }
          }
        }
      }
    }

    return sortBy(items, ["day", "time"]);
  }, [movies]);

  const retrospectives = useMemo(() => {
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

    const groupedByCinemaAndDirector = groupBy(
      movieCinemaPairs,
      (item) => `${item.movie.directors}|||${item.cinema}|||${item.zipcode}`,
    );

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

  const bullet = `\n<h2 class="null" style="text-align: center;"><span style="font-size:Default Size">&bull;</span></h2>`;

  const seancesSpecialesHtml = (() => {
    if (seancesSpeciales.length === 0) return "";
    const header = `\n<h2 class="null" style="text-align: center;">\n<strong>Séances spéciales</strong>\n</h2>`;
    const items = seancesSpeciales
      .map(
        (s) =>
          `<p style="text-align: center;"><a href="https://leretroprojecteur.com/film/${
            s.movie.id
          }"><u><em>${s.movie.title}</em></u></a> (${
            s.movie.year
          }) de ${s.movie.directors} — <strong>${
            s.notes
          }</strong> (${formatDay(s.day)} ${floatHourToString(s.time)} ${
            s.cinema
          })</p>`,
      )
      .join("");
    return header + items;
  })();

  const retrospectivesHtml = retrospectives
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
      return template + (index < retrospectives.length - 1 ? bullet : "");
    })
    .join("\n");

  const combinedHtml = [seancesSpecialesHtml, retrospectivesHtml]
    .filter(Boolean)
    .join(bullet);

  return (
    <>
      <SousTitre2>Événements</SousTitre2>
      <div className="flex flex-col gap-y-10px py-20px">
        <div>
          <div className="font-bold">Séances spéciales</div>
          {seancesSpeciales.map((s, i) => (
            <div key={i}>
              &bull; <i>{s.movie.title}</i> ({s.movie.year}) de{" "}
              {s.movie.directors} — <b>{s.notes}</b> ({formatDay(s.day)}{" "}
              {floatHourToString(s.time)} {s.cinema})
            </div>
          ))}
        </div>
        {retrospectives.map((retro, i) => (
          <div key={i}>
            <div className="font-bold">
              Rétrospective {retro.director}{" "}
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
          navigator.clipboard.writeText(combinedHtml);
        }}
      >
        Copier le code HTML pour le MailChimp
      </TextBox>
    </>
  );
}
