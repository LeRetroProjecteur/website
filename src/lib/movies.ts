import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { keyBy, omit, uniq } from "lodash-es";
import { DateTime } from "luxon";
import { unstable_cache } from "next/cache";
import "server-only";

import { getFirebase } from "./firebase";
import {
  Movie,
  MovieDetail,
  MovieDetailWithImage,
  MovieWithShowtimesByDay,
  Review,
  SearchMovie,
} from "./types";
import {
  checkNotNull,
  formatYYYYMMDD,
  formatYYYY_MM_DD,
  getNextMovieWeek,
} from "./util";

export const getWeekMovies = async () => {
  const nextMovieWeek = getNextMovieWeek();

  const moviesByDay = await Promise.all(
    nextMovieWeek.map<
      Promise<[date: DateTime, movies: { [index: string]: Movie }]>
    >(async (day) => {
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
          [formatYYYYMMDD(day)]:
            movieOnDay[movieWithAllDays.id].showtimes_theater,
        },
      }),
      movie,
    );
  });
};

export const getDayMovies = unstable_cache(
  async (
    date: DateTime,
    options?: { allMovies?: boolean; collectionBase?: string },
  ) => {
    const { db } = getFirebase();
    const collectionBase =
      options?.collectionBase ?? "website-by-date-screenings";
    const q = query(
      collection(
        db,
        `${collectionBase}${options?.allMovies ?? false ? "-all" : ""}`,
      ),
      where("date", "==", formatYYYY_MM_DD(date)),
    );
    const docs: Movie[] = [];
    (await getDocs(q)).forEach((doc) => docs.push(...doc.data().movies));
    return docs;
  },
  ["day-movies"],
  { revalidate: 1 },
);

export const getMovies = unstable_cache(
  async () => {
    const { db } = getFirebase();
    const collectionRef = collection(db, "website-extra-docs");
    const query_docs = query(collectionRef, where("search", "==", true));
    const querySnapshot = await getDocs(query_docs);
    const searchMovies = querySnapshot.docs.flatMap(
      (doc) => doc.data().elements,
    ) as SearchMovie[];
    return searchMovies;
  },
  ["all-movies"],
  { revalidate: 1 },
);

export const getReviewedMovies = unstable_cache(
  async () => {
    const { db } = getFirebase();
    const q = doc(db, "website-extra-docs", "all-reviews");
    const querySnapshot = await getDoc(q);
    return checkNotNull(querySnapshot.data()).elements as Review[];
  },
  ["reviewed-movies"],
  { revalidate: 1 },
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
      data_aux.push({
        ...omit(doc.data() as MovieDetailWithImage, "image_file"),
      });
    });
    return data_aux[0];
  },
  ["single-movie"],
  { revalidate: 1 },
);
