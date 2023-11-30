"use client";

import classNames from "classnames";
import { sortBy } from "lodash-es";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import PageHeader from "@/components/layout/page-header";
import { Review } from "@/lib/types";
import {
  formatDDMMYYWithDots,
  isCoupDeCoeur,
  movie_info_containsFilteringTerm,
  safeDate,
} from "@/lib/util";

export default function CoupsDeCoeurPage() {
  const [filter, setFilter] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    (async () => {
      setReviews(
        sortBy(
          (await (await fetch("/api/movies/all-reviewed")).json()).filter(
            isCoupDeCoeur,
          ),
          (review) => -safeDate(review.review_date).valueOf(),
        ),
      );
    })();
  }, []);

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
    <div className="flex grow flex-col">
      <div className="flex">
        <PageHeader text="coups de coeur" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="border-retro-gray text-retro-gray flex border-b py-4 text-xl font-semibold uppercase">
          archive des critiques
        </div>
        <div className="flex">
          <RetroInput
            placeholder="recherche"
            value={filter}
            setValue={setFilter}
          />
        </div>
        <div className="flex grow flex-col">
          {filteredReviews.map((review, i) => (
            <div key={review.id} className="flex">
              <div className="border-retro-gray flex w-1/2 border-r pr-1">
                <div
                  className={classNames(
                    { "bg-retro-green": i % 2 == 1 },
                    "border-retro-gray text-retro-black grow gap-1 border-b px-1 py-2 font-medium",
                  )}
                >
                  {formatDDMMYYWithDots(safeDate(review.review_date))}
                </div>
              </div>
              <div className="border-retro-gray flex w-1/2 pl-1">
                <div
                  className={classNames(
                    { "bg-retro-green": i % 2 == 1 },
                    "border-retro-gray text-retro-black grow border-b px-1 py-2 font-medium uppercase",
                  )}
                >
                  <Link href={`/archives/${review.id}`} className="underline">
                    {review.title}
                  </Link>{" "}
                  ({review.year}), {review.directors}
                </div>
              </div>
            </div>
          ))}
          <div className="flex h-20">
            <div className="border-retro-gray w-1/2 border-r pr-1"></div>
            <div className="w-1/2 pl-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
