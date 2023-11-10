"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { sortBy, take } from "lodash-es";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, {
  ChangeEvent,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Movie } from "@/lib/types";

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef: React.MutableRefObject<HTMLInputElement> = useClickAway(() =>
    setTimeout(() => setSearchTerm(""), 100),
  );

  const onChangeSearchTerm = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target?.value);
    },
    [setSearchTerm],
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
            <Dropdown searchTerm={searchTerm} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function Dropdown({ searchTerm }: { searchTerm: string }) {
  const _ = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    (async () => {
      setMovies(await (await fetch("/api/all-movies")).json());
    })();
  }, []);

  const filtered = useMemo(
    () =>
      searchTerm.length > 0
        ? take(
            sortBy(
              movies.filter(
                (movie) =>
                  movie.directors.toLowerCase().includes(searchTerm) ||
                  movie.title.toLowerCase().includes(searchTerm),
              ),
              (movie) => movie.title,
            ),
            5,
          )
        : [],
    [movies, searchTerm],
  );

  return (
    <div id="my-dropdown" className="dropdown-content show">
      {filtered.map((movie) => (
        <Link key={movie.id} href={`/details?id=${movie.id}`}>
          <i>{movie.title}</i>, {movie.directors} ({movie.year})
        </Link>
      ))}
    </div>
  );
}
