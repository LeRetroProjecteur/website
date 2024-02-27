"use client";

import { MutableRefObject } from "react";

import { ButtonCopy } from "@/components/typography/typography";

export default function QuartierSelectorToggler({
  isOpen,
  toggleOpen,
  togglerRef,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
  togglerRef: MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={togglerRef}
      className="flex h-42px grow cursor-pointer items-center justify-center border lg:h-48px lg:w-278px "
      onClick={toggleOpen}
    >
      <div className="flex items-center pr-6px">
        <ButtonCopy>par quartiers</ButtonCopy>
      </div>
      <div className="flex items-center">
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </div>
    </div>
  );
}
function ArrowUp() {
  return (
    <svg
      viewBox="0 0 14 10"
      className="h-10px w-14px stroke-retro-black lg:h-14px lg:w-19px"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(-0.642962 -0.765898 0.738864 -0.673855 13.8796 8.11853)"
        strokeWidth="1.5"
      />
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(0.642962 -0.765898 -0.738864 -0.673855 0 8.11853)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10px w-14px stroke-retro-black lg:h-14px lg:w-19px"
    >
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(0.642962 0.765898 -0.738864 0.673855 0 2)"
        strokeWidth="1.5"
      />
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(-0.642962 0.765898 0.738864 0.673855 13.8796 2)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
