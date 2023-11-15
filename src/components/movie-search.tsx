"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { debounce } from "lodash-es";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Movie } from "@/lib/types";

export default function MovieSearch({}: {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const inputRef: React.MutableRefObject<HTMLInputElement> = useClickAway(() =>
    setSearchTerm(""),
  );

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        if (searchTerm.length > 0) {
          setMovies(
            await (await fetch(`/search-movies?query=${searchTerm}`)).json(),
          );
        }
      }, 200),
    [setMovies],
  );

  const onChangeSearchTerm = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target?.value);
      debouncedSearch(e.target?.value);
    },
    [setSearchTerm, debouncedSearch],
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
          <Dropdown movies={movies} />
        </div>
      </div>
    </>
  );
}

function Dropdown({ movies }: { movies: Movie[] }) {
  return (
    <div id="my-dropdown" className="dropdown-content show">
      {movies.map((movie) => (
        <a key={movie.id} href={`/details?id=${movie.id}`}>
          <i>{movie.title}</i>, {movie.directors} ({movie.year})
        </a>
      ))}
    </div>
  );
}
