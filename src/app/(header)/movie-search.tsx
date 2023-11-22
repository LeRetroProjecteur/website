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

import { SearchMovie } from "@/lib/types";
import { string_match } from "@/lib/util";

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef: React.MutableRefObject<HTMLInputElement> = useClickAway(
    () => {
      console.log("click away");
      setSearchTerm("");
    },
  );

  const onChangeSearchTerm = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target?.value);
    },
    [setSearchTerm],
  );

  return (
    <>
      <div style={{ textAlign: "center" }} ref={inputRef}>
        <div className="dropdown">
          <label htmlFor="movie-search"></label>
          <input
            type="text"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            className="movie-search"
            placeholder="Recherchez un film..."
          />
          <Suspense fallback={<></>}>
            <Dropdown searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function Dropdown({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}) {
  useSearchParams();
  const [movies, setMovies] = useState<SearchMovie[]>([]);

  useEffect(() => {
    (async () => {
      setMovies(await (await fetch("/api/all-movies")).json());
    })();
  }, []);

  const closeDropdown = useCallback(() => {
    console.log("close dropdown");
    setSearchTerm("");
  }, [setSearchTerm]);

  const filtered = useMemo(
    () =>
      searchTerm.length > 0
        ? take(
            sortBy(
              movies.filter((movie) =>
                string_match(searchTerm, movie.search_field),
              ),
              (movie) => -movie.relevance_score,
            ),
            5,
          )
        : [],
    [movies, searchTerm],
  );

  return (
    <div id="my-dropdown" className="dropdown-content show">
      {filtered.map((movie) => (
        <Link
          key={movie.id}
          onClick={closeDropdown}
          href={`/details/${movie.id}`}
        >
          <i>{movie.title}</i>, {movie.directors} ({movie.year})
        </Link>
      ))}
    </div>
  );
}
