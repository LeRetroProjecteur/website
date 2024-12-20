import { Metadata } from "next";

import { getAllMovies } from "@/lib/movies";

import MaRetro2024 from "./ma-retro-2024";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ma Rétrospective 2024",
  description: "Votez pour vos plus belles découvertes cinéma de l'année !",
};

export default function SubmitScreeningsPage() {
  const movies = getAllMovies();
  return <MaRetro2024 allMoviesPromise={movies} />;
}
