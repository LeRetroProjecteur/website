"use client";

import {sortBy, take} from "lodash-es";
import {useSearchParams} from "next/navigation";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState,} from "react";

import {SearchMovie} from "@/lib/types";
import {string_match} from "@/lib/util";


export default function Top2023Search(
    {
      onSearchTermChange,
    }:
    {
      onSearchTermChange: (term: string) => void;
    }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeSearchTerm = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target?.value);
      onSearchTermChange(e.target?.value);
    },
    [setSearchTerm, onSearchTermChange],
  );

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm, setSearchTerm]);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom:"10px" }} ref={inputRef}>
        <div className="dropdown">
          <label htmlFor="movie-search"></label>
          <input
            type="text"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            className="movie-search"
            placeholder="Recherchez un film..."
            style={{ fontSize: "15px", padding: "5px", border: "1px solid var(--black)" }}
          />
            <Dropdown searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchTermChange={onSearchTermChange} />
        </div>
      </div>
    </>
  );
}

function Dropdown({
  searchTerm,
  setSearchTerm,
    onSearchTermChange
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
    onSearchTermChange: (term: string) => void;
}) {
  useSearchParams();
  const [movies, setMovies] = useState<SearchMovie[]>([]);

  useEffect(() => {
    (async () => {
      setMovies(await (await fetch("/api/all-movies")).json());
    })();
  }, []);

  const selectMovie = useCallback(
    (movie: SearchMovie) => {
      setSearchTerm(`${movie.title}, ${movie.directors} (${movie.year})`);
        onSearchTermChange(`${movie.title}, ${movie.directors} (${movie.year})`);
    },
      [setSearchTerm, onSearchTermChange],
  );


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
    <div id="dropDown" className="dropdown-content show">
      {filtered.map((movie) => (
        <div className = "selection-item" key={movie.id} onClick={() => selectMovie(movie)} style={{ cursor: 'pointer' }}>
            <i>{movie.title}</i>, {movie.directors} ({movie.year})
        </div>
      ))}
    </div>
  );
}