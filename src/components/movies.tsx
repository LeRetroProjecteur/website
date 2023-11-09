"use client";

import { useClickAway, useIsFirstRender } from "@uidotdev/usehooks";
import classNames from "classnames";
import { intersection, pad, sortBy, uniqBy } from "lodash-es";
import {
  ChangeEvent,
  MutableRefObject,
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { addDays, format, isToday, subDays } from "date-fns";

import { Movie } from "@/lib/types";
import { checkNotNull } from "@/lib/util";

async function getApiMovies(date: Date) {
  return (await fetch(`/get-movies/${format(date, "Y-MM-dd")}`)).json();
}

export function MoviesByDayClient({
  date: initialDate,
  movies: initialMovies,
}: {
  date: Date;
  movies: Promise<Movie[]>;
}) {
  const [date, setDate] = useState(initialDate);
  const [movies, setMovies] = useState(initialMovies);

  const previousDate = useMemo(
    () => (isToday(date) ? undefined : subDays(date, 1)),
    [date],
  );
  const nextDate = useMemo(() => addDays(date, 1), [date]);

  const onPrevious = useCallback(
    () => setDate(checkNotNull(previousDate)),
    [setDate, previousDate],
  );
  const onNext = useCallback(
    () => setDate(checkNotNull(nextDate)),
    [setDate, nextDate],
  );

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender) {
      setMovies(getApiMovies(date));
    }
  }, [date, isFirstRender]);

  return (
    <>
      <h3>
        <input
          type="button"
          id="date-backward"
          className="button"
          value="◄"
          style={{
            color: previousDate == null ? "var(--lightgrey)" : "var(--red",
          }}
          onClick={previousDate == null ? undefined : onPrevious}
        />
        <b>
          <span id="date-of-today">{format(date, "EEEE d MMMM y")}</span>
        </b>
        <input
          type="button"
          id="date-forward"
          className="button"
          value="►"
          style={{ color: "var(--red)" }}
          onClick={onNext}
        />
      </h3>
      <p style={{ margin: "7px" }}></p>
      <FilterableMovies moviesPromise={movies} />
    </>
  );
}

export function FilterableMovies({
  moviesPromise,
}: {
  moviesPromise: Promise<Movie[]>;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = useCallback(
    () => setDropdownVisible(!dropdownVisible),
    [dropdownVisible, setDropdownVisible],
  );
  const listRef: MutableRefObject<HTMLDivElement> = useClickAway(() =>
    setDropdownVisible(false),
  );

  const [rg, setRg] = useState(true);
  const [rd, setRd] = useState(true);
  const [em, setEm] = useState(true);
  const onChangeRg = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRg(e.target.checked),
    [setRg],
  );
  const onChangeRd = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setRd(e.target.checked),
    [setRd],
  );
  const onChangeEm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEm(e.target.checked),
    [setEm],
  );

  const [filter, setFilter] = useState("");
  const onChangeFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value),
    [setFilter],
  );

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div id="slider-range-value"></div>
        <div className="slider-styled" id="slider-range"></div>
        <p style={{ margin: "7px" }}></p>
        <div id="wrap">
          <div
            ref={listRef}
            id="neighborhood-list"
            className={classNames("dropdown-check-list", {
              visible: dropdownVisible,
            })}
            tabIndex={100}
          >
            <span className="anchor" onClick={toggleDropdown}>
              Par quartiers
            </span>
            <ul className="items">
              <label className="checkbox">
                <input
                  className="checkbox"
                  type="checkbox"
                  id="rg"
                  checked={rg}
                  onChange={onChangeRg}
                />{" "}
                Rive gauche
                <br />
              </label>
              <label className="checkbox">
                <input
                  className="checkbox"
                  type="checkbox"
                  id="rd"
                  checked={rd}
                  onChange={onChangeRd}
                />{" "}
                Rive droite
                <br />
              </label>
              <label className="checkbox">
                <input
                  className="checkbox"
                  type="checkbox"
                  id="em"
                  checked={em}
                  onChange={onChangeEm}
                />{" "}
                Extra-muros
                <br />
              </label>
            </ul>
          </div>
          <div className="filtering">
            <label htmlFor="filtering-box"></label>
            <input
              type="text"
              className="filtering-box"
              id="filtering-box"
              placeholder="Réalisateur, pays..."
              onChange={onChangeFilter}
            />
          </div>
        </div>
      </div>
      <p style={{ margin: "7px" }}></p>
      <div className="wrapper">
        <div className="profile">
          <table id="userdata" className="center">
            <thead>
              <tr>
                <th
                  style={{
                    width: "50%",
                    backgroundColor: "var(--red)",
                    color: "var(--white)",
                  }}
                >
                  <strong>Film</strong>
                </th>
                <th
                  style={{
                    width: "50%",
                    backgroundColor: "var(--red)",
                    color: "var(--white)",
                  }}
                >
                  <strong>Séances</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={[...Array(20)].map((_, i) => (
                  <tr key={i}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                ))}
              >
                <Movies
                  moviesPromise={moviesPromise}
                  filter={filter}
                  quartiers={[
                    ...(rg ? ["rg"] : []),
                    ...(rd ? ["rd"] : []),
                    ...(em ? ["em"] : []),
                  ]}
                />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export function Movies({
  moviesPromise,
  quartiers,
  filter,
}: {
  moviesPromise: Promise<Movie[]>;
  quartiers: string[];
  filter: string;
}) {
  const movies = use(moviesPromise);

  const filteredMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          (filter == "" ||
            `${movie.directors} ${movie.title} ${movie.language} ${movie.original_title}`
              .toLowerCase()
              .includes(filter.toLowerCase())) &&
          intersection(
            quartiers,
            movie.showtimes_theater.map((t) => t.location_2),
          ).length > 0,
      ),
    [movies, filter, quartiers],
  );

  return (
    <>
      {sortBy(filteredMovies, (movie) => movie.year).map((movie) => (
        <tr key={movie.id}>
          <td>
            <a
              href={`/details.html?id=${movie.id}`}
              style={{ textDecoration: "none" }}
            >
              <b>{movie.title}</b>, {movie.directors} ({movie.year})
            </a>
          </td>
          <td>
            {sortBy(
              uniqBy(
                movie.showtimes_theater,
                (showtime_theater) => showtime_theater.clean_name,
              ),
              (showtime_theater) => showtime_theater.clean_name,
            ).map((showtime_theater) => (
              <div key={showtime_theater.clean_name}>
                {showtime_theater.clean_name} ({showtime_theater.zipcode_clean}
                ):{" "}
                {sortBy(showtime_theater.showtimes)
                  .map((showtime) => {
                    return `${Math.floor(showtime)}h${pad(
                      parseInt(
                        (60 * (showtime - Math.floor(showtime))).toPrecision(2),
                      ).toString(),
                      2,
                    )}`;
                  })
                  .join(", ")}
              </div>
            ))}
          </td>
        </tr>
      ))}
    </>
  );
}
