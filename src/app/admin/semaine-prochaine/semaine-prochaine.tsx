import { flatten, groupBy, orderBy, sortBy, toPairs, uniq } from "lodash-es";
import { Fragment, use, useMemo } from "react";

import { SousTitre2 } from "@/components/typography/typography";
import { MovieWithScreeningsByDay } from "@/lib/types";

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsByDay[]>;
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
      <br />
      <br />
      {
        <div className="font-mono text-sm">
          <pre className="whitespace-pre-wrap break-all">
            <div className="pb-5px">
              <SousTitre2>Rétrospectives (html)</SousTitre2>
            </div>
            {retrospectives
              .map(
                ([director, movies]) => `
            <p>
              <strong>${director}&nbsp;: ${getCinemas(movies)}</strong><br/>
              ${sortBy(movies, (movie) => [
                movie.year,
                movie.directors,
                movie.title,
              ])
                .map(
                  (movie, i, movies) =>
                    `<a href="https://leretroprojecteur.com/film/${
                      movie.id
                    }"><i>${movie.title}</i></a> (${movie.year})${
                      i < movies.length - 1 ? ", " : ""
                    }`,
                )
                .join("")}
</p>`,
              )
              .join("\n")}
          </pre>
        </div>
      }
    </>
  );
}

function getCinemas(movies: MovieWithScreeningsByDay[]) {
  const movieCinemas = movies.map<[MovieWithScreeningsByDay, string[]]>(
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
