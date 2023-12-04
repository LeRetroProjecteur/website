"use client";

import { size, sortBy, toPairs } from "lodash-es";
import Image from "next/image";
import { useMemo } from "react";

import { isAfter, isEqual } from "date-fns";

import PageHeader from "@/components/layout/page-header";
import { MovieDetail, ShowtimesTheater } from "@/lib/types";
import {
  TAG_MAP,
  checkNotNull,
  floatHourToString,
  formatDDMMYYWithSlashes,
  getImageUrl,
  getMovieTags,
  getStartOfDayInParis,
  getStartOfTodayInParis,
  safeDate,
  splitIntoSubArrays,
} from "@/lib/util";

export default function Archives({ movie }: { movie: MovieDetail }) {
  return (
    <div className="mb-8 flex grow flex-col">
      <div className="flex pb-4">
        <PageHeader text="archives" />
      </div>
      {movie != null && <Movie movie={movie} />}
    </div>
  );
}

function Movie({ movie }: { movie: MovieDetail }) {
  return (
    <div className="flex flex-col">
      <div className="lg:pb-5">
        <MovieHeader movie={movie} />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
        <MovieInfo movie={movie} />
        <MovieScreenings movie={movie} />
      </div>
    </div>
  );
}

function MovieHeader({ movie }: { movie: MovieDetail }) {
  return (
    <div className="flex  justify-between gap-32 border-b pb-4 text-center text-xl/6 font-semibold uppercase text-retro-gray lg:border-t lg:bg-retro-green lg:py-3 lg:pl-5 lg:text-left lg:text-3xl/8 lg:font-medium">
      <div className="grow">
        <u className="underline">{movie.title}</u> ({movie.year}),{" "}
        {movie.directors}
      </div>
      <div className="hidden w-max whitespace-nowrap pr-2 lg:block">
        Critique du{" "}
        {formatDDMMYYWithSlashes(safeDate(checkNotNull(movie.review_date)))}
      </div>
    </div>
  );
}

function MovieInfo({ movie }: { movie: MovieDetail }) {
  return (
    <div className="flex flex-col lg:w-1/2 lg:border-r lg:pb-40 lg:pr-5">
      {movie.review && (
        <div className="flex flex-col lg:pb-8">
          <div className="flex pb-4 lg:pl-5">
            <div className="flex grow basis-0">
              <Image
                width={1200}
                height={675}
                className="h-auto w-full"
                src={getImageUrl(movie)}
                alt="movie-screenshot"
              />
            </div>
          </div>
          <div
            className="font-medium leading-6 lg:pl-5"
            dangerouslySetInnerHTML={{ __html: movie.review }}
          ></div>
        </div>
      )}
      <div className="flex pt-8 text-xl/6 font-medium uppercase text-retro-gray lg:pl-5 lg:pt-0">
        titre original : {movie.original_title}
        <br />
        {movie.duration == null
          ? "Durée inconnue"
          : `Durée : ${Math.floor(parseInt(movie.duration) / 60)} minutes`}
      </div>
      <Tags movie={movie} />
    </div>
  );
}

function MovieScreenings({ movie }: { movie: MovieDetail }) {
  const screenings = useMemo(
    () =>
      toPairs(movie?.screenings ?? []).filter(
        ([date]) =>
          isAfter(getStartOfDayInParis(date), getStartOfTodayInParis()) ||
          isEqual(getStartOfDayInParis(date), getStartOfTodayInParis()),
      ),
    [movie],
  );

  return (
    <div className="flex flex-col lg:w-1/2 lg:pl-5">
      <div className="flex justify-center border-y bg-retro-green px-4 py-1 text-center text-xl/10 font-semibold uppercase text-retro-gray lg:py-3 lg:text-2xl/6">
        prochaines séances à paris
      </div>
      <div className="flex flex-col">
        {size(screenings) > 0 ? (
          <Screenings screenings={screenings} />
        ) : (
          <div className="border-b  py-4 text-center font-medium leading-3 lg:grow">
            Pas de séances prévues pour le moment
          </div>
        )}
        <div className="mt-4 h-40 w-1/2 self-start border-r  lg:hidden" />
      </div>
    </div>
  );
}

function Screenings({
  screenings,
}: {
  screenings: [string, ShowtimesTheater[]][];
}) {
  const sortedByDateAndTheater = useMemo(
    () =>
      sortBy(screenings).map<[string, ShowtimesTheater[]]>(
        ([date, theaters]) => [
          date,
          sortBy(theaters, (theater) => theater.clean_name),
        ],
      ),
    [screenings],
  );

  return (
    <div className="flex flex-col">
      {sortedByDateAndTheater.map(([date, theaters]) => (
        <DateScreenings key={date} date={date} theaters={theaters} />
      ))}
    </div>
  );
}

function DateScreenings({
  date,
  theaters,
}: {
  date: string;
  theaters: ShowtimesTheater[];
}) {
  return (
    <div className="flex border-b py-4 font-medium leading-4">
      <div className="w-32 shrink-0 lg:w-24">
        {formatDDMMYYWithSlashes(safeDate(date))}
      </div>
      <div className="flex grow flex-col gap-2">
        {theaters.map((theater) => (
          <TheaterScreenings
            key={theater.clean_name}
            showtimesTheater={theater}
          />
        ))}
      </div>
    </div>
  );
}

function TheaterScreenings({
  showtimesTheater,
}: {
  showtimesTheater: ShowtimesTheater;
}) {
  return (
    <div className="flex">
      <div className="grow">
        {showtimesTheater.clean_name} ({showtimesTheater.zipcode_clean})
      </div>
      <div className="flex shrink-0 flex-col pl-3">
        {splitIntoSubArrays(showtimesTheater.showtimes, 3).map(
          (showtimes, i) => (
            <ThreeScreenings showtimes={showtimes} key={i} />
          ),
        )}
      </div>
    </div>
  );
}

function ThreeScreenings({ showtimes }: { showtimes: number[] }) {
  return (
    <div className="flex flex-col justify-end lg:flex-row">
      {showtimes.map((showtime) => (
        <div key={showtime} className="group flex justify-end">
          {floatHourToString(showtime)}
          <div className="hidden group-last:hidden lg:block">&nbsp;•&nbsp;</div>
        </div>
      ))}
    </div>
  );
}

function Tags({ movie }: { movie: MovieDetail }) {
  const tags = useMemo(() => getMovieTags(movie), [movie]);

  return (
    tags.length > 0 && (
      <div className="flex flex-wrap gap-x-2 gap-y-2 pt-4 lg:pl-5">
        {tags.map((tag) => (
          <div
            key={tag}
            className="rounded-2xl bg-retro-gray p-2 text-lg/4 font-medium uppercase text-white"
          >
            {TAG_MAP[tag]}
          </div>
        ))}
      </div>
    )
  );
}
