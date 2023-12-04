"use client";

import { sortBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import PageHeader from "@/components/layout/page-header";
import { Review } from "@/lib/types";
import {
  formatDDMMYYWithSlashes,
  getImageUrl,
  movie_info_containsFilteringTerm,
  safeDate,
} from "@/lib/util";

export default function CoupsDeCoeur({
  fetchedReviews,
}: {
  fetchedReviews: Review[];
}) {
  const [filter, setFilter] = useState("");

  const reviews = useMemo(
    () =>
      sortBy(
        fetchedReviews,
        (review) => -safeDate(review.review_date).valueOf(),
      ),
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

  const [display, setDisplay] = useState<"thumbnails" | "list">("thumbnails");
  const toggleDisplay = useCallback(() => {
    setDisplay(display === "thumbnails" ? "list" : "thumbnails");
  }, [display]);

  return (
    <div className="flex grow flex-col pb-4">
      <div className="pb-2 lg:pb-4">
        <PageHeader text="coups de coeur" />
      </div>
      <div className="flex flex-col gap-4 lg:gap-5">
        <SubHeader display={display} toggleDisplay={toggleDisplay} />
        <div className="flex lg:pl-5">
          <RetroInput
            placeholder="recherche"
            value={filter}
            setValue={setFilter}
          />
        </div>
        {filteredReviews.length === 0 && <EmptyState />}
        {filteredReviews.length > 0 && display === "list" && (
          <ReviewList reviews={filteredReviews} />
        )}
        {filteredReviews.length > 0 && display === "thumbnails" && (
          <ReviewThumbnails reviews={filteredReviews} />
        )}
      </div>
    </div>
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
    <div className="flex items-center justify-between border-b  pb-2 lg:border-t lg:bg-retro-green lg:px-5 lg:py-4 lg:pr-3">
      <div className="text-xl/6 font-semibold uppercase text-retro-gray lg:text-3xl/6">
        archive des critiques
      </div>
      <div className="flex cursor-pointer items-center" onClick={toggleDisplay}>
        {display === "thumbnails" ? <ListIcon /> : <ThumbnailIcon />}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex text-lg/5 font-medium uppercase text-retro-gray lg:pl-5 lg:text-xl/5">
      désolé, nous n&apos;avons rien trouvé qui corresponde à votre recherche !
    </div>
  );
}

function ReviewThumbnails({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex grow flex-wrap gap-x-4 gap-y-2 lg:gap-x-5 lg:gap-y-3 lg:pl-5">
      {reviews.map((review) => (
        <ReviewThumbnail review={review} key={review.id} />
      ))}
      {[...Array(reviews.length % 3)].map((_, i) => (
        <div className="min-w-[340px] grow basis-0" key={i} />
      ))}
    </div>
  );
}

function ReviewThumbnail({ review }: { review: Review }) {
  return (
    <div className="min-w-[340px] grow basis-0">
      <Link href={`/archives/${review.id}`}>
        <div className="flex flex-col gap-3">
          <Image
            className="h-auto w-full"
            width={1200}
            height={675}
            src={getImageUrl(review)}
            alt={review.title}
          />
          <div className="flex justify-between gap-3 text-sm/4 font-medium uppercase text-retro-gray lg:text-lg/5">
            <div>
              <u className="underline">{review.title}</u> ({review.year}),{" "}
              {review.directors}
            </div>
            <div>{formatDDMMYYWithSlashes(safeDate(review.review_date))}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex grow flex-col lg:pl-5">
      {reviews.map((review) => (
        <ReviewRow review={review} key={review.id} />
      ))}
      <div className="flex h-40">
        <div className="w-1/2 border-r  pr-2"></div>
      </div>
    </div>
  );
}

function ReviewRow({ review }: { review: Review }) {
  return (
    <Link href={`/archives/${review.id}`} className="group">
      <div key={review.id} className="flex">
        <div className="flex border-r  pr-2 lg:pr-5">
          <div className="w-[80px] grow gap-1 border-b  px-1 py-2 font-medium text-retro-black group-first:border-t group-odd:bg-retro-green lg:w-[88px] lg:px-3 lg:py-4 lg:text-lg/6 lg:group-odd:bg-white">
            {formatDDMMYYWithSlashes(safeDate(review.review_date))}
          </div>
        </div>
        <div className="flex grow  pl-2 lg:pl-5">
          <div className="grow border-b  px-1 py-2 font-medium uppercase text-retro-black group-first:border-t group-odd:bg-retro-green lg:px-3 lg:py-4 lg:text-lg/6 lg:group-odd:bg-white">
            <u className="underline">{review.title}</u> ({review.year}),{" "}
            {review.directors}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ListIcon() {
  return (
    <svg
      viewBox="0 0 34 25"
      className="h-[22px] w-[29px] stroke-retro-gray lg:h-[25px] lg:w-[34px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="8" y1="1" x2="34" y2="1" stroke-width="2" />
      <line x1="8" y1="9" x2="34" y2="9" stroke-width="2" />
      <line x1="8" y1="16" x2="34" y2="16" stroke-width="2" />
      <line x1="8" y1="24" x2="34" y2="24" stroke-width="2" />
      <line y1="1" x2="4" y2="1" stroke-width="2" />
      <line y1="9" x2="4" y2="9" stroke-width="2" />
      <line y1="16" x2="4" y2="16" stroke-width="2" />
      <line y1="24" x2="4" y2="24" stroke-width="2" />
    </svg>
  );
}

function ThumbnailIcon() {
  return (
    <svg
      className="h-[22px] w-[22px] stroke-retro-gray lg:h-[25px] lg:w-[25px]"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="13.1667" height="13.1667" stroke-width="2" />
      <rect
        x="20.833"
        y="1"
        width="13.1667"
        height="13.1667"
        stroke-width="2"
      />
      <rect
        x="1"
        y="20.8335"
        width="13.1667"
        height="13.1667"
        stroke-width="2"
      />
      <rect
        x="20.833"
        y="20.8335"
        width="13.1667"
        height="13.1667"
        stroke-width="2"
      />
    </svg>
  );
}
