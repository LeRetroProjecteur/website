"use client";

import { useClickAway } from "@uidotdev/usehooks";
import classNames from "classnames";
import { capitalize, intersection, sortBy, uniqBy } from "lodash-es";
import Image from "next/image";
import {
  ChangeEvent,
  MutableRefObject,
  Suspense,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";
import ReactSlider from "react-slider";

import {
  addDays,
  format,
  getHours,
  parse,
  startOfHour,
  subDays,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { fr } from "date-fns/locale";

import { Movie } from "@/lib/types";
import { checkNotNull, floatHourToString, isTodayInParis } from "@/lib/util";

import logo_square from "./logo_square.png";

async function getApiMovies(date: Date) {
  return (await fetch(`/get-movies/${format(date, "y-MM-dd")}`)).json();
}

export function MoviesByDay({
  date: initialDate,
  movies: initialMovies,
}: {
  date: string;
  movies: Promise<Movie[]>;
}) {
  const [date, setDate] = useState(parse(initialDate, "y-MM-dd", new Date()));
  const [movies, setMovies] = useState(initialMovies);

  const previousDate = useMemo(
    () => (isTodayInParis(date) ? undefined : subDays(date, 1)),
    [date],
  );
  const nextDate = useMemo(() => addDays(date, 1), [date]);

  const onPrevious = useCallback(async () => {
    setDate(checkNotNull(previousDate));
    setMovies(getApiMovies(checkNotNull(previousDate)));
  }, [setDate, previousDate]);
  const onNext = useCallback(async () => {
    setDate(checkNotNull(nextDate));
    setMovies(getApiMovies(nextDate));
  }, [setDate, nextDate]);

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
          <span id="date-of-today">
            {capitalize(format(date, "EEEE d MMMM y", { locale: fr }))}
          </span>
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
      <FilterableMovies isToday={isTodayInParis(date)} moviesPromise={movies} />
    </>
  );
}

export function FilterableMovies({
  moviesPromise,
  isToday,
}: {
  moviesPromise: Promise<Movie[]>;
  isToday: boolean;
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

  const todayMinHour = useMemo(
    () =>
      isToday
        ? getHours(startOfHour(utcToZonedTime(new Date(), "Europe/Paris")))
        : 0,
    [isToday],
  );

  const [minHour, setMinHour] = useState(todayMinHour);
  const [maxHour, setMaxHour] = useState(24);

  const onSliderChange = useCallback(
    (values: [min: number, max: number]) => {
      const [min, max] = values;
      setMinHour(min);
      setMaxHour(max);
    },
    [setMinHour, setMaxHour],
  );

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Slider minHour={minHour} maxHour={maxHour} onChange={onSliderChange} />
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
                  minHour={minHour}
                  maxHour={maxHour}
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
  minHour,
  maxHour,
}: {
  moviesPromise: Promise<Movie[]>;
  quartiers: string[];
  filter: string;
  minHour: number;
  maxHour: number;
}) {
  const movies = use(moviesPromise);

  const moviesWithFilteredShowtimes = useMemo(
    () =>
      movies
        .map((movie) => ({
          ...movie,
          showtimes_theater: movie.showtimes_theater
            .map((theater) => ({
              ...theater,
              showtimes: theater.showtimes.filter(
                (showtime) => showtime >= minHour && showtime <= maxHour,
              ),
            }))
            .filter((theater) => theater.showtimes.length > 0),
        }))
        .filter((movie) => movie.showtimes_theater.length > 0),
    [movies, minHour, maxHour],
  );

  const filteredMovies = useMemo(
    () =>
      moviesWithFilteredShowtimes.filter(
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
    [moviesWithFilteredShowtimes, filter, quartiers],
  );

  return (
    <>
      {filteredMovies.length > 0 ? (
        sortBy(filteredMovies, (movie) => [
          movie.year,
          movie.directors,
          movie.title,
        ]).map((movie) => (
          <tr key={movie.id}>
            <td>
              <a
                href={`/details?id=${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                {movie?.category === "COUP DE CŒUR" ? (
                  <div className="logo_cdc">
                    <Image
                      src={logo_square}
                      width={20}
                      height={17}
                      alt="coup-de-coeur"
                    />
                  </div>
                ) : null}
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
                  {showtime_theater.clean_name} (
                  {showtime_theater.zipcode_clean}
                  ):{" "}
                  {sortBy(showtime_theater.showtimes)
                    .map((showtime) => {
                      return floatHourToString(showtime);
                    })
                    .join(", ")}
                </div>
              ))}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={2}>
            <b>
              {filter.length > 0
                ? "Aucun film ne correspond à cette recherche aujourd'hui."
                : "Aucun film ne joue à cette heure-ci aujourd'hui, regardez demain ?"}
            </b>
          </td>
        </tr>
      )}
    </>
  );
}

function Slider({
  minHour,
  maxHour,
  onChange,
}: {
  minHour: number;
  maxHour: number;
  onChange: (values: [min: number, max: number]) => void;
}) {
  return (
    <>
      <div>
        Séances entre{" "}
        <b style={{ color: "var(--red)", fontWeight: "bold" }}>
          {minHour}h et {maxHour}h
        </b>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactSlider
          className="slider-range"
          value={[minHour, maxHour]}
          max={24}
          min={0}
          minDistance={2}
          onChange={onChange}
          thumbClassName="noUi-handle"
          trackClassName="slider-track"
        />
      </div>
    </>
  );
}
