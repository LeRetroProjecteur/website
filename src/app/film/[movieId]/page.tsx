import { cloneDeep } from "lodash-es";
import { Metadata } from "next";

import { getMovie } from "@/lib/movies";
import { getMovieDetailsFromTmdb } from "@/lib/tmdb";
import { MovieDetail } from "@/lib/types";

import Film from "./film";

export async function generateMetadata(props: {
  params: Promise<{ movieId: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { movieId } = params;

  return {
    title: `${(await getMovie(movieId)).title}`,
    description: `Prochaines séances à Paris de ${
      (await getMovie(movieId)).title
    }`,
  };
}

export default async function FilmPage(props: {
  params: Promise<{ movieId: string }>;
}) {
  const params = await props.params;

  const { movieId } = params;

  return <FilmPageLoader movieId={movieId} />;
}

function applyHardcodedEdits(movie_: MovieDetail): MovieDetail {
  const movie = cloneDeep(movie_);

  if (movie.id === "recreations-1992") {
    movie.year = "1993";
  }

  return movie;
}

async function FilmPageLoader({ movieId }: { movieId: string }) {
  const movie = await getMovie(movieId);
  return (
    <Film
      movie={movie}
      tmdbMovie={await getMovieDetailsFromTmdb(applyHardcodedEdits(movie))}
    />
  );
}
