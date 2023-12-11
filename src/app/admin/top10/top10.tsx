"use client";

import {capitalize, find, sortBy} from "lodash-es";
import {useSearchParams} from "next/navigation";
import {Fragment, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";

import {SearchMovie} from "@/lib/types";
import {checkNotNull} from "@/lib/util";

interface Inputs {
  mercredi: string;
  jeudi: string;
  vendredi: string;
  samedi: string;
  dimanche: string;
  lundi: string;
  mardi: string;
}

export default function SemaineAuCinema() {
  useSearchParams();

  const { register, watch } = useForm<Inputs>();

  const [weekHtml, setWeekHtml] = useState("");

  const weekHtmlRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (weekHtml !== weekHtmlRef?.current?.innerHTML ?? "") {
      setWeekHtml(weekHtmlRef?.current?.innerHTML ?? "");
    }
  });

  const [movies, setMovies] = useState<SearchMovie[]>([]);
  useEffect(() => {
    (async () => {
      setMovies(await (await fetch("/api/all-movies")).json());
    })();
  }, []);

  const ints: number[] = Array.from(Array(5).keys());
  const top_ints_string: string[] = ints.map((i) => i.toString());
  const tops: Array<keyof Inputs> = top_ints_string.map(
    (int) => int as keyof Inputs,
  );
  const topsValues = watch(tops);

  return (
    <>
      <h2>
        Votre Top5 2023 :
      </h2>
      <div style={{ textAlign: "center" }}>
        <form>
          {tops.map((day, i) => (
            <Fragment key={day}>
              <h3>{"Number " + (i+1)}</h3>
              <select id={day.toString()} {...register(day)}>
                [<option value="">-----</option>
                {sortBy(movies, (movie) => [movie.title]).map(
                  (movie) => (
                    <option value={movie.id} key={movie.id}>
                      {movie.title}, {movie.directors} ({movie.year})
                    </option>
                  ),
                )}
                ]
              </select>
            </Fragment>
          ))}
          <br />
          <br />
          <br />
        </form>
      </div>
        {/*<h2>2023 :</h2>*/}
      <div ref={weekHtmlRef} style={{ textAlign: "center" }}>
        {getTop(top_ints_string, topsValues, movies)}
      </div>
      <h2>HTML :</h2>
      <span>{weekHtml}</span>
    </>
  );
}

function getTop(week: string[], dayValues: string[], movies: SearchMovie[]) {
  return (
    <>
      <h3
        style={{
          textAlign: "center",
          fontFamily: "lora,georgia,times new roman,serif",
          color: "#808080",
          fontSize: "18px",
        }}
      >
        Mon Top 5 2023
      </h3>
      <br />
      <div
        style={{
          textAlign: "center",
          fontFamily: "lora,georgia,times new roman,serif",
          color: "#444444",
        }}
      >
        {week.map((day, i) => {
          if (dayValues[i] == null || dayValues[i] === "") {
            return null;
          } else {
            const movie = checkNotNull(
              find(movies, (movie) => movie.id === dayValues[i]),
            );
            return (
              <Fragment key={i}>
                <strong>
                  <u>
                    <span style={{ fontSize: "18px" }}>
                      {capitalize("Top " + (i + 1)) + " :" }
                    </span>
                  </u>
                    {" "} <i>{movie.title}</i>, {movie.directors} ({movie.year})
                </strong>
              </Fragment>
            );
          }
        })}
      </div>
    </>
  );
}
