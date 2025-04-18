"use client";

import { TextBox } from "@/components/layout/text-boxes";
import { ButtonCopy } from "@/components/typography/typography";

export default function QuartierSelectorToggler({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <TextBox className="h-42px lg:h-48px" onClick={toggleOpen}>
      <div className="pr-6px">
        <ButtonCopy>Quartiers</ButtonCopy>
      </div>
      <div>{isOpen ? <ArrowUp /> : <ArrowDown />}</div>
    </TextBox>
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
