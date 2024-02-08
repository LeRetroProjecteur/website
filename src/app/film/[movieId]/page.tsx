import { Metadata } from "next";
import { Suspense } from "react";

import { getMovie } from "@/lib/movies";

import Film from "./film";

export const dynamic = "force-static";
export const revalidate = 1;

export async function generateMetadata({
  params: { movieId },
}: {
  params: { movieId: string };
}): Promise<Metadata> {
  return {
    title: `${
      (await getMovie(movieId)).title
    } | Le Rétro Projecteur - Cinéma de patrimoine à Paris`,
  };
}

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
