import PageHeader from "@/components/layout/page-header";
import { SousTitre1, ThumbnailCopy } from "@/components/typography/typography";

import lumiereIcon from "./festival-lumiere-2023/img/icon.jpg";
import top2022 from "./top-2022/img/icon.jpg";

const chroniques = [
  {
    titre: "Top 2023 : Vos plus belles découvertes de l’année",
    slug: "top-2023-sondage",
    image: lumiereIcon,
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
    image: top2022,
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
    <div className="grid grid-cols-thumbnails-sm gap-15px lg:grid-cols-thumbnails-lg lg:gap-20px">
      {chroniques.map(({ titre, slug, image, date, type }) => (
        <ThumbnailCopy
          key={slug}
          link={`/actualites/${slug}`}
          image={image}
          alt={titre}
        >
          {date} • {type}
          <br />
          <span className="text-retro-black">{titre}</span>
        </ThumbnailCopy>
      ))}
    </div>
  );
}
