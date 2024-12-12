import { Metadata } from "next";

import { getAllMovies } from "@/lib/movies";
import { getTheaters } from "@/lib/theaters";

import SubmitScreenings from "./rajouter-des-seances";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rajouter des séances",
};

export default function SubmitScreeningsPage() {
  const allMovies = getAllMovies();
  const allTheaters = getTheaters();

  return (
    <SubmitScreenings
      allMoviesPromise={allMovies}
      allTheatersPromise={allTheaters}
    />
  );
}
