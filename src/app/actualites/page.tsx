import Image from "next/image";
import Link from "next/link";

import FixedHeader from "@/components/layout/fixed-header";
import PageHeader from "@/components/layout/page-header";
import { MetaCopy, SousTitre1 } from "@/components/typography/typography";

import lumiereIcon from "./festival-lumiere-2023/img/icon.jpg";
import top2022 from "./top-2022/img/icon.jpg";

const chroniques = [
  {
    titre: "Top 2023 : Vos plus belles découvertes de l’année",
    slug: "top-2023-sondage",
    image: lumiereIcon,
    date: "22/12/2023",
    type: "chronique",
  },
  {
    titre: "Retour sur le Festival Lumière 2023",
    slug: "festival-lumiere-2023",
    image: lumiereIcon,
    date: "31/10/2023",
    type: "chronique",
  },
  {
    titre: "Rétrospective 2022 — Nos meilleures séances patrimoine",
    slug: "top-2022",
    image: top2022,
    date: "02/01/2023",
    type: "chronique",
  },
];

export default function AProposPage() {
  return (
    <div className="flex grow flex-col">
      <FixedHeader className="flex flex-col">
        <div className="lg:pb-20px">
          <PageHeader text={"à propos"} />
        </div>
        <div className="flex items-center justify-center border-b py-14px lg:border-t lg:bg-retro-green lg:pl-20px lg:pr-10px">
          <SousTitre1>
            Nos chroniques, les retrospectives phares, etc
          </SousTitre1>
        </div>
      </FixedHeader>
      <div className="gap-25px flex flex-col pb-25px pt-17px lg:flex-row lg:flex-wrap lg:gap-20px lg:pl-20px">
        {chroniques.map(({ titre, slug, image, date, type }) => (
          <div
            key={slug}
            className="lg:min-w-340px lg:grow lg:basis-0 lg:gap-12px"
          >
            <Link
              key={slug}
              href={`/actualites/${slug}`}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-10px">
                <Image src={image} alt={titre} className="h-auto w-full" />
                <div className="flex justify-between gap-10px">
                  <div>
                    <MetaCopy>
                      {type} • <span className="text-retro-black">{titre}</span>
                    </MetaCopy>
                  </div>
                  <div>
                    <MetaCopy>{date}</MetaCopy>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {[...Array(chroniques.length % 4)].map((_, i) => (
          <div className="hidden min-w-340px grow basis-0 lg:flex" key={i} />
        ))}
      </div>
    </div>
  );
}
