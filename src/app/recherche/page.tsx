import { setTimeout } from "timers/promises";

import { getMovies } from "@/lib/movies";

import Recherche from "./recherche";

export default function RecherchePage() {
  const allMovies = getMovies();

  return (
    <Recherche allMoviesPromise={setTimeout(5000).then(() => allMovies)} />
  );
}
