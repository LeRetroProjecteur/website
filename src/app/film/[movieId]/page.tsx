import { SuspenseWithLoading } from "@/components/icons/loading";
import { getMovie } from "@/lib/movies";

import Film from "./film";

export default function FilmPage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  return (
    <div className="flex grow flex-col">
      <SuspenseWithLoading grow>
        <FilmPageLoader movieId={movieId} />
      </SuspenseWithLoading>
    </div>
  );
}

async function FilmPageLoader({ movieId }: { movieId: string }) {
  return <Film movie={await getMovie(movieId)} />;
}
