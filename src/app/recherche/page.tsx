import { Metadata } from "next";

import { getMovies } from "@/lib/movies";

import Recherche from "./recherche";

export const metadata: Metadata = {
  title: "Recherche | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

export default function RecherchePage() {
  const allMovies = getMovies();

  return <Recherche allMoviesPromise={allMovies} />;
}
