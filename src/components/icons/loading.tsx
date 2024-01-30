import clsx from "clsx";
import Image from "next/image";
import { ReactNode, Suspense } from "react";

import loading from "../../assets/loading.gif";

export function Loading({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center justify-center")}>
      <Image
        src={loading}
        alt="loading"
        className="max-h-full w-auto max-w-full"
      />
    </div>
  );
}

export function SuspenseWithLoading({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Suspense fallback={<Loading className={className} />}>{children}</Suspense>
  );
}
