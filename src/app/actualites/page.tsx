import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import {
  ThumbnailGrid,
  ThumbnailWithBlurb,
} from "@/components/layout/thumbnails";
import { SousTitre1 } from "@/components/typography/typography";

export const metadata: Metadata = {
  title: "Actualités | Le Rétro Projecteur - Cinéma de patrimoine à Paris",
};

const chroniques = [
  {
    titre: "Monte-Cristo au cinéma",
    slug: "chronique-monte-cristo",
    date: "10/07/2024",
    type: "coup de projecteur",
  },
  {
    titre: "Entretien avec Gaël Teicher",
    slug: "entretien-gael-teicher",
    date: "03/07/2024",
    type: "coup de projecteur",
  },
  {
    titre: "Entretien avec l'équipe du Campus Film Festival 2024",
    slug: "campus-film-festival-2024",
    date: "23/04/2024",
    type: "coup de projecteur",
  },
  {
    titre: "Le cinéma du passé se vit au présent",
    slug: "2024-03-13-edito",
    date: "13/03/2024",
    type: "édito",
  },
  {
    titre: "Top 2023 : Vos plus belles découvertes de l'année",
    slug: "top-2023",
    date: "22/12/2023",
    type: "retro-spective",
  },
  {
    titre: "Retour sur le Festival Lumière 2023",
    slug: "festival-lumiere-2023",
    date: "31/10/2023",
    type: "retour de festival",
  },
  {
    titre: "Rétrospective 2022 — Nos meilleures séances patrimoine",
    slug: "top-2022",
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
      {chroniques.map(({ titre, slug, date, type }) => (
        <ThumbnailWithBlurb
          className="group"
          key={slug}
          link={`/actualites/${slug}`}
          image={{
            src: `./${slug}/img/icon.jpg`,
            alt: titre,
            width: 1200,
            height: 675,
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
