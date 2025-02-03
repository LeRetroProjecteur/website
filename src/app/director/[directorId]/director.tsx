"use client";

import { size } from "lodash-es";
import Link from "next/link";
import { ReactNode } from "react";

import { TwoColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import MultiDaySeances from "@/components/seances/multiday-seances";
import { SectionTitle } from "@/components/typography/typography";
import { MovieDetail, Screening } from "@/lib/types";
import { filterDates } from "@/lib/util";

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
  const sortedMovies = [...movies].sort((a, b) => a.year - b.year);

  return (
    <>
      <PageHeader text={directorName} />
      <TwoColumnPage
        narrow
        left={
          (
            <div className="flex flex-col">
              <h2 className="mb-4 bg-retro-pale-green p-2 text-24px uppercase">
                Filmographie
              </h2>
              <div>
                {sortedMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/film/${movie.id}`}
                    className="block border-b py-12px lg:py-16px lg:hover:bg-retro-pale-green"
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
                        const screenings = filterDates(movie.screenings);
                        if (!screenings || !size(screenings)) return acc;

                        Object.entries(screenings).forEach(([date, times]) => {
                          if (!acc[date]) acc[date] = [];
                          acc[date].push({ ...movie, times });
                        });
                        return acc;
                      } catch (error) {
                        return acc;
                      }
                    },
                    {} as Record<
                      string,
                      Array<MovieDetail & { times: Screening[] }>
                    >,
                  ),
                )
                  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                  .map(([date, moviesForDay]) => (
                    <div key={date}>
                      <h2 className="my-4 bg-retro-pale-green p-2 text-20px font-bold uppercase">
                        {formatDate(date)}
                      </h2>
                      <div className="space-y-2">
                        {moviesForDay.map((movie) => (
                          <div
                            key={`${date}-${movie.id}`}
                            className="flex items-center justify-between border-b py-2"
                          >
                            <div className="uppercase italic">
                              {movie.title}
                            </div>
                            <MultiDaySeances
                              screenings={{ [date]: movie.times }}
                              groupClassName="flex items-center gap-4"
                              hideDate={true}
                            />
                          </div>
                        ))}
                      </div>
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
