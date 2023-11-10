"use client";

import { useEffect } from "react";

import { MovieDetail } from "@/lib/types";

export default function SetTitle({ movie }: { movie: MovieDetail }) {
  useEffect(() => {
    document.title = `${movie.title}, ${movie.directors} (${movie.year}) | Le Rétro Projecteur - Cinéma de patrimoine à Paris`;
  }, [movie]);
  return <></>;
}
