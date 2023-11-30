"use client";

export default function QuartierSelectorToggler({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <div className="border-retro-gray flex grow items-center justify-center gap-1 border lg:px-12 lg:py-2">
      <div className="font-medium uppercase leading-7 lg:text-xl lg:leading-6">
        par quartiers
      </div>{" "}
      <div className="flex cursor-pointer items-center" onClick={toggleOpen}>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </div>
    </div>
  );
}
function ArrowUp() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(-0.642962 -0.765898 0.738864 -0.673855 13.8796 8.11853)"
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(0.642962 -0.765898 -0.738864 -0.673855 0 8.11853)"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(0.642962 0.765898 -0.738864 0.673855 0 2)"
        stroke="black"
        strokeWidth="1.5"
      />
      <line
        y1="-0.75"
        x2="10.6"
        y2="-0.75"
        transform="matrix(-0.642962 0.765898 0.738864 0.673855 13.8796 2)"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  );
}
