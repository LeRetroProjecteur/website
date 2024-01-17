import { getMovies } from "@/lib/movies";

import Recherche from "./recherche";

export default function RecherchePage() {
  const allMovies = getMovies();

  return <Recherche allMoviesPromise={allMovies} />;
}
