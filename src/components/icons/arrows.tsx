import clsx from "clsx";

export function LeftArrow({
  small,
  onClick,
}: {
  small?: boolean;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={clsx(
        "h-14px w-14px cursor-pointer fill-retro-gray stroke-retro-gray",
        { "lg:h-18px lg:w-18px": !(small ?? false) },
      )}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M-0.000488675 9L12.7495 1.20577L12.7495 16.7942L-0.000488675 9Z" />
    </svg>
  );
}

export function RightArrow({
  small,
  onClick,
}: {
  small?: boolean;
  onClick?: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      className={clsx(
        "h-14px w-14px cursor-pointer fill-retro-gray stroke-retro-gray",
        { "lg:h-18px lg:w-18px": !(small ?? false) },
      )}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.9141 9L5.16406 16.7942L5.16406 1.20577L17.9141 9Z" />
    </svg>
  );
}
