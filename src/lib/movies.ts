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

import { format, hoursToSeconds } from "date-fns";

import { getFirebase } from "./firebase";
import {
  Ballot,
  Movie,
  MovieDetail,
  MovieWithShowtimesByDay,
  Review,
} from "./types";
import { checkNotNull, getNextMovieWeek } from "./util";

export const getBallots = async () => {
  const { db } = getFirebase();
  const q = query(collection(db, `names`));
  const querySnapshot = await getDocs(q);
  const data_aux: Ballot[] = [];
  querySnapshot.forEach((doc) => {
    data_aux.push(doc.data().name);
  });
  return data_aux;
};

export const getWeekMovies = async () => {
  const nextMovieWeek = getNextMovieWeek();

  const moviesByDay = await Promise.all(
    nextMovieWeek.map<
      Promise<[date: Date, movies: { [index: string]: Movie }]>
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
    const collectionRef = collection(db, "website-extra-docs");
    const query_docs = query(collectionRef, where("search", "==", true));
    const querySnapshot = await getDocs(query_docs);
    const searchMovies = [].concat(
      ...querySnapshot.docs.map((doc) => doc.data().elements),
    );
    return searchMovies;
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
