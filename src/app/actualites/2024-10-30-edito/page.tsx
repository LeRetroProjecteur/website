import { Metadata } from "next";

import { ArticleLayout, MiddleColumn } from "@/components/articles/articles";
import { BodyCopy } from "@/components/typography/typography";

import { info } from "./pageInfo";

export const metadata: Metadata = {
  title: info.title,
};

export default function Page() {
  return (
    <ArticleLayout info={info}>
      <MiddleColumn>
        <BodyCopy>
          Le monde des cinémas art et essai de Paris est en émoi. La cause en
          est un conflit plus ou moins ouvert entre le géant de l’exploitation
          UGC et plusieurs salles de la capitale, conflit ayant scandaleusement
          fait pour uniques victimes certains des employés les plus précaires de
          ces dernières (caissiers, ouvreurs, projectionnistes). Comme le résume
          un{" "}
          <a
            target="_blank"
            className="underline"
            href="https://www.liberation.fr/culture/cinema/limiter-la-carte-illimitee-soupconnant-des-fraudes-le-mastodonte-ugc-veut-faire-payer-les-cinemas-independants-20241028_FW6C27SPOVAHDKLHXDS7AV6RTQ"
          >
            article dans <em>Libération</em>
          </a>
          , UGC dénonce un usage frauduleux de sa fameuse carte « illimité » par
          ces employés ayant bénéficié aux petits exploitants et distributeurs.
          Que cette pression du grand groupe ait aussi rapidement abouti à la
          mise à pied de salariés révèle la profonde asymétrie à l’œuvre dans la
          relation entre UGC et les salles indépendantes.
          <br />
          <br />
          Paris est riche d’un maillage de petites salles de cinéma absolument
          unique au monde, salles dont la stimulante programmation est la raison
          d’être d’un projet comme <em>Le Rétro Projecteur</em>. S’il ne s’agit
          pas ici d’incriminer unilatéralement l’existence même de la carte
          illimité (qui a formé une génération de cinéphiles, à commencer par
          plusieurs membres de notre propre rédaction), reste à espérer que de
          nouvelles solutions seront inventées pour que les salles dites «
          indépendantes » puissent réellement le demeurer. Et pour que les
          employés de ces lieux que l’on aime tant ne soient pas de simples
          fusibles qu’un groupe pour lequel ils ne travaillent même pas puisse
          faire sauter selon son bon vouloir.
        </BodyCopy>
      </MiddleColumn>
    </ArticleLayout>
  );
}
