import { ReactNode } from "react";

export function TwoColumnPage({
  children1,
  children2,
}: {
  children1: ReactNode;
  children2: ReactNode;
}) {
  return (
    <div className="flex grow flex-col lg:pl-20px">
      <div className="flex grow flex-col lg:flex-row">
        <div className="flex grow flex-col lg:w-1/2 lg:border-r lg:pr-20px">
          {children1}
        </div>
        <div className="flex flex-col pt-27px lg:w-1/2 lg:pl-20px lg:pt-0">
          {children2}
        </div>
      </div>
      <div className="w-1/2 border-r lg:min-h-100px" />
    </div>
  );
}
