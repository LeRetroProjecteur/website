"use client";

import { orderBy } from "lodash-es";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import FixedHeader from "@/components/layout/fixed-header";
import PageHeader from "@/components/layout/page-header";
import {
  BodyCopy,
  MetaCopy,
  SousTitre1,
} from "@/components/typography/typography";
import { Review } from "@/lib/types";
import {
  formatDDMMYYWithSlashes,
  getImageUrl,
  getReviewSortKey,
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
    () => orderBy(fetchedReviews, getReviewSortKey, "desc"),
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
    <div className="flex grow flex-col">
      <FixedHeader className="flex flex-col pb-20px">
        <div className="lg:pb-20px">
          <PageHeader text="coups de coeur" />
        </div>
        <SubHeader display={display} toggleDisplay={toggleDisplay} />
      </FixedHeader>
      <div className="flex flex-col pl-20px">
        <div className="flex pb-20px">
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
    <div className="flex items-center justify-between border-b lg:border-t lg:bg-retro-green lg:py-14px lg:pl-20px lg:pr-10px">
      <SousTitre1>archive des critiques</SousTitre1>
      <div className="flex cursor-pointer items-center" onClick={toggleDisplay}>
        {display === "thumbnails" ? <ListIcon /> : <ThumbnailIcon />}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex">
      <MetaCopy>
        désolé, nous n&apos;avons rien trouvé qui corresponde à votre recherche
        !
      </MetaCopy>
    </div>
  );
}

function ReviewThumbnails({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex grow flex-wrap lg:gap-x-20px lg:gap-y-16px">
      {reviews.map((review) => (
        <ReviewThumbnail review={review} key={review.id} />
      ))}
      {[...Array(reviews.length % 3)].map((_, i) => (
        <div className="min-w-340px grow basis-0" key={i} />
      ))}
    </div>
  );
}

function ReviewThumbnail({ review }: { review: Review }) {
  return (
    <div className="min-w-340px grow basis-0">
      <Link href={`/archives/${review.id}`}>
        <div className="flex flex-col gap-12px">
          <Image
            className="h-auto w-full"
            width={1200}
            height={675}
            src={getImageUrl(review)}
            alt={review.title}
          />
          <div className="flex justify-between gap-20px">
            <div>
              <MetaCopy>
                <u className="underline">{review.title}</u> ({review.year}),{" "}
                {review.directors}
              </MetaCopy>
            </div>
            <div>
              <MetaCopy>
                {formatDDMMYYWithSlashes(safeDate(review.review_date))}
              </MetaCopy>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex grow flex-col">
      {reviews.map((review) => (
        <ReviewRow review={review} key={review.id} />
      ))}
      <div className="flex h-640px">
        <div className="w-1/2 border-r pr-10px"></div>
      </div>
    </div>
  );
}

function ReviewRow({ review }: { review: Review }) {
  return (
    <Link href={`/archives/${review.id}`} className="group">
      <div key={review.id} className="flex">
        <div className="flex border-r pr-10px">
          <div className="border-b py-16px text-center group-first:border-t group-odd:bg-retro-green lg:w-[5.9375rem] lg:group-odd:bg-white lg:group-hover:bg-retro-pale-green">
            <BodyCopy>
              {formatDDMMYYWithSlashes(safeDate(review.review_date))}
            </BodyCopy>
          </div>
        </div>
        <div className="flex grow pl-10px">
          <div className="grow border-b py-16px pl-10px group-first:border-t group-odd:bg-retro-green lg:group-odd:bg-white lg:group-hover:bg-retro-pale-green">
            <BodyCopy className="uppercase">
              <u className="underline">{review.title}</u> ({review.year}),{" "}
              {review.directors}
            </BodyCopy>
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
