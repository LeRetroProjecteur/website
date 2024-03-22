import clsx from "clsx";
import { ReactNode } from "react";

export function TextBox({
  children,
  textColor,
  borderColor,
  bgColor,
  onClick, // Add onClick as a prop
}: {
  children: ReactNode;
  textColor?: "retro-gray" | "retro-black" | "retro-dark-blue";
  borderColor?: "retro-gray" | "retro-black" | "retro-dark-blue";
  bgColor?: "retro-blue";
  onClick?: () => void; // Define the type for onClick
}) {
  return (
    <div
      className={clsx(
        "flex cursor-pointer items-center justify-center border py-9px",
        {
          "bg-retro-blue": bgColor === "retro-blue",
        },
        {
          "border-retro-gray": borderColor === "retro-gray",
          "border-retro-black": borderColor === "retro-black",
          "border-retro-dark-blue": borderColor === "retro-dark-blue",
        },
      )}
      onClick={onClick} // Add onClick handler to the div
    >
      <div
        className={clsx("grow whitespace-break-spaces text-center", {
          "text-retro-gray": textColor === "retro-gray",
          "text-retro-black": textColor === "retro-black",
          "text-retro-dark-blue": textColor === "retro-dark-blue",
        })}
      >
        <div className="text-20px font-medium uppercase leading-21px">
          {children}
        </div>
      </div>
    </div>
  );
}
