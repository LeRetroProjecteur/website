import { capitalize, size, sortBy, toPairs } from "lodash-es";
import Image from "next/image";
import { useMemo } from "react";

import { isAfter, isEqual } from "date-fns";

import PageHeader from "@/components/layout/page-header";
import {
  BodyCopy,
  MetaCopy,
  SousTitre1,
  SousTitre2,
} from "@/components/typography/typography";
import { MovieDetail, Review, ShowtimesTheater } from "@/lib/types";
import {
  TAG_MAP,
  blurProps,
  floatHourToString,
  formatMerJJMM,
  getImageUrl,
  getMovieTags,
  getStartOfDayInParis,
  getStartOfTodayInParis,
  safeDate,
  splitIntoSubArrays,
} from "@/lib/util";

export default function Archives({
  movie,
}: {
  movie: MovieDetail;
  reviewedMovies: Review[];
}) {
  const isCoupDeCoeur = useMemo(() => movie.review_date != null, [movie]);

  return (
    <>
      <PageHeader text={isCoupDeCoeur ? "coup de coeur" : "archives"}>
        <MovieHeader movie={movie} />
      </PageHeader>
      <div className="flex grow flex-col pb-15px lg:pb-0 lg:pl-20px">
        <Movie movie={movie} />
        <div className="w-1/2 border-r lg:h-300px" />
      </div>
    </>
  );
}

function Movie({ movie }: { movie: MovieDetail }) {
  return (
    <div className="flex grow flex-col gap-8 lg:flex-row lg:gap-0">
      <MovieInfo movie={movie} />
      <MovieScreenings movie={movie} />
    </div>
  );
}

function MovieHeader({ movie }: { movie: MovieDetail }) {
  return (
    <div className="flex grow justify-between gap-190px">
      <div className="grow">
        <SousTitre1>
          <u className="underline">{movie.title}</u> ({movie.directors}),{" "}
          {movie.year}
        </SousTitre1>
      </div>
    </div>
  );
}

function MovieInfo({ movie }: { movie: MovieDetail }) {
  return (
    <div className="flex grow flex-col lg:w-1/2 lg:border-r lg:pr-20px">
      {movie.review && (
        <div className="flex flex-col pt-15px lg:pb-20px lg:pt-0">
          <div className="flex">
            <div className="flex grow basis-0 pb-15px lg:pb-20px">
              <Image
                width={1200}
                height={675}
                className="h-auto w-full"
                src={getImageUrl(movie)}
                alt="movie-screenshot"
                {...blurProps}
              />
            </div>
          </div>
          <BodyCopy>
            <div
              className="lg:leading-21px"
              dangerouslySetInnerHTML={{ __html: movie.review }}
            ></div>
          </BodyCopy>
        </div>
      )}

      <div className="flex pt-15px lg:pt-0">
        <MetaCopy>
          <text>Titre original&nbsp;: {movie.original_title}</text>
          {movie.duration == null ? (
            "Durée inconnue"
          ) : (
            <text>
              <br />
              Durée&nbsp;: {Math.floor(parseInt(movie.duration) / 60)} minutes
            </text>
          )}
          {movie.language == null ? (
            ""
          ) : (
            <text>
              <br />
              Langue&nbsp;: {movie.language}
            </text>
          )}
          {movie.screenwriters == null ? (
            ""
          ) : (
            <text>
              <br />
              Scénario&nbsp;: {movie.screenwriters}
            </text>
          )}
          {movie.countries == null ? (
            ""
          ) : (
            <text>
              <br />
              Pays&nbsp;: {movie.countries}
            </text>
          )}
          {movie.distributor == null ? (
            ""
          ) : (
            <text>
              <br />
              Distribué par {movie.distributor}
            </text>
          )}
        </MetaCopy>
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
    <div className="flex flex-col pt-27px lg:w-1/2 lg:pl-20px lg:pt-0">
      <div className="flex justify-center border-y bg-retro-green py-13px text-center lg:px-20px lg:py-16px">
        <SousTitre2>prochaines séances à paris</SousTitre2>
      </div>
      <div className="flex flex-col">
        {size(screenings) > 0 ? (
          <Screenings screenings={screenings} />
        ) : (
          <div className="border-b py-12px text-center lg:grow lg:py-16px">
            <BodyCopy>Pas de séances prévues pour le moment</BodyCopy>
          </div>
        )}
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
    <div className="grid-auto-rows grid grid-cols-[auto_1fr] gap-x-10px">
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
    <div className="col-span-full grid grid-cols-[subgrid] border-b py-12px lg:py-16px lg:hover:bg-retro-pale-green">
      <BodyCopy>{capitalize(formatMerJJMM(safeDate(date)))}</BodyCopy>
      <div className="flex flex-col">
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
        <BodyCopy>
          {showtimesTheater.clean_name} ({showtimesTheater.zipcode_clean})
        </BodyCopy>
      </div>
      <div className="flex shrink-0 flex-col lg:pl-8px">
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
          <BodyCopy>{floatHourToString(showtime)}</BodyCopy>
          <div className="hidden group-last:hidden lg:block">
            <BodyCopy>&nbsp;•&nbsp;</BodyCopy>
          </div>
        </div>
      ))}
    </div>
  );
}

function Tags({ movie }: { movie: MovieDetail }) {
  const tags = useMemo(() => getMovieTags(movie), [movie]);

  return (
    tags.length > 0 && (
      <div className="flex hidden flex-wrap gap-8px pt-15px lg:gap-10px lg:pt-20px">
        {tags.map((tag) => (
          <div
            key={tag}
            className="rounded-2xl bg-retro-gray px-15px py-6px text-19px font-medium uppercase leading-20px text-white lg:px-12px lg:text-20px lg:tracking-[-0.02em]"
          >
            {TAG_MAP[tag]}
          </div>
        ))}
      </div>
    )
  );
}
