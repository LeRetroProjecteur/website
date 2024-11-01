import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import {
  ThumbnailGrid,
  ThumbnailWithBlurb,
} from "@/components/layout/thumbnails";
import { SousTitre1 } from "@/components/typography/typography";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Nos dernières chroniques sur l'actualité des ressorties cinéma à Paris",
};

const chroniques = [
  {
    slug: "2024-10-30-edito",
  },
  {
    slug: "chronique-monte-cristo",
  },
  {
    slug: "entretien-gael-teicher",
  },
  {
    slug: "campus-film-festival-2024",
  },
  {
    slug: "2024-03-13-edito",
  },
  {
    slug: "top-2023",
  },
  {
    slug: "festival-lumiere-2023",
  },
  {
    slug: "top-2022",
  },
];

export default function ActualitesPage() {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>Nos dernières chroniques</SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <ActualitesThumbnails />
      </div>
    </>
  );
}

async function ActualitesThumbnails() {
  const thumbnails = await Promise.all(
    chroniques.map(async ({ slug }) => {
      const page = await import(`./${slug}/pageInfo`);
      if (!page.info) {
        return null;
      }
      return (
        <ThumbnailWithBlurb
          className="group"
          key={slug}
          link={`/actualites/${slug}`}
          image={{
            src: page.info.icon,
            alt: page.info.title,
            width: 1200,
            height: 675,
          }}
        >
          <div>
            {page.info.date} • {page.info.type}
          </div>
          <div className="text-retro-black group-hover:underline">
            {page.info.title}
          </div>
        </ThumbnailWithBlurb>
      );
    }),
  );
  return <ThumbnailGrid>{thumbnails.filter(Boolean)}</ThumbnailGrid>;
}
