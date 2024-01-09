"use client";

import { ButtonCopy } from "@/components/typography/typography";

export default function QuartierSelectorToggler({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <div
      className="lg:w-278px lg:py-8px flex grow cursor-pointer items-center justify-center border"
      onClick={toggleOpen}
    >
      <div className="pr-6px">
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
      className="h-14px w-10px lg:h-14px lg:w-19px stroke-retro-black"
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
      className="h-14px w-10px lg:h-14px lg:w-19px stroke-retro-black"
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
