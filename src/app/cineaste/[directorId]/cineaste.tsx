"use client";

import { groupBy, size, sortBy } from "lodash-es";
import Link from "next/link";
import React from "react";

import { TwoColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import Seances from "@/components/seances/seances";
import {
  BodyCopy,
  SectionTitle,
  SousTitre1,
  SubsectionTitle,
} from "@/components/typography/typography";
import { MovieDetail } from "@/lib/types";
import { filterByDay, formatLundi1Janvier, safeDate } from "@/lib/utils";

const processMovieScreenings = (movie: MovieDetail, dayWindow = 7) => {
  // Skip if no screenings
  if (!movie?.screenings || !Object.keys(movie.screenings).length) {
    return [];
  }

  if (Object.keys(movie.screenings).length === 0) return [];
  let filteredScreenings;
  try {
    filteredScreenings = filterByDay(movie.screenings, dayWindow);
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
  movies = movies.filter((movie) => movie && Object.keys(movie).length > 0);
  const sortedMovies = sortBy(movies, (movie) => Number(movie.year) || 0);
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
            <div className="mb-12 block md:hidden"></div>
            <SectionTitle>Prochaines séances à Paris</SectionTitle>
            <div className="flex flex-col">
              {size(screeningsByDate) > 0 ? (
                screeningsByDate.map(({ date, moviesForDay }) => (
                  <div key={date}>
                    <SubsectionTitle align="text-left">
                      <span>
                        {formatLundi1Janvier(safeDate(date)).toUpperCase()}
                      </span>
                    </SubsectionTitle>
                    {moviesForDay.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-start border-b py-12px"
                      >
                        <div className="w-60 shrink-0 pr-6 uppercase italic">
                          {movie.title}
                        </div>
                        <div className="flex flex-1 justify-end">
                          <Seances
                            movie={movie}
                            screenings={movie.theaters}
                            day={date}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                // Pas de séances
                <div className="border-b py-12px text-center lg:grow lg:py-16px">
                  <BodyCopy>Pas de séances prévues pour le moment</BodyCopy>
                </div>
              )}
            </div>
          </>
        }
      />
    </>
  );
}
