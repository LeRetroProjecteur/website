"use client";

import clsx from "clsx";
import { every, orderBy, take, toPairs, without } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MutableRefObject,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { create } from "zustand";

import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader, { FixedHeader } from "@/components/layout/page-header";
import { MetaCopy } from "@/components/typography/typography";
import { SearchMovie, SearchTheater } from "@/lib/types";
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
const setSearchTerm = (searchTerm: string) =>
  useRechercheStore.setState({ searchTerm });

const toggleTag = (tag: string) =>
  useRechercheStore.setState((s) => ({
    tags: s.tags.includes(tag) ? without(s.tags, tag) : [...s.tags, tag],
  }));

export default function Recherche({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  useEffect(() => {
    setSelected(undefined);
    setSearchTerm("");
  }, []);

  const onChangeSearchTerm = useCallback((s: string) => {
    setSelected(undefined);
    setSearchTerm(s);
  }, []);

  const searchTerm = useRechercheStore((s) => s.searchTerm);

  return (
    <>
      <FixedHeader disableBelowPadding className="lg:border-b lg:pb-20px">
        <div className="lg:hidden">
          <PageHeader text={"recherche"} />
        </div>
        <div className="flex flex-col lg:pl-20px">
          <RetroInput
            customTypography
            value={searchTerm}
            setValue={onChangeSearchTerm}
            placeholder="Recherchez un film"
            leftAlignPlaceholder
            transparentPlaceholder
            grayText
            customHeight
            className="h-50px text-21px font-medium uppercase lg:h-57px lg:text-29px lg:tracking-[-0.01em]"
          />
        </div>
      </FixedHeader>
      <div className="flex grow flex-col lg:py-0 lg:pl-20px">
        <div className="flex hidden flex-wrap gap-10px py-10px lg:gap-x-20px lg:gap-y-16px lg:py-20px">
          {toPairs(TAG_MAP).map(([tag, displayTag]) => (
            <Tag key={tag} {...{ tag, displayTag }} />
          ))}
        </div>
        <SuspenseWithLoading
          hideLoading={searchTerm.length === 0}
          className="flex grow items-center justify-center pt-15px"
        >
          <Results
            nb_results={50}
            extraClass={
              "border-b py-10px pl-5px text-15px font-medium uppercase leading-20px lg:py-18px lg:pl-10px lg:text-18px lg:leading-21px lg:tracking-[0.01em] lg:first:border-t-0"
            }
            searchTerm={searchTerm}
            allDataPromise={allMoviesPromise}
          />
        </SuspenseWithLoading>
      </div>
    </>
  );
}

export function Results({
  allDataPromise,
  searchTerm,
  nb_results,
  extraClass,
  onClick,
}: {
  allDataPromise: Promise<SearchMovie[]>;
  searchTerm: string;
  nb_results: number;
  extraClass?: string;
  onClick?: (movie: SearchMovie) => void;
}) {
  const selected = useRechercheStore((s) => s.selected);
  const tags = useRechercheStore((s) => s.tags);
  const allData = use(allDataPromise);
  const allDataFields = useMemo(() => {
    return orderBy(
      allData.map<[SearchMovie, string[]]>((elem) => [
        elem,
        getFields(getMovieInfoString(elem)),
      ]),
      ([elem]) => elem.relevance_score,
      "desc",
    );
  }, [allData]);
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
            allDataFields
              .filter(
                ([_, fields]) =>
                  stringMatchFields(keywords, fields) &&
                  (tags.length === 0 || every(tags, () => true)),
              )
              .map(([elem]) => elem),
            nb_results,
          )
        : [],
    [allDataFields, searchTerm, keywords, tags, nb_results],
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
                onClick={
                  onClick != null
                    ? (e) => {
                        onClick(movie);
                        e.preventDefault();
                      }
                    : undefined
                }
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

function Tag({ tag, displayTag }: { tag: string; displayTag: string }) {
  const onClick = useCallback(() => toggleTag(tag), [tag]);
  const enabled = useRechercheStore((s) => s.tags.includes(tag));
  return (
    <div
      onClick={onClick}
      className={clsx(
        { "line-through": !enabled },
        "cursor-pointer rounded-2xl bg-retro-gray px-12px py-6px text-19px font-medium uppercase leading-20px text-white lg:px-12px lg:text-20px lg:tracking-[-0.02em]",
      )}
    >
      {displayTag}
    </div>
  );
}

export function TheaterSearchResults({
  allDataPromise,
  searchTerm,
  nb_results,
  extraClass,
  onClick,
}: {
  allDataPromise: Promise<SearchTheater[]>;
  searchTerm: string;
  nb_results: number;
  extraClass?: string;
  onClick?: (theater: SearchTheater) => void;
}) {
  const selected = useRechercheStore((s) => s.selected);
  const tags = useRechercheStore((s) => s.tags);
  const allData = use(allDataPromise);
  const allDataFields = useMemo(() => {
    return orderBy(
      allData.map<[SearchTheater, string[]]>((theater) => [
        theater,
        getFields(theater.name),
      ]),
      ([theater]) => theater.name,
      "desc",
    );
  }, [allData]);
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
            allDataFields
              .filter(
                ([_, fields]) =>
                  stringMatchFields(keywords, fields) &&
                  (tags.length === 0 || every(tags, () => true)),
              )
              .map(([movie]) => movie),
            nb_results,
          )
        : [],
    [allDataFields, searchTerm, keywords, tags, nb_results],
  );

  const router = useRouter();

  useEffect(() => {
    const keydown = (ev: KeyboardEvent) => {
      const selected = useRechercheStore.getState().selected;
      if (ev.key === "ArrowDown") {
        setSelected(Math.min((selected ?? -1) + 1, filtered.length - 1));
      } else if (ev.key === "ArrowUp") {
        setSelected(Math.max((selected ?? filtered.length) - 1, 0));
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
            {filtered.map((theater, i) => (
              <Link
                onClick={
                  onClick != null
                    ? (e) => {
                        onClick(theater);
                        e.preventDefault();
                      }
                    : undefined
                }
                ref={selected === i ? selectedRef : null}
                key={theater.theater_id}
                href=""
                className={clsx(
                  {
                    "lg:bg-retro-pale-green": i === selected,
                    "lg:even:bg-white": i !== selected,
                  },
                  "even:bg-retro-pale-green lg:hover:bg-retro-pale-green",
                  extraClass,
                )}
              >
                {theater.name}
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
