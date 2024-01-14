"use client";

import Link from "next/link";
import { ReactNode } from "react";

import FixedHeader from "@/components/layout/fixed-header";
import PageHeader from "@/components/layout/page-header";
import {
  BodyCopy,
  SousTitre1,
  SousTitre2,
} from "@/components/typography/typography";

export default function AProposPage() {
  return (
    <div className="flex grow flex-col">
      <FixedHeader className="flex flex-col">
        <div className="lg:pb-20px">
          <PageHeader text={"à propos"} />
        </div>
        <div className="flex items-center justify-center border-b py-14px lg:border-t lg:bg-retro-green lg:pl-20px lg:pr-10px">
          <SousTitre1>qui sommes nous ?</SousTitre1>
        </div>
      </FixedHeader>
      <div className="flex flex-col pb-10px lg:flex-row lg:pb-0 lg:pl-20px">
        <div className="lg:w-1/2 lg:pr-20px">
          <div className="py-17px lg:pb-25px lg:pt-0">
            <BodyCopy>
              Le Rétro Projecteur est un média digital, en libre accès, open
              source et à but non lucratif qui se donne pour mission de mettre
              en lumière la programmation en salle du cinéma de patrimoine.
              Croyant à l&apos;existence d&apos;un cinéma aussi résolument
              populaire que politique, le Rétro Projecteur s&apos;engage à
              promouvoir une programmation originale, indépendante et
              enrichissante.
            </BodyCopy>
          </div>
          <div className="flex justify-center border-y bg-retro-green py-15px">
            <SousTitre2>contactez-nous</SousTitre2>
          </div>
          <div className="py-17px lg:pb-0 lg:pt-20px">
            <BodyCopy>
              Une séance manquante, une erreur sur le site, un projet à nous
              proposer ?<br />
              Cinémas, producteurs, indépendants ? Écrivez-nous{" "}
              <a
                href="mailto:contact@leretroprojecteur.com"
                className="underline"
              >
                ici
              </a>{" "}
              !
            </BodyCopy>
          </div>
        </div>
        <div className="lg:w-1/2 lg:border-l lg:pl-20px">
          <div className="flex justify-center border-y bg-retro-green py-15px">
            <SousTitre2>l&apos;équipe du rétro</SousTitre2>
          </div>
          <div>
            <Contributeur>
              Nicolas Guetta-Jeanrenaud
              <br />
              <span className="uppercase">Rédacteur en chef</span>
              <br />
              Retrouvez-moi sur{" "}
              <a
                className="underline"
                href="https://letterboxd.com/nicogj/"
                target="_blank"
              >
                Letterboxd
              </a>
              ,{" "}
              <a
                className="underline"
                href="https://twitter.com/nicogj_"
                target="_blank"
              >
                Twitter
              </a>
              <br />
              <Film
                name="Metropolis"
                inLink="/archives/metropolis-1927"
              />,{" "}
              <Film
                name="Ma Nuit chez Maud"
                inLink="/archives/nuit-chez-maud-1969"
              />
              ,{" "}
              <Film
                name="Printemps Tardif"
                inLink="/archives/printemps-tardif-1949"
              />
              , <Film name="Old Joy" outLink="/archives/old-joy-2006" />
            </Contributeur>
            <Contributeur>
              Lionel Guetta-Jeanrenaud
              <br />
              <span className="uppercase">Rédacteur en chef</span>
              <br />
              Retrouvez-moi sur Letterboxd, Instagram, Twitter
              <br />
              <Film
                name="Titanic"
                outLink="https://en.wikipedia.org/wiki/Titanic_(1997_film)"
              />
            </Contributeur>
            <Contributeur>
              Ugo Tanielian
              <br />
              <span className="uppercase">Rédacteur en chef</span>
              <br />
              <Film
                name="Il était une fois dans l'Ouest"
                inLink="/archives/etait-fois-ouest-1968"
              />
              , <Film name="John McCabe" inLink="/archives/john-mccabe-1971" />,{" "}
              <Film
                name="Voyage au bout de l'enfer"
                inLink="/archives/voyage-bout-enfer-1978"
              />
              ,{" "}
              <Film
                name="Nothing But a Man"
                inLink="/archives/nothing-man-1964"
              />
            </Contributeur>
            <Contributeur>
              Lionel Guetta-Jeanrenaud
              <br />
              <span className="uppercase">Rédacteur en chef</span>
              <br />
              Retrouvez-moi sur Letterboxd, Instagram, Twitter
              <br />
              <Film
                name="Titanic"
                outLink="https://en.wikipedia.org/wiki/Titanic_(1997_film)"
              />
            </Contributeur>
            <Contributeur>
              Claire Malot
              <br />
              <span className="uppercase">designer graphique</span>
              <br />
              Retrouvez mon travail sur{" "}
              <a
                href="https://www.instagram.com/clairon.malot/"
                className="underline"
                target="_blank"
              >
                Instagram
              </a>{" "}
              et sur mon{" "}
              <a
                href="https://clairemalot.com/"
                className="underline"
                target="_blank"
              >
                site personnel
              </a>
              .
              <br />
              <Film
                name="L'un chante, l'autre pas"
                inLink="/archives/chante-autre-1977"
              />
              , <Film name="Conte d'été" inLink="/archives/conte-d-ete-1996" />,{" "}
              <Film name="First Cow" inLink="/archives/first-cow-2020" />
            </Contributeur>
            <Contributeur>
              Jonathan Roitgrund
              <br />
              <span className="uppercase">développeur</span>
              <br />
              <Film
                name="After Hours"
                inLink="/archives/after-hours-1985"
              />,{" "}
              <Film
                name="Stranger than Paradise"
                inLink="/archives/stranger-than-paradise-1984"
              />
              ,{" "}
              <Film
                name="Ça tourne à Manhattan"
                outLink="https://fr.wikipedia.org/wiki/%C3%87a_tourne_%C3%A0_Manhattan"
              />
            </Contributeur>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contributeur({ children }: { children: ReactNode }) {
  return (
    <div className="border-b py-18px text-center last:border-0">
      <BodyCopy>
        <div className="leading-21px">{children}</div>
      </BodyCopy>
    </div>
  );
}

function Film({
  name,
  inLink,
  outLink,
}: {
  name: string;
  inLink?: string;
  outLink?: string;
}) {
  return (
    <i className="italic">
      {inLink != null && (
        <Link href={inLink} className="underline">
          {name}
        </Link>
      )}
      {outLink != null && (
        <a target="_blank" href={outLink} className="underline">
          {name}
        </a>
      )}
    </i>
  );
}
