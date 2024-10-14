import { Metadata } from "next";

import { getMovies } from "@/lib/movies";
import { getTheaters } from "@/lib/theaters";

import SubmitScreenings from "./submit-screenings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rajouter des séances",
};

export default function SubmitScreeningsPage() {
  const allMovies = getMovies();
  const allTheaters = getTheaters();

  return (
    <SubmitScreenings
      allMoviesPromise={allMovies}
      allTheatersPromise={allTheaters}
    />
  );
}
