import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import PageHeader from "@/components/layout/page-header";
import {
  BodyCopy,
  SousTitre1,
  SousTitre2,
} from "@/components/typography/typography";

import coupDeCoeur from "../../assets/coup-de-coeur.png";

export default function AProposPage() {
  return (
    <>
      <PageHeader text="à propos">
        <SousTitre1>qui sommes nous ?</SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <div className="flex grow flex-col gap-y-15px lg:flex-row">
          <div className="flex grow flex-col gap-y-15px lg:w-1/2 lg:border-r lg:pr-20px">
            <div className="pb-15px lg:pb-25px">
              <BodyCopy>
                Le Rétro Projecteur est un média digital, en libre accès et à
                but non lucratif qui se donne pour mission de mettre en lumière
                la programmation en salle du cinéma de patrimoine. Croyant à
                l&apos;existence d&apos;un cinéma aussi résolument populaire que
                politique, le Rétro Projecteur s&apos;engage à promouvoir une
                programmation originale, indépendante et enrichissante.
              </BodyCopy>
            </div>
            <div>
              <div className="flex justify-center border-y bg-retro-green py-15px">
                <SousTitre2>contactez-nous</SousTitre2>
              </div>
              <div className="py-17px lg:pt-20px">
                <BodyCopy>
                  Une séance manquante, une erreur sur le site, un projet à nous
                  proposer&nbsp;?
                  <br />
                  Cinémas, producteurs, indépendants&nbsp;?{" "}
                  <a
                    href="mailto:contact@leretroprojecteur.com"
                    className="underline"
                  >
                    Écrivez-nous&nbsp;!
                  </a>
                </BodyCopy>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2 lg:pl-20px lg:pt-0">
            <div className="flex justify-center border-y bg-retro-green py-15px">
              <SousTitre2>l&apos;équipe du rétro</SousTitre2>
            </div>
            <div>
              <Contributeur>
                <span className="font-semibold">Nicolas Guetta-Jeanrenaud</span>
                <br />
                <span className="font-semibold uppercase">
                  Rédacteur en chef
                </span>
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
                <Image
                  className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
                  alt="coup de coeur"
                  src={coupDeCoeur}
                />{" "}
                <Film name="Metropolis" inLink="/film/metropolis-1927" />,{" "}
                <Film
                  name="Ma Nuit chez Maud"
                  inLink="/film/nuit-chez-maud-1969"
                />
                ,{" "}
                <Film
                  name="Printemps Tardif"
                  inLink="/film/printemps-tardif-1949"
                />
                , <Film name="Old Joy" inLink="/film/old-joy-2006" />
              </Contributeur>
              <Contributeur>
                <span className="font-semibold">Lionel Guetta-Jeanrenaud</span>
                <br />
                <span className="font-semibold uppercase">
                  Rédacteur en chef
                </span>
                <br />
                Retrouvez-moi sur{" "}
                <a
                  className="underline"
                  href="https://letterboxd.com/lioguetta/"
                  target="_blank"
                >
                  Letterboxd
                </a>
                ,{" "}
                <a
                  className="underline"
                  href="https://twitter.com/liojeanrenaud"
                  target="_blank"
                >
                  Twitter
                </a>
                <br />
                <Image
                  className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
                  alt="coup de coeur"
                  src={coupDeCoeur}
                />{" "}
                <Film
                  name="Les Parapluies de Cherbourg"
                  inLink="/film/parapluies-cherbourg-1963"
                />
                ,{" "}
                <Film
                  name="Jeannette, l'enfance de Jeanne d'Arc"
                  inLink="/film/jeannette-enfance-jeanne-arc-2017"
                />
                , <Film name="L'Atalante" inLink="/film/l-atalante-1934" />,{" "}
                <Film
                  name="Marie-Antoinette"
                  inLink="/film/marie-antoinette-2006"
                />
              </Contributeur>
              <Contributeur>
                <span className="font-semibold">Ugo Tanielian</span>
                <br />
                <span className="font-semibold uppercase">
                  Rédacteur en chef
                </span>
                <br />
                <Image
                  className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
                  alt="coup de coeur"
                  src={coupDeCoeur}
                />{" "}
                <Film
                  name="Il était une fois dans l'Ouest"
                  inLink="/film/etait-fois-ouest-1968"
                />
                , <Film name="John McCabe" inLink="/film/john-mccabe-1971" />,{" "}
                <Film
                  name="Voyage au bout de l'enfer"
                  inLink="/film/voyage-bout-enfer-1978"
                />
                ,{" "}
                <Film
                  name="Nothing But a Man"
                  inLink="/film/nothing-man-1964"
                />
              </Contributeur>
              <Contributeur>
                <span className="font-semibold">Claire Malot</span>
                <br />
                <span className="font-semibold uppercase">
                  designer graphique
                </span>
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
                <Image
                  className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
                  alt="coup de coeur"
                  src={coupDeCoeur}
                />{" "}
                <Film
                  name="L'un chante, l'autre pas"
                  inLink="/film/chante-autre-1977"
                />
                , <Film name="Conte d'été" inLink="/film/conte-d-ete-1996" />,{" "}
                <Film name="First Cow" inLink="/film/first-cow-2020" />
              </Contributeur>
              <Contributeur>
                <span className="font-semibold">Jonathan Roitgrund</span>
                <br />
                <span className="font-semibold uppercase">développeur</span>
                <br />
                <Image
                  className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
                  alt="coup de coeur"
                  src={coupDeCoeur}
                />{" "}
                <Film name="After Hours" inLink="/film/after-hours-1985" />,{" "}
                <Film
                  name="Stranger than Paradise"
                  inLink="/film/stranger-than-paradise-1984"
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
        <div className="w-1/2 border-r lg:h-100px" />
      </div>
    </>
  );
}

function Contributeur({ children }: { children: ReactNode }) {
  return (
    <div className="border-b py-17px text-center">
      <BodyCopy>{children}</BodyCopy>
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
