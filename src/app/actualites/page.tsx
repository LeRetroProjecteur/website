import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import {
  ThumbnailGrid,
  ThumbnailWithBlurb,
} from "@/components/layout/thumbnails";
import { SousTitre1 } from "@/components/typography/typography";

import lumiereIcon from "./festival-lumiere-2023/img/icon.jpg";
import top2022Icon from "./top-2022/img/icon.jpg";
import top2023Icon from "./top-2023/icon.jpg";

export const metadata: Metadata = {
  title: "Actualités | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

const chroniques = [
  {
    titre: "Top 2023 : Vos plus belles découvertes de l'année",
    slug: "top-2023",
    image: top2023Icon,
    date: "22/12/2023",
    type: "retro-spective",
  },
  {
    titre: "Retour sur le Festival Lumière 2023",
    slug: "festival-lumiere-2023",
    image: lumiereIcon,
    date: "31/10/2023",
    type: "retour de festival",
  },
  {
    titre: "Rétrospective 2022 — Nos meilleures séances patrimoine",
    slug: "top-2022",
    image: top2022Icon,
    date: "02/01/2023",
    type: "retro-spective",
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

function ActualitesThumbnails() {
  return (
    <ThumbnailGrid>
      {chroniques.map(({ titre, slug, image, date, type }) => (
        <ThumbnailWithBlurb
          key={slug}
          link={`/actualites/${slug}`}
          image={{
            src: image,
            alt: titre,
          }}
        >
          <div>
            {date} • {type}
          </div>
          <div className="text-retro-black">{titre}</div>
        </ThumbnailWithBlurb>
      ))}
    </ThumbnailGrid>
  );
}
