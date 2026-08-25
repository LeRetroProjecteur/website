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
  cinema: string;
  zipcode: string;
  day: string;
  time: number;
  notes: string;
};

type SeanceSpecialeItem = {
  movie: MovieWithScreeningsSeveralDays;
  screenings: SeanceSpeciale[];
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

  const formatDay = (day: string) => safeDate(day).toFormat("EEEE d MMMM");

  const seancesSpeciales = useMemo(() => {
    const items: SeanceSpecialeItem[] = [];

    for (const movie of movies) {
      const screenings: SeanceSpeciale[] = [];
      for (const [day, theaters] of Object.entries(movie.showtimes_by_day)) {
        for (const theater of theaters) {
          for (const seance of Object.values(theater.seances)) {
            if (seance.notes != null) {
              screenings.push({
                cinema: theater.preposition_and_name,
                zipcode: theater.zipcode,
                day,
                time: seance.time,
                notes: seance.notes,
              });
            }
          }
        }
      }
      if (screenings.length > 0) {
        items.push({
          movie,
          screenings: sortBy(screenings, ["day", "time"]),
        });
      }
    }

    return sortBy(items, (item) => item.movie.title);
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
      .map((item) => {
        const screeningLines = item.screenings
          .map(
            (s) =>
              `<a href="https://leretroprojecteur.com/film/${item.movie.id}"><u><em>${item.movie.title}</em></u></a> (${item.movie.year}) de ${item.movie.directors} — ${formatDay(s.day)}, ${floatHourToString(s.time)} ${s.cinema} (${transformZipcodeToString(s.zipcode)}) — ${s.notes}`,
          )
          .join("<br/>");
        return `<p style="text-align: center;">${screeningLines}</p>`;
      })
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
          {seancesSpeciales.map((item, i) =>
            item.screenings.map((s, j) => (
              <div key={`${i}-${j}`}>
                &bull; <i>{item.movie.title}</i> ({item.movie.year}) de{" "}
                {item.movie.directors} — {formatDay(s.day)},{" "}
                {floatHourToString(s.time)} {s.cinema} (
                {transformZipcode(s.zipcode)}) — {s.notes}
              </div>
            )),
          )}
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
