import { flatten, groupBy, sortBy, uniq } from "lodash-es";
import { Fragment, use, useMemo } from "react";

import { SousTitre2 } from "@/components/typography/typography";
import { MovieWithScreeningsByDay } from "@/lib/types";

type RetrospectiveItem = [string, MovieWithScreeningsByDay[], string];

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsByDay[]>;
}) {
  const movies = use(moviesPromise);

  const retrospectives = useMemo(() => {
    // First, create movie-cinema pairs
    const movieCinemaPairs = flatten(
      movies.map((movie) =>
        flatten(Object.values(movie.showtimes_by_day)).map(({ name }) => ({
          movie,
          cinema: name,
        })),
      ),
    );

    // Group by director and cinema
    const groupedByCinemaAndDirector = groupBy(
      movieCinemaPairs,
      (item) => `${item.movie.directors}|||${item.cinema}`,
    );

    // Filter groups with at least 3 movies and transform into required format
    return sortBy(
      Object.entries(groupedByCinemaAndDirector)
        .filter(([_, items]) => {
          const uniqueMovies = uniq(items.map((item) => item.movie.title));
          return uniqueMovies.length >= 3;
        })
        .map(([key, items]) => {
          const [director, cinema] = key.split("|||");
          const uniqueMovies = uniq(items.map((item) => item.movie));
          return [director, uniqueMovies, cinema] as RetrospectiveItem;
        }),
      ([director]) => director,
    );
  }, [movies]);

  return (
    <>
      <div className="pb-20px">
        <SousTitre2>Rétrospectives</SousTitre2>
      </div>
      <div>
        {retrospectives.map(([director, movies, cinema], i) => (
          <Fragment key={`${director}-${cinema}`}>
            <div className="font-bold">
              {director}&nbsp;: {cinema}
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
            {i < retrospectives.length - 1 ? (
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
                ([director, movies, cinema]) => `
            <h2 class="null" data-pm-slice="0 0 []" style="text-align: center;">
              <span style="font-size:Default Size">
                <strong>
                  <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                    Rétrospective ${director} à ${cinema}
                  </span>
                </strong>
              </span>
            </h2>
            <p style="text-align: center;">
              <span style="font-size:Default Size">
                ${sortBy(movies, (movie) => [
                  movie.year,
                  movie.directors,
                  movie.title,
                ])
                  .map(
                    (movie, i, movies) =>
                      `<a href="https://leretroprojecteur.com/film/${
                        movie.id
                      }"><u><em>${movie.title}</em></u></a> (${movie.year})${
                        i < movies.length - 1 ? ", " : ""
                      }`,
                  )
                  .join("")}
              </span>
            </p>`,
              )
              .join("\n")}
          </pre>
        </div>
      }
    </>
  );
}
