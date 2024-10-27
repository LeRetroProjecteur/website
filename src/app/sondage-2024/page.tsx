import { Metadata } from "next";

import { getMovies } from "@/lib/movies";

import Sondage2024 from "./sondage-2024";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sondage Top 2024",
};

export default function SubmitScreeningsPage() {
  const allMovies = getMovies();

  return <Sondage2024 allMoviesPromise={allMovies} />;
}
