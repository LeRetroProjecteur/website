import { Metadata } from "next";

import { getMovies } from "@/lib/movies";

import MaRetro2024 from "./ma-retro-2024";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sondage Top 2024",
};

export default function SubmitScreeningsPage() {
  const allMovies = getMovies();

  return <MaRetro2024 allMoviesPromise={allMovies} />;
}
