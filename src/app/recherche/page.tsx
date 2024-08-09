import { Metadata } from "next";

import { getMovies } from "@/lib/movies";

import Recherche from "./recherche";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recherche",
};

export default function RecherchePage() {
  const allMovies = getMovies();

  return <Recherche allMoviesPromise={allMovies} />;
}
