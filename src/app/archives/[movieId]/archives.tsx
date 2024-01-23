import { capitalize, maxBy, minBy, size, sortBy, toPairs } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { isAfter, isEqual, isSameDay } from "date-fns";

import { LeftArrow, RightArrow } from "@/components/icons/arrows";
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
  checkNotNull,
  floatHourToString,
  formatDDMMYYWithSlashes,
  formatMerJJMM,
  getImageUrl,
  getMovieTags,
  getReviewSortKey,
  getStartOfDayInParis,
  getStartOfTodayInParis,
  safeDate,
  splitIntoSubArrays,
} from "@/lib/util";

export default function Archives({
  movie,
  reviewedMovies,
}: {
  movie: MovieDetail;
  reviewedMovies: Review[];
}) {
  const isCoupDeCoeur = useMemo(() => movie.review_date != null, [movie]);

  const previousReview = useMemo(
    () =>
      movie.review_date != null
        ? maxBy(
            reviewedMovies.filter(
              (review) =>
                safeDate(review.review_date) <
                  safeDate(checkNotNull(movie.review_date)) ||
                (isSameDay(
                  safeDate(review.review_date),
                  safeDate(checkNotNull(movie.review_date)),
                ) &&
                  review.id < movie.id),
            ),
            getReviewSortKey,
          )
        : undefined,
    [movie, reviewedMovies],
  );
  const nextReview = useMemo(
    () =>
      movie.review_date != null
        ? minBy(
            reviewedMovies.filter(
              (review) =>
                safeDate(review.review_date) >
                  safeDate(checkNotNull(movie.review_date)) ||
                (isSameDay(
                  safeDate(review.review_date),
                  safeDate(checkNotNull(movie.review_date)),
                ) &&
                  review.id > movie.id),
            ),
            getReviewSortKey,
          )
        : undefined,
    [movie, reviewedMovies],
  );

  return (
    <>
      <PageHeader text={isCoupDeCoeur ? "coup de coeur" : "archives"}>
        <MovieHeader movie={movie} />
      </PageHeader>
      <div className="flex grow flex-col pb-15px lg:pb-0 lg:pl-20px">
        <Movie movie={movie} />
        <div className="w-1/2 border-r lg:h-300px" />
        {isCoupDeCoeur && (
          <ReviewsNav previousReview={previousReview} nextReview={nextReview} />
        )}
      </div>
    </>
  );
}

function ReviewsNav({
  previousReview,
  nextReview,
}: {
  previousReview?: Review;
  nextReview?: Review;
}) {
  return (
    <div className="flex flex-col">
      <div className="h-44px w-1/2 lg:border-r" />
      <div className="flex justify-between pb-14px">
        {previousReview ? (
          <Link
            href={`/archives/${previousReview.id}`}
            className="flex w-1/2 items-center lg:border-r"
          >
            <LeftArrow small />
            <div className="pl-5px text-20px font-medium uppercase leading-25px tracking-[-0.02em] text-retro-gray lg:hidden">
              précédent
            </div>
            <div className="hidden pl-5px text-20px font-medium uppercase leading-25px tracking-[-0.02em] text-retro-gray lg:block">
              critique précédente
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextReview ? (
          <Link
            href={`/archives/${nextReview.id}`}
            className="flex w-1/2 items-center justify-end"
          >
            <div className="pr-5px text-20px font-medium uppercase leading-25px tracking-[-0.02em] text-retro-gray lg:hidden">
              suivant
            </div>
            <div className="hidden pr-5px text-20px font-medium uppercase leading-25px tracking-[-0.02em] text-retro-gray lg:block">
              critique suivante
            </div>
            <RightArrow small />
          </Link>
        ) : (
          <div />
        )}
      </div>
      <Link href="/coeur">
        <div className="border bg-retro-pale-green py-8px text-center text-20px font-medium uppercase leading-25px text-retro-gray">
          retour aux coups de coeur
        </div>
      </Link>
    </div>
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
      {movie.review_date && (
        <div className="hidden w-max whitespace-nowrap lg:block lg:pr-10px">
          <SousTitre1>
            Critique du {formatDDMMYYWithSlashes(safeDate(movie.review_date))}
          </SousTitre1>
        </div>
      )}
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
          titre original : {movie.original_title}
          <br />
          {movie.duration == null
            ? "Durée inconnue"
            : `Durée : ${Math.floor(parseInt(movie.duration) / 60)} minutes`}
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
    <div className="grid-auto-rows grid grid-cols-[auto_1fr] gap-x-50px">
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
