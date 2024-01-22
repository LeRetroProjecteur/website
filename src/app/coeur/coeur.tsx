"use client";

import { orderBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { use, useCallback, useMemo, useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import {
  BodyCopy,
  CoeurCopy,
  SousTitre1,
} from "@/components/typography/typography";
import { Review } from "@/lib/types";
import {
  blurProps,
  formatDDMMYYWithSlashes,
  getImageUrl,
  getReviewSortKey,
  isCoupDeCoeur,
  movie_info_containsFilteringTerm,
  safeDate,
} from "@/lib/util";

export default function CoupsDeCoeur({
  fetchedReviews,
}: {
  fetchedReviews: Promise<Review[]>;
}) {
  const [filter, setFilter] = useState("");

  const [display, setDisplay] = useState<"thumbnails" | "list">("thumbnails");
  const toggleDisplay = useCallback(() => {
    setDisplay(display === "thumbnails" ? "list" : "thumbnails");
  }, [display]);

  return (
    <>
      <PageHeader text="coups de coeur">
        <SubHeader display={display} toggleDisplay={toggleDisplay} />
      </PageHeader>
      <div className="flex grow flex-col pb-10px lg:pb-0 lg:pl-20px">
        <div className="flex pb-15px pt-15px lg:pb-20px lg:pt-0 ">
          <RetroInput
            placeholder="recherche"
            value={filter}
            setValue={setFilter}
          />
        </div>
        <SuspenseWithLoading>
          <Reviews {...{ fetchedReviews, display, filter }} />
        </SuspenseWithLoading>
      </div>
    </>
  );
}

function SubHeader({
  display,
  toggleDisplay,
}: {
  display: "thumbnails" | "list";
  toggleDisplay: () => void;
}) {
  return (
    <div className="flex grow justify-between">
      <SousTitre1>archive des critiques</SousTitre1>
      <div className="flex cursor-pointer items-center" onClick={toggleDisplay}>
        {display === "thumbnails" ? <ListIcon /> : <ThumbnailIcon />}
      </div>
    </div>
  );
}

function Reviews({
  fetchedReviews: fetchedReviewsPromise,
  filter,
  display,
}: {
  fetchedReviews: Promise<Review[]>;
  filter: string;
  display: "thumbnails" | "list";
}) {
  const fetchedReviews = use(fetchedReviewsPromise);

  const reviews = useMemo(
    () =>
      orderBy(fetchedReviews.filter(isCoupDeCoeur), getReviewSortKey, "desc"),
    [fetchedReviews],
  );

  const filteredReviews = useMemo(
    () =>
      filter === ""
        ? reviews
        : reviews.filter((review) =>
            movie_info_containsFilteringTerm(review, filter),
          ),
    [filter, reviews],
  );

  return (
    <>
      {filteredReviews.length === 0 && <EmptyState />}
      {filteredReviews.length > 0 && display === "list" && (
        <ReviewList reviews={filteredReviews} />
      )}
      {filteredReviews.length > 0 && display === "thumbnails" && (
        <ReviewThumbnails reviews={filteredReviews} />
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex">
      <CoeurCopy>
        désolé, nous n&apos;avons rien trouvé qui corresponde à votre recherche
        !
      </CoeurCopy>
    </div>
  );
}

function ReviewThumbnails({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid grid-cols-thumbnails-sm gap-x-15px gap-y-10px lg:grid-cols-thumbnails-lg lg:gap-x-20px lg:gap-y-16px">
      {reviews.map((review) => (
        <ReviewThumbnail review={review} key={review.id} />
      ))}
    </div>
  );
}

function ReviewThumbnail({ review }: { review: Review }) {
  return (
    <Link href={`/archives/${review.id}`}>
      <div className="flex flex-col gap-10px lg:gap-12px">
        <Image
          className="h-auto w-full"
          width={1200}
          height={675}
          src={getImageUrl(review)}
          alt={review.title}
          {...blurProps}
        />
        <div className="flex flex-col justify-between gap-0 lg:flex-row lg:gap-20px">
          <div>
            <CoeurCopy>
              <u className="underline">{review.title}</u> ({review.year}),{" "}
              {review.directors}
            </CoeurCopy>
          </div>
          <div>
            <CoeurCopy>
              {formatDDMMYYWithSlashes(safeDate(review.review_date))}
            </CoeurCopy>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      {reviews.map((review) => (
        <ReviewRow review={review} key={review.id} />
      ))}
      <div className="h-300px border-r" />
    </div>
  );
}

function ReviewRow({ review }: { review: Review }) {
  return (
    <Link
      href={`/archives/${review.id}`}
      className="group col-span-full grid grid-cols-[subgrid]"
    >
      <div className="flex border-b border-r group-first:border-t">
        <div className="px-6px py-10px group-odd:bg-retro-green lg:py-16px lg:pl-10px lg:group-odd:bg-white lg:group-hover:bg-retro-pale-green">
          <BodyCopy>
            {formatDDMMYYWithSlashes(safeDate(review.review_date))}
          </BodyCopy>
        </div>
      </div>
      <div className="flex grow border-b group-first:border-t">
        <div className="grow px-6px py-10px group-odd:bg-retro-green lg:py-16px lg:pl-10px lg:pr-0 lg:group-odd:bg-white lg:group-hover:bg-retro-pale-green">
          <BodyCopy className="uppercase">
            <u className="underline">{review.title}</u> ({review.year}),{" "}
            {review.directors}
          </BodyCopy>
        </div>
      </div>
    </Link>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 34 25"
      className="h-22px w-29px stroke-retro-gray lg:h-25px lg:w-34px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="8" y1="1" x2="34" y2="1" strokeWidth="2" />
      <line x1="8" y1="9" x2="34" y2="9" strokeWidth="2" />
      <line x1="8" y1="16" x2="34" y2="16" strokeWidth="2" />
      <line x1="8" y1="24" x2="34" y2="24" strokeWidth="2" />
      <line y1="1" x2="4" y2="1" strokeWidth="2" />
      <line y1="9" x2="4" y2="9" strokeWidth="2" />
      <line y1="16" x2="4" y2="16" strokeWidth="2" />
      <line y1="24" x2="4" y2="24" strokeWidth="2" />
    </svg>
  );
}

function ThumbnailIcon() {
  return (
    <svg
      className="h-22px w-22px stroke-retro-gray lg:h-25px lg:w-25px"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="13.1667" height="13.1667" strokeWidth="2" />
      <rect x="20.833" y="1" width="13.1667" height="13.1667" strokeWidth="2" />
      <rect
        x="1"
        y="20.8335"
        width="13.1667"
        height="13.1667"
        strokeWidth="2"
      />
      <rect
        x="20.833"
        y="20.8335"
        width="13.1667"
        height="13.1667"
        strokeWidth="2"
      />
    </svg>
  );
}
