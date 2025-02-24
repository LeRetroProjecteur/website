"use client";

import { size } from "lodash-es";
import Link from "next/link";
import React, { ReactNode } from "react";

import { TwoColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import MultiDaySeances from "@/components/seances/multiday-seances";
import {
  SectionTitle,
  SousTitre1,
  SubsectionTitle,
} from "@/components/typography/typography";
import { MovieDetail, TheaterScreenings } from "@/lib/types";
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

export default function DirectorView({
  movies,
  directorName,
}: {
  movies: MovieDetail[];
  directorName: string;
}) {
  const sortedMovies = [...movies].sort(
    (a, b) => (Number(a.year) || 0) - (Number(b.year) || 0),
  );

  return (
    <>
      <PageHeader text={"Cinéaste"}>
        <SousTitre1>{directorName}</SousTitre1>
      </PageHeader>
      <TwoColumnPage
        narrow
        left={
          (
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
          ) as ReactNode
        }
        right={
          (
            <>
              <SectionTitle>Prochaines séances à Paris</SectionTitle>
              <div className="flex flex-col">
                {Object.entries(
                  movies.reduce(
                    (acc, movie) => {
                      if (
                        !movie?.screenings ||
                        !Object.keys(movie.screenings).length
                      )
                        return acc;

                      try {
                        const validScreenings =
                          movie?.screenings &&
                          Object.values(movie.screenings).every(
                            (theaters) =>
                              Array.isArray(theaters) &&
                              theaters.every(
                                (theater) =>
                                  theater &&
                                  theater.seances &&
                                  typeof theater.seances === "object",
                              ),
                          )
                            ? movie.screenings
                            : null;

                        if (!validScreenings) return acc;

                        const screenings = filterByDay(validScreenings, 7);
                        if (!screenings || !size(screenings)) return acc;

                        Object.entries(screenings).forEach(([date, times]) => {
                          if (!acc[date]) acc[date] = [];

                          if (Array.isArray(times)) {
                            const theaterScreenings: TheaterScreenings[] = times
                              .filter((theater) => theater && theater.seances) // Filter out invalid theaters
                              .map((theater) => ({
                                name: theater.name || "",
                                neighborhood: theater.neighborhood || "",
                                zipcode: theater.zipcode || "",
                                preposition_and_name:
                                  theater.preposition_and_name || "",
                                seances: theater.seances || {}, // Provide empty object as fallback
                              }));

                            if (theaterScreenings.length > 0) {
                              // Only add if we have valid screenings
                              acc[date].push({
                                ...movie,
                                theaters: theaterScreenings,
                              });
                            }
                          }
                        });
                        return acc;
                      } catch (error) {
                        console.error("Error processing screenings:", error);
                        return acc;
                      }
                    },
                    {} as Record<
                      string,
                      Array<MovieDetail & { theaters: TheaterScreenings[] }>
                    >,
                  ),
                )
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([date, moviesForDay]) => (
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
                          theaterAlign="text-left"
                          title={movie.title}
                        />
                      ))}
                    </div>
                  ))}
              </div>
            </>
          ) as ReactNode
        }
      />
    </>
  );
}
