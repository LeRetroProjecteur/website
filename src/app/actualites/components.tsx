import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

import PageHeader from "@/components/layout/page-header";
import {
  SectionTitle,
  SousTitre1,
  SubsectionTitle,
} from "@/components/typography/typography";
import { blurProps } from "@/lib/util";

export function ArticleLayout({
  info,
  children,
}: {
  info: {
    title: string;
    type: string;
    icon: StaticImageData;
    date: string;
  };
  children?: ReactNode;
}) {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>{info.title}</SousTitre1>
      </PageHeader>
      <ThreeColumnLayout>
        <div className="invisible h-0 self-center justify-self-center px-30px text-center 3col:visible 3col:h-auto">
          <div className="font-semibold uppercase text-retro-gray lg:text-20px lg:leading-18px">
            {info.type}
          </div>
        </div>
        <div className="pb-20px lg:border-r lg:pr-20px">
          <div className="lg:border-b lg:pb-20px">
            <Image
              src={info.icon}
              alt={info.title}
              className="h-auto w-full"
              {...blurProps}
            />
          </div>
        </div>
        <div className="invisible h-0 self-center justify-self-center px-30px text-center lg:visible lg:h-auto">
          <div className="font-semibold uppercase text-retro-gray lg:text-20px lg:leading-18px 3col:invisible 3col:h-0">
            {info.type}
          </div>
          <div className="font-semibold uppercase text-retro-gray lg:text-20px lg:leading-18px">
            Publié le {info.date}
          </div>
        </div>
        {children}
      </ThreeColumnLayout>
    </>
  );
}

export function ThreeColumnLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="mx-auto my-0 block max-w-[32rem] wide-article:max-w-[37.5rem] lg:m-0 lg:grid lg:max-w-none lg:grid-cols-[0_32rem_1fr] lg:pl-20px 3col:grid-cols-[minmax(13rem,_1fr)_minmax(30rem,_40rem)_minmax(13rem,_1fr)] 3col:pl-0">
      {children}
      <div />
      <div className="pt-15px lg:border-r lg:pr-20px lg:pt-20px">
        <div className="border-b" />
      </div>
      <div />
      <div />
      <div className="hidden min-h-100px border-r lg:block" />
      <div className="min-h-100px w-1/2 border-r lg:hidden" />
      <div />
    </div>
  );
}

export function MiddleColumn({ children }: { children: ReactNode }) {
  return (
    <>
      <div />
      <div className="lg:border-r lg:pr-20px">
        <div>{children}</div>
      </div>
      <div />
    </>
  );
}

export function MiddleColumnImageAndRightColumnCaption({
  image,
  alt,
  caption,
}: {
  image: StaticImageData;
  alt: string;
  caption: ReactNode;
}) {
  return (
    <>
      <div />
      <div className="lg:border-r lg:pr-20px">
        <div className="py-10px lg:py-30px">
          <Image src={image} alt={alt} className="w-full" {...blurProps} />
        </div>
      </div>
      <div className="self-end lg:pl-20px">
        <div className="pb-10px text-center text-14px font-semibold uppercase leading-17px text-retro-gray lg:pb-30px lg:text-left lg:text-16px lg:leading-19px">
          {caption}
        </div>
      </div>
    </>
  );
}

export function MiddleColumnImageAndTitle({
  image,
  alt,
  title,
}: {
  image: StaticImageData;
  alt: string;
  title: ReactNode;
}) {
  return (
    <div className="pb-10px">
      <Image src={image} alt={alt} className="w-full pb-10px" {...blurProps} />
      <SubsectionTitle>{title}</SubsectionTitle>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <div className="group pb-30px last:pb-0 lg:pb-50px last:lg:pb-0">
      {children}
    </div>
  );
}

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="pb-15px lg:pb-20px">
      <SectionTitle>{children}</SectionTitle>
    </div>
  );
}

export function Question({ children }: { children: ReactNode }) {
  return (
    <div className="pt-20px">
      <strong>{children}</strong>
    </div>
  );
}
export function Answer({ children }: { children: ReactNode }) {
  return <div className="space-y-5px pt-5px">{children}</div>;
}
