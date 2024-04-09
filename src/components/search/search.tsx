import clsx from "clsx";
import { every, orderBy, take } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MutableRefObject, use, useEffect, useMemo, useRef } from "react";
import { create } from "zustand";

import { MetaCopy } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";
import {
  TAG_MAP,
  getFields,
  getMovieInfoString,
  stringMatchFields,
} from "@/lib/util";

const useRechercheStore = create<{
  tags: string[];
  selected: number | undefined;
  searchTerm: string;
}>()(() => ({
  tags: Object.keys(TAG_MAP),
  searchTerm: "",
  selected: undefined,
}));
const setSelected = (selected: number | undefined) =>
  useRechercheStore.setState({ selected });

export function Results({
  allMoviesPromise,
  searchTerm,
  nb_results,
  extraClass,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
  searchTerm: string;
  nb_results: number;
  extraClass?: string;
}) {
  const selected = useRechercheStore((s) => s.selected);
  const tags = useRechercheStore((s) => s.tags);
  const allMovies = use(allMoviesPromise);
  const allMoviesFields = useMemo(() => {
    return orderBy(
      allMovies.map<[SearchMovie, string[]]>((movie) => [
        movie,
        getFields(getMovieInfoString(movie)),
      ]),
      ([movie]) => movie.relevance_score,
      "desc",
    );
  }, [allMovies]);
  const keywords = useMemo(() => getFields(searchTerm), [searchTerm]);
  const selectedRef: MutableRefObject<HTMLAnchorElement | null> = useRef(null);

  useEffect(() => {
    const curr = selectedRef.current;
    if (
      curr != null &&
      (curr.getBoundingClientRect().bottom + 100 > window.innerHeight ||
        curr.getBoundingClientRect().top - 100 < 0)
    ) {
      curr.scrollIntoView({ block: "center" });
    }
  }, [selected]);

  const filtered = useMemo(
    () =>
      searchTerm.length > 0
        ? take(
            allMoviesFields
              .filter(
                ([_, fields]) =>
                  stringMatchFields(keywords, fields) &&
                  (tags.length === 0 || every(tags, () => true)),
              )
              .map(([movie]) => movie),
            nb_results,
          )
        : [],
    [allMoviesFields, searchTerm, keywords, tags, nb_results],
  );

  const router = useRouter();

  useEffect(() => {
    const keydown = (ev: KeyboardEvent) => {
      const selected = useRechercheStore.getState().selected;
      if (ev.key === "ArrowDown") {
        setSelected(Math.min((selected ?? -1) + 1, filtered.length - 1));
      } else if (ev.key === "ArrowUp") {
        setSelected(Math.max((selected ?? filtered.length) - 1, 0));
      } else if (ev.key === "Enter" && selected != null) {
        router.push(`/film/${filtered[selected].id}`);
      }
    };

    addEventListener("keydown", keydown);
    return () => removeEventListener("keydown", keydown);
  }, [filtered, router]);

  return (
    searchTerm.length > 0 && (
      <div className="flex grow flex-col">
        {filtered.length > 0 ? (
          <>
            {filtered.map((movie, i) => (
              <Link
                ref={selected === i ? selectedRef : null}
                key={movie.id}
                href={`/film/${movie.id}`}
                className={clsx(
                  {
                    "lg:bg-retro-pale-green": i === selected,
                    "lg:even:bg-white": i !== selected,
                  },
                  "even:bg-retro-pale-green lg:hover:bg-retro-pale-green",
                  extraClass,
                )}
              >
                <u>{movie.title}</u>, {movie.directors} ({movie.year})
              </Link>
            ))}
            <div className="min-h-100px w-1/2 grow border-r lg:hidden" />
          </>
        ) : (
          <div className="pt-15px lg:pt-20px">
            <MetaCopy>
              Désolé, nous n&apos;avons rien trouvé qui corresponde à votre
              recherche !
            </MetaCopy>
          </div>
        )}
      </div>
    )
  );
}
