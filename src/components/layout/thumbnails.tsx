import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import { MetaCopy } from "@/components/typography/typography";
import { blurProps } from "@/lib/util";

export function ThumbnailCopy({
  link,
  image,
  alt,
  children,
}: {
  link: string;
  image: StaticImageData | string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <Link href={link}>
      <div className="flex flex-col gap-10px">
        <Image
          className="h-auto w-full"
          src={image}
          alt={alt}
          width={1200}
          height={675}
          {...blurProps}
        />
        <div className="flex flex-col justify-between gap-10px lg:flex-row lg:gap-20px">
          <MetaCopy>{children}</MetaCopy>
        </div>
      </div>
    </Link>
  );
}

export function ThumbnailGridCopy({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-thumbnails-sm gap-15px lg:grid-cols-thumbnails-lg lg:gap-20px">
      {children}
    </div>
  );
}
