import { Metadata } from "next";
import {getMovies} from "@/lib/movies";
import SubmitScreenings from "./submit-screenings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Recherche | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

export default function SubmitScreeningsPage() {
  const allMovies = getMovies();

  return <SubmitScreenings allMoviesPromise={allMovies} />;
}
