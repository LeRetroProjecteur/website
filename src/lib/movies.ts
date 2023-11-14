import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { keyBy, uniq } from "lodash-es";
import { unstable_cache } from "next/cache";
import "server-only";

import {
  addDays,
  addWeeks,
  format,
  hoursToSeconds,
  startOfISOWeek,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { getFirebase } from "./firebase";
import {
  Movie,
  MovieDetail,
  MovieWithShowtimesByDay,
  Review,
  SearchMovie,
} from "./types";
import { checkNotNull } from "./util";

export const getWeekMovies = async () => {
  const today = utcToZonedTime(new Date(), "Europe/Paris");
  const startOfNextWeek = addDays(
    addWeeks(startOfISOWeek(today), [1, 2].includes(today.getDay()) ? 0 : 1),
    2,
  );

  const moviesByDay = await Promise.all(
    [...Array(7)].map<
      Promise<[date: Date, movies: { [index: string]: Movie }]>
    >(async (_, i) => {
      const day = addDays(startOfNextWeek, i);
      return [day, keyBy(await getDayMovies(day), (movie) => movie.id)];
    }),
  );

  const allMovieIds = uniq(
    moviesByDay.flatMap(([_, dayMovies]) => Object.keys(dayMovies)),
  );

  return allMovieIds.map((movieId) => {
    const daysShowing = moviesByDay.filter(
      ([_, movies]) => movies[movieId] != null,
    );

    const movie: MovieWithShowtimesByDay = {
      ...daysShowing[0][1][movieId],
      showtimes_by_day: {},
    };

    return daysShowing.reduce<MovieWithShowtimesByDay>(
      (movieWithAllDays, [day, movieOnDay]) => ({
        ...movieWithAllDays,
        showtimes_by_day: {
          ...movieWithAllDays.showtimes_by_day,
          [format(day, "y-MM-dd")]:
            movieOnDay[movieWithAllDays.id].showtimes_theater,
        },
      }),
      movie,
    );
  });
};

export const getDayMovies = unstable_cache(
  async (date: Date, options?: { allMovies?: boolean }) => {
    const { db } = getFirebase();
    const q = query(
      collection(
        db,
        `website-by-date-screenings${
          options?.allMovies ?? false ? "-all" : ""
        }`,
      ),
      where("date", "==", format(date, "Y_MM_dd")),
    );
    const docs: Movie[] = [];
    (await getDocs(q)).forEach((doc) => docs.push(...doc.data().movies));
    return docs;
  },
  ["day-movies"],
  { revalidate: hoursToSeconds(1) },
);

export const getMovies = unstable_cache(
  async () => {
    const { db } = getFirebase();
    const q = doc(db, "website-extra-docs", "all-movies");
    const querySnapshot = await getDoc(q);
    return checkNotNull(querySnapshot.data()).elements as SearchMovie[];
  },
  ["all-movies"],
  { revalidate: hoursToSeconds(1) },
);

export const getReviewedMovies = unstable_cache(
  async () => {
    const { db } = getFirebase();
    const q = doc(db, "website-extra-docs", "all-reviews");
    const querySnapshot = await getDoc(q);
    return checkNotNull(querySnapshot.data()).elements as Review[];
  },
  ["reviewed-movies"],
  { revalidate: hoursToSeconds(1) },
);

export const getMovie = unstable_cache(
  async (id: string) => {
    const { db } = getFirebase();
    const q = query(
      collection(db, "website-by-movie-screenings"),
      where("id", "==", id),
    );
    const querySnapshot = await getDocs(q);
    const data_aux: MovieDetail[] = [];
    querySnapshot.forEach((doc) => {
      data_aux.push(doc.data() as MovieDetail);
    });
    return data_aux[0];
  },
  ["single-movie"],
  { revalidate: hoursToSeconds(1) },
);
