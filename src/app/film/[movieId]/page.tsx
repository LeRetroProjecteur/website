import { getMovie } from "@/lib/movies";

import Film from "./film";

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
