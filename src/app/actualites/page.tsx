import { Metadata } from "next";

import chroniqueMonteCristo from "@/app/actualites/chronique-monte-cristo/img/icon.jpg";
import PageHeader from "@/components/layout/page-header";
import {
  ThumbnailGrid,
  ThumbnailWithBlurb,
} from "@/components/layout/thumbnails";
import { SousTitre1 } from "@/components/typography/typography";

import edito20240313 from "./2024-03-13-edito/img/icon.jpg";
import campusFilmFestival2024 from "./campus-film-festival-2024/img/icon.jpg";
import entretienGaelTeicher from "./entretien-gael-teicher/img/icon.jpg";
import lumiereIcon from "./festival-lumiere-2023/img/icon.jpg";
import top2022Icon from "./top-2022/img/icon.jpg";
import top2023Icon from "./top-2023/img/icon.jpg";

export const metadata: Metadata = {
  title: "Actualités",
};

const chroniques = [
  {
    titre: "Monte-Cristo au cinéma",
    slug: "chronique-monte-cristo",
    image: chroniqueMonteCristo,
    date: "10/07/2024",
    type: "coup de projecteur",
  },
  {
    titre: "Entretien avec Gaël Teicher",
    slug: "entretien-gael-teicher",
    image: entretienGaelTeicher,
    date: "03/07/2024",
    type: "coup de projecteur",
  },
  {
    titre: "Entretien avec l'équipe du Campus Film Festival 2024",
    slug: "campus-film-festival-2024",
    image: campusFilmFestival2024,
    date: "23/04/2024",
    type: "coup de projecteur",
  },
  {
    titre: "Le cinéma du passé se vit au présent",
    slug: "2024-03-13-edito",
    image: edito20240313,
    date: "13/03/2024",
    type: "édito",
  },
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
          className="group"
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
          <div className="text-retro-black group-hover:underline">{titre}</div>
        </ThumbnailWithBlurb>
      ))}
    </ThumbnailGrid>
  );
}
