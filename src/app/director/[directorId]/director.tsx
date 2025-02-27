"use client";

import { groupBy, size, sortBy } from "lodash-es";
import Link from "next/link";
import React from "react";

import { TwoColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import MultiDaySeances from "@/components/seances/multiday-seances";
import {
  SectionTitle,
  SousTitre1,
  SubsectionTitle,
} from "@/components/typography/typography";
import { MovieDetail } from "@/lib/types";
import { filterByDay } from "@/lib/util";

const formatDate = (dateStr: string) => {
  try {
    const [year, month, day] = dateStr.split("_").map(Number);
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
      .format(date)
      .toUpperCase();
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};

const processMovieScreenings = (movie: MovieDetail, dayWindow = 7) => {
  try {
    // Skip if no screenings
    if (!movie?.screenings || !Object.keys(movie.screenings).length) {
      return [];
    }

    // Sanitize data to avoid errors in filterByDay
    const safeScreenings = Object.fromEntries(
      Object.entries(movie.screenings)
        .map(([date, theaters]) => {
          if (!Array.isArray(theaters)) return [date, []];

          const validTheaters = theaters.filter(
            (theater) =>
              theater && theater.seances && typeof theater.seances === "object",
          );

          return [date, validTheaters];
        })
        .filter(([_, theaters]) => theaters.length > 0),
    );

    if (Object.keys(safeScreenings).length === 0) return [];

    // Safely apply filterByDay
    let filteredScreenings;
    try {
      filteredScreenings = filterByDay(safeScreenings, dayWindow);
    } catch (error) {
      return [];
    }

    if (!filteredScreenings || !size(filteredScreenings)) return [];

    // Format the results
    return Object.entries(filteredScreenings).flatMap(([date, theaters]) => {
      if (!Array.isArray(theaters)) return [];

      const normalizedTheaters = theaters.map((theater) => ({
        name: theater.name || "",
        neighborhood: theater.neighborhood || "",
        zipcode: theater.zipcode || "",
        preposition_and_name: theater.preposition_and_name || "",
        seances: theater.seances || {},
      }));

      return normalizedTheaters.length > 0
        ? [{ date, movie, theaters: normalizedTheaters }]
        : [];
    });
  } catch (error) {
    return [];
  }
};

const getScreeningsByDate = (movies: MovieDetail[], dayWindow = 7) => {
  // Process movies safely with error handling for each movie
  const allScreenings = movies.flatMap((movie) => {
    return processMovieScreenings(movie, dayWindow);
  });
  // Group by date
  const screeningsByDate = groupBy(allScreenings, "date");
  // Format results
  return Object.entries(screeningsByDate)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, screenings]) => ({
      date,
      moviesForDay: screenings.map(({ movie, theaters }) => ({
        ...movie,
        theaters,
      })),
    }));
};

export default function DirectorView({
  movies,
  directorName,
}: {
  movies: MovieDetail[];
  directorName: string;
}) {
  const sortedMovies = sortBy(movies, [(movie) => Number(movie.year) || 0]);
  const screeningsByDate = getScreeningsByDate(movies);

  return (
    <>
      <PageHeader text={"Cinéaste"}>
        <SousTitre1>{directorName}</SousTitre1>
      </PageHeader>
      <TwoColumnPage
        narrow
        left={
          <div className="flex flex-col">
            <SectionTitle color="bg-retro-green">Filmographie</SectionTitle>
            <div>
              {sortedMovies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/film/${movie.id}`}
                  className="block border-b py-12px font-semibold lg:py-16px lg:hover:bg-retro-pale-green"
                >
                  <div>
                    <u className="uppercase">{movie.title}</u> ({movie.year})
                  </div>
                </Link>
              ))}
            </div>
          </div>
        }
        right={
          <>
            <SectionTitle>Prochaines séances à Paris</SectionTitle>
            <div className="flex flex-col">
              {screeningsByDate.map(({ date, moviesForDay }) => (
                <div key={date}>
                  <SubsectionTitle align="text-left">
                    <span className="uppercase">{formatDate(date)}</span>
                  </SubsectionTitle>
                  {moviesForDay.map((movie) => (
                    <MultiDaySeances
                      key={movie.id}
                      screenings={{ [date]: movie.theaters }}
                      groupClassName="flex items-center border-b py-12px [&>div:first-child]:w-40 [&>div:first-child]:shrink-0"
                      hideDate={true}
                      title={movie.title}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        }
      />
    </>
  );
}
