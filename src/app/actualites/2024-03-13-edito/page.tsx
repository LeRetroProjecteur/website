import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

import { FirstRow, MiddleColumn, ThreeColumnLayout } from "../components";
import { info } from "./pageInfo";

export const metadata: Metadata = {
  title: info.title,
};

export default function Page() {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>{info.title}</SousTitre1>
      </PageHeader>
      <ThreeColumnLayout>
        <FirstRow
          type={info.type}
          date={info.date}
          image={info.icon}
          alt={info.title}
        />
        <MiddleColumn>
          <BodyCopy>
            Aujourd’hui débute le festival de la Cinémathèque française,
            organisé au sein même de la fameuse institution mais également dans
            plusieurs autres salles de la capitale. Peter Weir est l’invité
            d’honneur de cette édition. La sélection est également composée
            d’une magnifique sélection de films récemment restaurés ainsi que
            d’honneurs rendus à l’actrice japonaise Machiko Kyō, à la cinéaste
            new-yorkaise Nancy Savoca ou encore à la réalisatrice hongroise
            Judit Elek.
          </BodyCopy>
          <br />
          <BodyCopy>
            Malheureusement, le lancement de cette édition est entaché par de
            vives tensions entre la Cinémathèque et certaines salles de proche
            banlieue qui n’ont pas été invitées à participer à l’événement. Dans
            un{" "}
            <a
              target="_blank"
              className="underline"
              href="http://meliesmontreuil.fr/public/fichiers/programmes-pdf/181-mars5656d.pdf"
            >
              édito publié la semaine dernière
            </a>
            , le président du Méliès à Montreuil dénonce un repli sur soi de la
            vénérable institution qui ne semble plus souhaiter valoriser ses
            ressources incroyables en dehors de ses murs.
          </BodyCopy>
          <br />
          <BodyCopy>
            Que les salles de la proche banlieue soient les premières à être
            touchées par une telle évolution est particulièrement regrettable,
            accentuant l’impression d’élitisme et d’aristocratisme que donne
            parfois la mise en avant du «&nbsp;patrimoine&nbsp;»
            cinématographique. Au-delà de l’évident enjeu de conservation de
            vieux films (pour lequel la Cinémathèque fait un travail unique et
            précieux), la question posée est celle du rapport entretenu au
            présent avec ce cinéma du passé. Nous avons créé Le Rétro Projecteur
            précisément pour en faciliter l’accès et parce que nous sommes
            convaincus que les vieux films n’auront plus rien à nous dire s’ils
            demeurent le seul apanage d’un entre-soi de sachants...
          </BodyCopy>
        </MiddleColumn>
      </ThreeColumnLayout>
    </>
  );
}
