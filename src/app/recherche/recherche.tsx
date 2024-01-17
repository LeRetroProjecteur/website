"use client";

import { orderBy, take } from "lodash-es";
import Link from "next/link";
import { Suspense, use, useMemo, useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import Loading from "@/components/icons/loading";
import FixedHeader from "@/components/layout/fixed-header";
import PageHeader from "@/components/layout/page-header";
import { MetaCopy } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";
import { string_match } from "@/lib/util";

export default function Recherche({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex grow flex-col">
      <FixedHeader className="lg:border-b">
        <div className="pb-17px lg:hidden">
          <PageHeader text={"recherche"} />
        </div>
        <div className="flex flex-col lg:px-20px">
          <RetroInput
            customTypography
            value={searchTerm}
            setValue={setSearchTerm}
            placeholder="film, réalisateur, année, pays..."
            className="text-21px font-medium uppercase leading-25px leading-44px lg:text-29px lg:tracking-[-0.01em]"
          />
        </div>
      </FixedHeader>
      <Suspense
        fallback={
          <div className="flex grow items-center justify-center">
            {searchTerm.length > 0 && (
              <Loading className="h-75px w-75px animate-bounce text-retro-gray" />
            )}
          </div>
        }
      >
        <Results {...{ searchTerm, allMoviesPromise }} />
      </Suspense>
    </div>
  );
}

function Results({
  allMoviesPromise,
  searchTerm,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
  searchTerm: string;
}) {
  const allMovies = use(allMoviesPromise);
  const filtered = useMemo(
    () =>
      searchTerm.length > 0
        ? take(
            orderBy(
              allMovies.filter((movie) =>
                string_match(
                  searchTerm,
                  `${movie.directors} ${movie.title} ${movie.original_title}`,
                ),
              ),
              (movie) => movie.relevance_score,
              "desc",
            ),
            5,
          )
        : [],
    [allMovies, searchTerm],
  );

  return (
    searchTerm.length > 0 && (
      <div className="flex flex-col pt-20px lg:px-20px">
        {filtered.length > 0 ? (
          filtered.map((movie) => (
            <Link
              key={movie.id}
              href={`/archives/${movie.id}`}
              className="flex border-b py-10px pl-5px text-15px font-medium uppercase leading-20px first:border-t odd:bg-retro-green lg:py-18px lg:pl-10px lg:text-18px lg:leading-21px lg:tracking-[0.01em] lg:first:border-t-0 lg:last:border-0 lg:odd:bg-white lg:hover:bg-retro-pale-green"
            >
              <u className="underline">{movie.title}</u>&nbsp;({movie.year}),{" "}
              {movie.directors}
            </Link>
          ))
        ) : (
          <MetaCopy>
            désolé, nous n&apos;avons rien trouvé qui corresponde à votre
            recherche !
          </MetaCopy>
        )}
      </div>
    )
  );
}
