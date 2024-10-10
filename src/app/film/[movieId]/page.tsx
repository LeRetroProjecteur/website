import { Metadata } from "next";

import { getMovie } from "@/lib/movies";

import Film from "./film";

export async function generateMetadata({
  params: { movieId },
}: {
  params: { movieId: string };
}): Promise<Metadata> {
  return {
    title: `${(await getMovie(movieId)).title}`,
    description: `Prochaines séances à Paris de ${(await getMovie(movieId)).title}`
  };
}

export default function FilmPage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  return <FilmPageLoader movieId={movieId} />;
}

async function FilmPageLoader({ movieId }: { movieId: string }) {
  return <Film movie={await getMovie(movieId)} />;
}
