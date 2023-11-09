import { sortBy } from "lodash-es";
import { Suspense } from "react";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

import { getReviewedMovies } from "@/lib/movies";
import { Movie, Review } from "@/lib/types";
import { safeDate } from "@/lib/util";

export const dynamic = "force-dynamic";

export default function Coeur() {
  const reviewedMovies = getReviewedMovies();

  return (
    <>
      <h2>Archives&nbsp;: Nos Coups de Cœur</h2>
      <table id="userdata" className="center">
        <tbody>
          <Suspense
            fallback={[...Array(20)].map((_, i) => (
              <tr key={i}>
                <td>&nbsp;</td>
              </tr>
            ))}
          >
            <CoeurLoaded reviewedMovies={reviewedMovies} />
          </Suspense>
        </tbody>
      </table>
      <span id="cdc"></span>
    </>
  );
}

async function CoeurLoaded({
  reviewedMovies,
}: {
  reviewedMovies: Promise<Review[]>;
}) {
  const reviews = (await reviewedMovies)
    .filter((review) => review?.category === "COUP DE CŒUR")
    .map((review) => ({
      ...review,
      review_date: review.review_date.replaceAll("_", "-"),
    }));

  return sortBy(
    reviews,
    (review) => -safeDate(review.review_date).valueOf(),
  ).map((movie) => (
    <tr key={movie.id}>
      <td>
        Critique du{" "}
        {format(safeDate(movie.review_date), "d MMMM y", { locale: fr })} :{" "}
        <a href={`/details?id=${movie.id}`}>
          <b>{movie.title}</b>, {movie.directors} ({movie.year})
        </a>
      </td>
    </tr>
  ));
}
