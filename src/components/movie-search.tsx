"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { take } from "lodash-es";
import React, {
  ChangeEvent,
  Suspense,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Movie } from "@/lib/types";

export default function MovieSearch({
  moviesPromise,
}: {
  moviesPromise: Promise<Movie[]>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef: React.MutableRefObject<HTMLInputElement> = useClickAway(() =>
    setSearchTerm(""),
  );

  const onChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target?.value),
    [setSearchTerm],
  );

  const lowerCaseSearchTerm = useMemo(
    () => searchTerm.toLowerCase(),
    [searchTerm],
  );

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="dropdown">
          <label htmlFor="movie-search"></label>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            className="movie-search"
            placeholder="Recherchez un film..."
          />
          <Suspense fallback={<></>}>
            <Dropdown
              lowerCaseSearchTerm={lowerCaseSearchTerm}
              moviesPromise={moviesPromise}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function Dropdown({
  lowerCaseSearchTerm,
  moviesPromise,
}: {
  lowerCaseSearchTerm: string;
  moviesPromise: Promise<Movie[]>;
}) {
  const movies = use(moviesPromise);
  const matches = useMemo(
    () =>
      lowerCaseSearchTerm.length > 0
        ? take(
            movies.filter(
              (movie) =>
                movie.directors.toLowerCase().includes(lowerCaseSearchTerm) ||
                movie.title.toLowerCase().includes(lowerCaseSearchTerm),
            ),
            5,
          )
        : [],
    [movies, lowerCaseSearchTerm],
  );

  return (
    <div id="my-dropdown" className="dropdown-content show">
      {matches.map((match) => (
        <a key={match.id} href={`/details?id=${match.id}`}>
          <i>{match.title}</i>, {match.directors} ({match.year})
        </a>
      ))}
    </div>
  );
}
