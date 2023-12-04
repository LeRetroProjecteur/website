"use client";

import { useCallback } from "react";

import { addDays, subDays } from "date-fns";

import { useCalendrierStore } from "@/lib/calendrier-store";
import { formatLundi1Janvier } from "@/lib/util";

export default function DateSelector() {
  const date = useCalendrierStore((s) => s.date);
  return (
    <div className="flex grow items-center justify-center lg:border-y lg:bg-retro-green lg:py-4">
      <LeftArrow />
      <div className="px-2 text-xl/6 font-semibold uppercase text-retro-gray lg:text-3xl/6">
        {formatLundi1Janvier(date)}
      </div>
      <RightArrow />
    </div>
  );
}

function LeftArrow() {
  const date = useCalendrierStore((s) => s.date);
  const setDate = useCalendrierStore((s) => s.setDate);

  const onClick = useCallback(() => {
    setDate(subDays(date, 1));
  }, [date, setDate]);

  return (
    <svg
      className="h-[14px] w-[14px] cursor-pointer fill-retro-gray stroke-retro-gray lg:h-[19px] lg:w-[19px]"
      onClick={onClick}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_34_2838)">
        <path
          d="M12.621 0.0747375V6.32354L2.44036 6.32354L8.35048 1.39775L8.02638 0.627861L7.82302 0.142009L0.311443 6.39081L0.0635986 6.66737L0.0635986 7.38493L7.6705 13.7683L7.8675 13.8953L8.04544 13.4469L8.35684 12.6396L2.4912 7.71382L12.621 7.71382V13.8953H13.8094L13.8094 0.0747375L12.621 0.0747375Z"
          strokeWidth="0.2"
          strokeMiterlimit="10"
        />
        <path
          d="M13.9301 0.0896912L12.7863 0.0896912L12.7863 13.8954H13.9301L13.9301 0.0896912Z"
          strokeWidth="0.23"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_34_2838">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function RightArrow() {
  const date = useCalendrierStore((s) => s.date);
  const setDate = useCalendrierStore((s) => s.setDate);

  const onClick = useCallback(() => {
    setDate(addDays(date, 1));
  }, [date, setDate]);

  return (
    <svg
      className="h-[14px] w-[14px] cursor-pointer  fill-retro-gray stroke-retro-gray lg:h-[19px] lg:w-[19px]"
      onClick={onClick}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_34_2834)">
        <path
          d="M1.37898 13.9253L1.37898 7.67646L11.5596 7.67646L5.64952 12.6023L5.97362 13.3721L6.17698 13.858L13.6886 7.60919L13.9364 7.33263L13.9364 6.61507L6.3295 0.231722L6.1325 0.104654L5.95456 0.553132L5.64317 1.36039L11.5088 6.28618L1.37898 6.28618L1.37898 0.104653L0.190601 0.104653L0.190599 13.9253L1.37898 13.9253Z"
          strokeWidth="0.2"
          strokeMiterlimit="10"
        />
        <path
          d="M0.0698512 13.9103L1.21375 13.9103L1.21375 0.104649L0.0698524 0.104648L0.0698512 13.9103Z"
          strokeWidth="0.23"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_34_2834">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(14 14) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
