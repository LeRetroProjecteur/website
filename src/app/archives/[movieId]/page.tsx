import { getMovie } from "@/lib/movies";

import Archives from "./archives";

export const dynamic = "force-static";
export const revalidate = 1;

export default async function ArchivesPage({
  params: { movieId },
}: {
  params: { movieId: string };
}) {
  return <Archives movie={await getMovie(movieId)} />;
}
