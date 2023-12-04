import { Suspense } from "react";

import { getMovie, getReviewedMovies } from "@/lib/movies";

import Archives from "./archives";

export const dynamic = "force-static";
export const revalidate = 1;

export default function ArchivesPage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  return (
    <Suspense fallback={<></>}>
      <ArchivesPageLoader movieId={movieId} />
    </Suspense>
  );
}

async function ArchivesPageLoader({ movieId }: { movieId: string }) {
  return (
    <Archives
      movie={await getMovie(movieId)}
      reviewedMovies={await getReviewedMovies()}
    />
  );
}
