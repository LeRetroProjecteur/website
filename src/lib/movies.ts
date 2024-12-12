import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { keyBy, uniq } from "lodash-es";
import { DateTime } from "luxon";
import { unstable_cache } from "next/cache";
import "server-only";

import { getFirebase } from "./firebase";
import {
  MovieDetail,
  MovieWithScreeningsOneDay,
  MovieWithScreeningsSeveralDays,
  ReducedMovie,
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
      Promise<
        [date: DateTime, movies: { [index: string]: MovieWithScreeningsOneDay }]
      >
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

    const movie: MovieWithScreeningsSeveralDays = {
      ...daysShowing[0][1][movieId],
      showtimes_by_day: {},
    };

    return daysShowing.reduce<MovieWithScreeningsSeveralDays>(
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
    const docs: MovieWithScreeningsOneDay[] = [];
    (await getDocs(q)).forEach((doc) => docs.push(...doc.data().movies));
    return docs;
  },
  ["day-movies"],
  { revalidate: 60 },
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
  { revalidate: 10 },
);

export const getAllMovies = async () => {
  const allMovies: SearchMovie[] = [];
  let nextDoc: string | undefined = undefined;
  let firstIteration = true;

  // eslint-disable-next-line no-constant-condition
  while (firstIteration || nextDoc != null) {
    firstIteration = false;
    const result = await getAllMoviesOneDocHelper(nextDoc);

    allMovies.push(...result.movies);
    nextDoc = result.nextDoc;
  }

  return allMovies;
};

const getAllMoviesOneDocHelper = unstable_cache(
  async (nextDoc?: string) => {
    const { db } = getFirebase();
    const collectionRef = collection(db, "website-all-movies-list-everything");

    const query_docs = query(
      collectionRef,
      ...[
        where("s", "==", true),
        orderBy("__name__"),
        limit(2),
        ...(nextDoc == null ? [] : [startAt(nextDoc)]),
      ],
    );
    const querySnapshot = await getDocs(query_docs);
    if (querySnapshot.docs.length === 0) {
      return { movies: [] };
    } else if (querySnapshot.docs.length > 2) {
      throw new Error();
    } else {
      const doc = querySnapshot.docs[0];
      return {
        movies: doc.data().e.map((m: ReducedMovie) => ({
          directors: m.d,
          id: m.i,
          original_title: m.o,
          title: m.t,
          year: m.y,
        })) as SearchMovie[],
        nextDoc: querySnapshot.docs.at(1)?.id,
      };
    }
  },
  ["all-movies-one-doc"],
  { revalidate: 180 },
);

export const getReviewedMovies = unstable_cache(
  async () => {
    const { db } = getFirebase();
    const q = doc(db, "website-extra-docs", "all-reviews");
    const querySnapshot = await getDoc(q);
    return checkNotNull(querySnapshot.data()).elements as Review[];
  },
  ["reviewed-movies"],
  { revalidate: 60 },
);

export const getMovie = unstable_cache(
  async (id: string) => {
    const { db } = getFirebase();
    const q = query(
      collection(db, "website-by-movie-screenings"),
      where("id", "==", id),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as MovieDetail)[0];
  },
  ["single-movie"],
  { revalidate: 60 },
);
