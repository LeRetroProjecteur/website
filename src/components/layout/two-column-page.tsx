import { ReactNode } from "react";

import { SousTitre2 } from "@/components/typography/typography";

export function TwoColumnPage({
  title,
  left,
  right,
  children,
}: {
  title?: ReactNode;
  left: ReactNode;
  right: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex grow flex-col lg:pl-20px">
      {title && (
        <div className="pb-20px">
          <SousTitre2>{title}</SousTitre2>
        </div>
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2 lg:border-r lg:pr-20px">
          {left}
        </div>
        <div className="flex flex-col lg:w-1/2 lg:pl-20px">{right}</div>
      </div>
      {children}
      <div className="min-h-100px w-1/2 grow border-r" />
    </div>
  );
}
