import { flatten, groupBy, sortBy, uniq } from "lodash-es";
import { Fragment, use, useMemo } from "react";

import {
  transformZipcode,
  transformZipcodeToString,
} from "@/components/seances/theater_utils";
import { SousTitre2 } from "@/components/typography/typography";
import { MovieWithScreeningsByDay } from "@/lib/types";

type RetrospectiveItem = [string, MovieWithScreeningsByDay[], string, string];

export function Retrospectives({
  movies: moviesPromise,
}: {
  movies: Promise<MovieWithScreeningsByDay[]>;
}) {
  const movies = use(moviesPromise);

  const retrospectives = useMemo(() => {
    // First, create movie-cinema pairs with zipcode
    const movieCinemaPairs = flatten(
      movies.map((movie) =>
        flatten(Object.values(movie.showtimes_by_day)).map(
          ({ pronoun_and_name, zipcode }) => ({
            movie,
            cinema: pronoun_and_name,
            zipcode,
          }),
        ),
      ),
    );

    // Group by director, cinema and zipcode
    const groupedByCinemaAndDirector = groupBy(
      movieCinemaPairs,
      (item) => `${item.movie.directors}|||${item.cinema}|||${item.zipcode}`,
    );

    // Filter groups with at least 3 movies and transform into required format
    return sortBy(
      Object.entries(groupedByCinemaAndDirector)
        .filter(([_, items]) => {
          const uniqueMovies = uniq(items.map((item) => item.movie.title));
          return uniqueMovies.length >= 5;
        })
        .map(([key, items]) => {
          const [director, cinema, zipcode] = key.split("|||");
          const uniqueMovies = uniq(items.map((item) => item.movie));
          return [director, uniqueMovies, cinema, zipcode] as RetrospectiveItem;
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
        {retrospectives.map(([director, movies, cinema, zipcode], i) => (
          <Fragment key={`${director}-${cinema}`}>
            <div className="font-bold">
              {director} {cinema} ({transformZipcode(zipcode)})
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
              .map(([director, movies, cinema, zipcode], index) => {
                const movieLinks = sortBy(movies, (movie) => [
                  movie.year,
                  movie.directors,
                  movie.title,
                ])
                  .map(
                    (movie, i, movies) =>
                      `<a href="https://leretroprojecteur.com/film/${movie.id}">` +
                      `<u><em>${movie.title}</em></u></a> (${movie.year})` +
                      `${i < movies.length - 1 ? ", " : ""}`,
                  )
                  .join("");

                const template = `
    <h2 class="null" style="text-align: center;">
      <strong>Rétrospective ${director} ${cinema} (${transformZipcodeToString(
        zipcode,
      )})</strong>
    </h2>
    <p style="text-align: center;">${movieLinks}</p>`;

                const bullet = `
    <h2 class="null" style="text-align: center;"><span style="font-size:Default Size">&bull;</span></h2>`;

                return (
                  template + (index < retrospectives.length - 1 ? bullet : "")
                );
              })
              .join("\n")}
          </pre>
        </div>
      }
    </>
  );
}
