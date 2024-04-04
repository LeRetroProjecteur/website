import { flatten, groupBy, orderBy, sortBy, toPairs, uniq } from "lodash-es";
import { Fragment, use, useMemo } from "react";

import Filter from "@/app/(calendrier)/filter";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1, SousTitre2 } from "@/components/typography/typography";
import { getWeekMovies } from "@/lib/movies";
import { MovieWithShowtimesByDay } from "@/lib/types";
import { formatLundi1Janvier, getNextMovieWeek } from "@/lib/util";

import MovieTable from "../../(calendrier)/movie-table";

export const dynamic = "force-dynamic";

export default function SemainePage() {
  const movieWeek = getNextMovieWeek();
  const movieWeekStart = formatLundi1Janvier(movieWeek[0]);
  const movieWeekEnd = formatLundi1Janvier(movieWeek[6]);
  const serverMovies = getWeekMovies();

  return (
    <>
      <PageHeader text="La semaine prochaine">
        <SousTitre1>
          Semaine du {movieWeekStart} au {movieWeekEnd}
        </SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col pb-10px lg:pl-20px">
        <div className="flex flex-col lg:flex-row">
          <div className="flex pt-15px lg:grow lg:pt-0">
            <Filter />
          </div>
        </div>
        <div className="flex grow pt-18px lg:pt-28px">
          <MovieTable serverMovies={serverMovies} allMovies={false} />
        </div>
        <div className="flex grow flex-col">
          <div className="flex flex-col pt-44px">
            <Retrospectives movies={serverMovies} />
          </div>
        </div>
      </div>
    </>
  );
}

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithShowtimesByDay[]>;
}) {
  const movies = use(moviesPromise);
  const retrospectives = useMemo(
    () =>
      sortBy(
        toPairs(groupBy(movies, (movie) => movie.directors)).filter(
          ([_, movies]) => movies.length > 3,
        ),
        ([director]) => director,
      ),
    [movies],
  );

  return (
    <>
      <div className="pb-20px">
        <SousTitre2>Rétrospectives</SousTitre2>
      </div>
      <div>
        {retrospectives.map(([director, movies], i, directors) => (
          <Fragment key={director}>
            <div className="font-bold">
              {director}&nbsp;: {getCinemas(movies)}
            </div>
            <>
              {sortBy(movies, (movie) => [
                movie.year,
                movie.directors,
                movie.title,
              ]).map((movie, i, movies) => (
                <Fragment key={movie.title}>
                  <i>{movie.title}</i> ({movie.year})
                  {i < movies.length - 1 ? ", " : ""}
                </Fragment>
              ))}
            </>
            {i < directors.length - 1 ? (
              <>
                <br />
                <br />
              </>
            ) : null}
          </Fragment>
        ))}
      </div>
    </>
  );
}

function getCinemas(movies: MovieWithShowtimesByDay[]) {
  const movieCinemas = movies.map<[MovieWithShowtimesByDay, string[]]>(
    (movie) => [
      movie,
      flatten(Object.values(movie.showtimes_by_day)).map(({ name }) => name),
    ],
  );
  const cinemas = uniq(
    flatten(Object.values(movieCinemas.map(([_, cinemas]) => cinemas))),
  );
  const cinemasAndNumberOfMovies = cinemas.map<[string, number]>((cinema) => [
    cinema,
    movieCinemas.filter(([_, cinemas]) => cinemas.includes(cinema)).length,
  ]);

  return orderBy(cinemasAndNumberOfMovies, ([_, num]) => num, "desc")
    .map(([cinema, num]) => `${cinema} (${num})`)
    .join(", ");
}
