import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

import { BodyCopy } from "@/components/typography/typography";

export function ImageCell({ children }: { children?: ReactNode }) {
  return (
    <div className="pb-15px lg:border-r lg:pb-20px lg:pr-20px lg:pt-5px">
      {children}
    </div>
  );
}

export function TextCell({ children }: { children?: ReactNode }) {
  return (
    <div className="pb-15px lg:pb-20px lg:pl-20px">
      <BodyCopy>{children}</BodyCopy>
    </div>
  );
}

export function ImageAndCaption({
  image,
  alt,
  caption,
}: {
  image: StaticImageData;
  alt: string;
  caption: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10px lg:gap-12px">
      <Image src={image} alt={alt} className="w-full" />
      <div className="text-center text-14px font-semibold uppercase leading-17px text-retro-gray lg:text-left lg:text-16px lg:leading-18px">
        {caption}
      </div>
    </div>
  );
}
