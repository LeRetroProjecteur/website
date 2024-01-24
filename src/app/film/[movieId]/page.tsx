import { Suspense } from "react";

import { getMovie } from "@/lib/movies";

import Film from "./film";

export const dynamic = "force-static";
export const revalidate = 1;

export default function FilmPage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  return (
    <Suspense fallback={<></>}>
      <FilmPageLoader movieId={movieId} />
    </Suspense>
  );
}

async function FilmPageLoader({ movieId }: { movieId: string }) {
  return <Film movie={await getMovie(movieId)} />;
}
