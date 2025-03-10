"use client";

import { orderBy } from "lodash-es";
import Link from "next/link";
import { use, useCallback, useMemo, useState } from "react";

import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import {
  ThumbnailGrid,
  ThumbnailWithBlurb,
} from "@/components/layout/thumbnails";
import {
  BodyCopy,
  CoeurWithSpacing,
  MetaCopy,
  SousTitre1,
} from "@/components/typography/typography";
import { Review } from "@/lib/types";
import {
  formatDDMMYYWithSlashes,
  formatYYYYMMDD,
  getImageUrl,
  isCoupDeCoeur,
  safeDate,
} from "@/lib/utils";

import { clearCoeurCache } from "../actions/cache";

export default function CoupsDeCoeur({
  fetchedReviews,
  displayPreference,
}: {
  fetchedReviews: Promise<Review[]>;
  displayPreference: "thumbnails" | "list";
}) {
  const [display, setDisplay] = useState<"thumbnails" | "list">(
    displayPreference,
  );
  const toggleDisplay = useCallback(async () => {
    const pref = display === "thumbnails" ? "list" : "thumbnails";
    setDisplay(pref);
    document.cookie = `cdc-display=${pref};max-age=31536000`;
    clearCoeurCache();
  }, [display]);

  return (
    <>
      <PageHeader
        text={
          <>
            coups de <CoeurWithSpacing />
          </>
        }
      >
        <SubHeader display={display} toggleDisplay={toggleDisplay} />
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <SuspenseWithLoading className="flex grow items-center justify-center">
          <Reviews {...{ fetchedReviews, display }} />
        </SuspenseWithLoading>
      </div>{" "}
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
      <SousTitre1>Archive de nos critiques</SousTitre1>
      <div
        className="flex cursor-pointer items-center pl-6px"
        onClick={toggleDisplay}
      >
        {display === "thumbnails" ? <ListIcon /> : <ThumbnailIcon />}
      </div>
    </div>
  );
}

function Reviews({
  fetchedReviews: fetchedReviewsPromise,
  display,
}: {
  fetchedReviews: Promise<Review[]>;
  display: "thumbnails" | "list";
}) {
  const fetchedReviews = use(fetchedReviewsPromise);

  const reviews = useMemo(
    () =>
      orderBy(fetchedReviews.filter(isCoupDeCoeur), getReviewSortKey, "desc"),
    [fetchedReviews],
  );

  return (
    <>
      {reviews.length === 0 && <EmptyState />}
      {reviews.length > 0 && display === "list" && (
        <ReviewList reviews={reviews} />
      )}
      {reviews.length > 0 && display === "thumbnails" && (
        <ReviewThumbnails reviews={reviews} />
      )}
    </>
  );
}

function EmptyState() {
  return (
    <MetaCopy>
      Désolé, nous n&apos;avons rien trouvé qui corresponde à votre
      recherche&nbsp;!
    </MetaCopy>
  );
}

function ReviewThumbnails({ reviews }: { reviews: Review[] }) {
  return (
    <ThumbnailGrid>
      {reviews.map((review) => (
        <ThumbnailWithBlurb
          key={review.id}
          link={`/film/${review.id}`}
          image={{
            src: getImageUrl(review),
            alt: review.title,
            width: 1200,
            height: 675,
          }}
        >
          <u>{review.title}</u>, {review.directors} ({review.year})
        </ThumbnailWithBlurb>
      ))}
    </ThumbnailGrid>
  );
}

function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      {reviews.map((review) => (
        <ReviewRow review={review} key={review.id} />
      ))}
      <div className="min-h-100px border-r" />
    </div>
  );
}

function ReviewRow({ review }: { review: Review }) {
  return (
    <Link
      href={`/film/${review.id}`}
      className="group col-span-full grid grid-cols-[subgrid]"
    >
      <div className="border-b border-r px-6px py-10px group-first:border-t group-odd:bg-retro-pale-green lg:px-10px lg:py-16px lg:group-odd:bg-white lg:group-hover:bg-retro-pale-green">
        <BodyCopy>
          {formatDDMMYYWithSlashes(safeDate(review.review_date))}
        </BodyCopy>
      </div>
      <div className="border-b px-6px py-10px group-first:border-t group-odd:bg-retro-pale-green lg:px-10px lg:py-16px lg:group-odd:bg-white lg:group-hover:bg-retro-pale-green">
        <BodyCopy className="uppercase">
          <u>{review.title}</u>, {review.directors} ({review.year})
        </BodyCopy>
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

function getReviewSortKey(review: Review) {
  return `${formatYYYYMMDD(safeDate(review.review_date))}-${review.id}`;
}
