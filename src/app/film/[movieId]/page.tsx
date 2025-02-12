import { Metadata } from "next";

import { getMovie } from "@/lib/movies";

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

async function FilmPageLoader({ movieId }: { movieId: string }) {
  return <Film movie={await getMovie(movieId)} />;
}
