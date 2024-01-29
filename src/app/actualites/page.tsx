import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/layout/page-header";
import { MetaCopy, SousTitre1 } from "@/components/typography/typography";
import { blurProps } from "@/lib/util";

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
      <div className="grid grid-cols-thumbnails-sm gap-25px pt-17px lg:grid-cols-thumbnails-lg lg:gap-20px lg:pl-20px">
        {chroniques.map(({ titre, slug, image, date, type }) => (
          <div key={slug} className="lg:gap-12px">
            <Link
              key={slug}
              href={`/actualites/${slug}`}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-10px">
                <Image
                  src={image}
                  alt={titre}
                  className="h-auto w-full"
                  {...blurProps}
                />
                <div className="flex justify-between gap-10px">
                  <div>
                    <MetaCopy>
                      {date} • {type}
                      <br />
                      <span className="text-retro-black">{titre}</span>
                    </MetaCopy>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
