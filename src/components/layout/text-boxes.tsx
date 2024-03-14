import clsx from "clsx";
import { ReactNode } from "react";

export function TextBox({
  children,
  textColor,
  borderColor,
  bgColor,
}: {
  children: ReactNode;
  textColor?: string;
  borderColor?: string;
  bgColor?: string;
}) {
  bgColor = "bg-" + bgColor;
  textColor = "text-" + textColor;
  borderColor = "border-" + borderColor;
  return (
    <div
      className={clsx(
        "flex items-center justify-center border py-9px",
        bgColor,
        borderColor,
      )}
    >
      <div
        className={clsx("grow whitespace-break-spaces text-center", textColor)}
      >
        <div className="text-20px font-medium uppercase leading-21px">
          {children}
        </div>
      </div>
    </div>
  );
}
