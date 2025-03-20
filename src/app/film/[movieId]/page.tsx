import { Metadata } from "next";

import { getMovie } from "@/lib/movies";
import { getMovieDetailsFromTmdb } from "@/lib/tmdb";

import Film from "./film";

export async function generateMetadata(props: {
  params: Promise<{ movieId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { movieId } = params;
  const movie = await getMovie(movieId);
  const tmdbMovie = await getMovieDetailsFromTmdb(movie);

  return {
    title: `${movie.title}`,
    description: `Prochaines séances à Paris de ${movie.title}`,
    ...(tmdbMovie?.image != null
      ? {
          openGraph: {
            type: "video.movie",
            title: `${movie.title}`,
            description: `Prochaines séances à Paris de ${movie.title}`,
            url: `https://leretroprojecteur.com/film/${movie.id}`,
            images: [
              {
                url: tmdbMovie?.image?.url,
                height: tmdbMovie?.image?.height,
                width: tmdbMovie?.image?.width,
              },
            ],
          },
        }
      : {}),
  };
}

export default async function FilmPage(props: {
  params: Promise<{ movieId: string }>;
}) {
  const params = await props.params;
  const { movieId } = params;

  return <FilmPageLoader movieId={movieId} />;
}

async function FilmPageLoader({ movieId }: { movieId: string }) {
  const movie = await getMovie(movieId);
  return (
    <Film movie={movie} tmdbMovie={await getMovieDetailsFromTmdb(movie)} />
  );
}
