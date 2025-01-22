"use client";

import clsx from "clsx";
import { every, orderBy, take, toPairs, without } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefObject, use, useCallback, useEffect, useMemo, useRef } from "react";
import useSWRImmutable from "swr";
import { create } from "zustand";

import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader, { FixedHeader } from "@/components/layout/page-header";
import { MetaCopy } from "@/components/typography/typography";
import { SearchMovie, SearchTheater } from "@/lib/types";
import { TAG_MAP, getFields, stringMatchFields } from "@/lib/util";

import { search } from "./actions";

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

export default function Recherche() {
  useEffect(() => {
    setSelected(undefined);
    setSearchTerm("");
  }, []);
  const onChangeSearchTerm = useCallback((s: string) => {
    setSelected(undefined);
    setSearchTerm(s);
  }, []);
  const searchTerm = useRechercheStore((s) => s.searchTerm);
  const router = useRouter();
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
          <SearchResults
            nbResults={50}
            className={
              "py-10px pl-5px text-15px font-medium uppercase leading-20px lg:py-18px lg:pl-10px lg:text-18px lg:leading-21px lg:tracking-[0.01em] lg:first:border-t-0"
            }
            searchTerm={searchTerm}
            verticalFooter
            onClick={(movie) => {
              router.push(`/film/${movie.id}`);
            }}
          />
        </SuspenseWithLoading>
      </div>
    </>
  );
}

export function SearchResults({
  searchTerm,
  nbResults,
  verticalFooter,
  onClick,
  onClose,
  noResultsText = "Désolé, nous n'avons rien trouvé qui corresponde à votre recherche !",
  noResultsTextSize = "default",
  className,
  lowercase = false,
  altColor = false,
}: {
  searchTerm: string;
  nbResults: number;
  verticalFooter?: boolean;
  onClick?: (movie: SearchMovie) => void;
  onClose?: () => void;
  noResultsText?: string;
  noResultsTextSize?: "default" | "small" | "large";
  className?: string;
  lowercase?: boolean;
  altColor?: boolean;
}) {
  const { data: filtered, isLoading } = useSWRImmutable(
    searchTerm,
    () => search({ searchTerm, nbResults }),
    { fallbackData: [] },
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const selected = useRechercheStore((s) => s.selected);
  const selectedRef: RefObject<HTMLAnchorElement | null> = useRef(null);
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
  useEffect(() => {
    const keydown = (ev: KeyboardEvent) => {
      // Add Escape key handling
      if (ev.key === "Escape" && onClose) {
        onClose();
        return;
      }
      const selected = useRechercheStore.getState().selected;
      if (ev.key === "ArrowDown") {
        setSelected(Math.min((selected ?? -1) + 1, filtered.length - 1));
      } else if (ev.key === "ArrowUp") {
        setSelected(Math.max((selected ?? filtered.length) - 1, 0));
      } else if (ev.key === "Enter" && selected != null) {
        if (filtered[selected]) {
          if (onClick) {
            onClick(filtered[selected]);
          }
        }
      }
    };
    const clickOutside = (ev: MouseEvent) => {
      if (
        onClose &&
        containerRef.current &&
        !containerRef.current.contains(ev.target as Node)
      ) {
        onClose();
      }
    };

    addEventListener("keydown", keydown);
    addEventListener("mousedown", clickOutside); // Changed to mousedown
    return () => {
      removeEventListener("keydown", keydown);
      removeEventListener("mousedown", clickOutside); // Changed to mousedown
    };
  }, [filtered, onClick, onClose]);
  return (
    searchTerm.length > 0 &&
    !isLoading && (
      <div ref={containerRef} className="flex grow flex-col">
        {filtered.length > 0 ? (
          <>
            {filtered.map((elem, i) => (
              <Link
                onClick={
                  onClick != null
                    ? (e) => {
                        onClick(elem);
                        e.preventDefault();
                      }
                    : undefined
                }
                ref={selected === i ? selectedRef : null}
                key={elem.id}
                href=""
                className={clsx(
                  altColor
                    ? {
                        "lg:bg-retro-pale-blue": i === selected,
                        "lg:even:bg-white": i !== selected,
                        "even:bg-retro-pale-blue lg:hover:bg-retro-pale-blue":
                          true,
                      }
                    : {
                        "lg:bg-retro-pale-green": i === selected,
                        "lg:even:bg-white": i !== selected,
                        "even:bg-retro-pale-green lg:hover:bg-retro-pale-green":
                          true,
                      },
                  "border-b",
                  className,
                )}
              >
                <u>{elem.title}</u>, {elem.directors} ({elem.year})
              </Link>
            ))}
            {verticalFooter && (
              <div className="min-h-100px w-1/2 grow border-r lg:hidden" />
            )}
          </>
        ) : (
          <div className="pt-11px lg:pt-13px">
            <MetaCopy lowercase={lowercase} size={noResultsTextSize}>
              {noResultsText}
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
  nbResults,
  extraClass,
  onClick,
}: {
  allDataPromise: Promise<SearchTheater[]>;
  searchTerm: string;
  nbResults: number;
  extraClass?: string;
  onClick?: (theater: SearchTheater) => void;
}) {
  const selected = useRechercheStore((s) => s.selected);
  const tags = useRechercheStore((s) => s.tags);
  const allData = use(allDataPromise);
  const allDataFields = useMemo(() => {
    return orderBy(
      allData.map<[SearchTheater, string[]]>((elem) => [
        elem,
        getFields(elem.name),
      ]),
      ([theater]) => theater.name,
      "desc",
    );
  }, [allData]);
  const keywords = useMemo(() => getFields(searchTerm), [searchTerm]);
  const selectedRef: RefObject<HTMLAnchorElement | null> = useRef(null);
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
            nbResults,
          )
        : [],
    [allDataFields, searchTerm, keywords, tags, nbResults],
  );
  useEffect(() => {
    const keydown = (ev: KeyboardEvent) => {
      const selected = useRechercheStore.getState().selected;
      if (ev.key === "ArrowDown") {
        setSelected(Math.min((selected ?? -1) + 1, filtered.length - 1));
      } else if (ev.key === "ArrowUp") {
        setSelected(Math.max((selected ?? filtered.length) - 1, 0));
      } else if (ev.key === "Enter" && selected != null) {
        if (filtered[selected]) {
          if (onClick) {
            onClick(filtered[selected]);
          }
        }
      }
    };
    addEventListener("keydown", keydown);
    return () => removeEventListener("keydown", keydown);
  }, [filtered, onClick]);
  return (
    searchTerm.length > 0 && (
      <div className="flex grow flex-col">
        {filtered.length > 0 ? (
          <>
            {filtered.map((elem, i) => (
              <Link
                onClick={
                  onClick != null
                    ? (e) => {
                        onClick(elem);
                        e.preventDefault();
                      }
                    : undefined
                }
                ref={selected === i ? selectedRef : null}
                key={elem.theater_id}
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
                {elem.name}
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
