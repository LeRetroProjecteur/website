import Image from "next/image";
import Link from "next/link";

import PageHeader from "@/components/layout/page-header";
import { TwoColumnPage } from "@/components/layout/two-column-page";
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
      <TwoColumnPage left={<Project />} right={<Team />} />
    </>
  );
}

function Project() {
  return (
    <>
      <div className="pb-25px">
        <BodyCopy>
          Le Rétro Projecteur est un média digital, en libre accès et à but non
          lucratif qui se donne pour mission de mettre en lumière la
          programmation en salle du cinéma de patrimoine. Croyant à
          l&apos;existence d&apos;un cinéma aussi résolument populaire que
          politique, le Rétro Projecteur s&apos;engage à promouvoir une
          programmation originale, indépendante et enrichissante.
        </BodyCopy>
      </div>
      <div>
        <div className="flex justify-center border-y bg-retro-green py-15px">
          <SousTitre2>contactez-nous</SousTitre2>
        </div>
        <div className="pb-25px pt-17px lg:pt-20px">
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
    </>
  );
}

interface TMembers {
  name: string;
  role: string;
  socialsIntro?: string;
  socials: { name: string; link: string }[];
  films: { name: string; id: string }[];
}

const teamMembers: TMembers[] = [
  {
    name: "Nicolas Guetta-Jeanrenaud",
    role: "Rédacteur",
    socials: [
      { name: "Twitter", link: "https://twitter.com/nicogj_" },
      { name: "Letterboxd", link: "https://letterboxd.com/nicogj/" },
    ],
    films: [
      { name: "Metropolis", id: "metropolis-1927" },
      { name: "Ma Nuit chez Maud", id: "nuit-chez-maud-1969" },
      { name: "Printemps Tardif", id: "printemps-tardif-1949" },
      { name: "Old Joy", id: "old-joy-2006" },
    ],
  },
  {
    name: "Lionel Guetta-Jeanrenaud",
    role: "Rédacteur",
    socials: [
      { name: "Twitter", link: "https://twitter.com/liojeanrenaud" },
      { name: "Letterboxd", link: "https://letterboxd.com/lioguetta/" },
    ],
    films: [
      { name: "Les Parapluies de Cherbourg", id: "parapluies-cherbourg-1963" },
      {
        name: "Jeannette, l'enfance de Jeanne d'Arc",
        id: "jeannette-enfance-jeanne-arc-2017",
      },
      { name: "L'Atalante", id: "l-atalante-1934" },
      { name: "Marie-Antoinette", id: "marie-antoinette-2006" },
    ],
  },
  {
    name: "Ugo Tanielian",
    role: "Technologiste",
    socials: [],
    films: [
      { name: "Il était une fois dans l'Ouest", id: "etait-fois-ouest-1968" },
      { name: "John McCabe", id: "john-mccabe-1971" },
      { name: "Voyage au bout de l'enfer", id: "voyage-bout-enfer-1978" },
      { name: "Nothing But a Man", id: "nothing-man-1964" },
    ],
  },
  {
    name: "Claire Malot",
    role: "Designer graphique",
    socialsIntro: "Retrouvez mon travail sur ",
    socials: [
      { name: "Instagram", link: "https://www.instagram.com/clairon.malot/" },
      { name: "mon site personnel", link: "https://clairemalot.com/" },
    ],
    films: [
      { name: "L'un chante, l'autre pas", id: "chante-autre-1977" },
      { name: "Conte d'été", id: "conte-d-ete-1996" },
      { name: "First Cow", id: "first-cow-2020" },
    ],
  },
  {
    name: "Jonathan Roitgrund",
    role: "Développeur",
    socials: [],
    films: [
      { name: "After Hours", id: "after-hours-1985" },
      { name: "Stranger than Paradise", id: "stranger-than-paradise-1984" },
      { name: "Ça tourne à Manhattan", id: "ca-tourne-manhattan-1995" },
    ],
  },
];

function Team() {
  return (
    <>
      <div className="flex justify-center border-y bg-retro-green py-15px">
        <SousTitre2>l&apos;équipe du rétro</SousTitre2>
      </div>
      <div>
        {teamMembers.map((teamMember) => (
          <TeamMember key={teamMember.name} member={teamMember} />
        ))}
      </div>
    </>
  );
}

function TeamMember({ member }: { member: TMembers }) {
  return (
    <div className="border-b py-17px text-center">
      <BodyCopy>
        <div>{member.name}</div>
        <div className="uppercase">{member.role}</div>
        {member.socials.length > 0 && (
          <div>
            {member.socialsIntro != null
              ? member.socialsIntro
              : "Retrouvez moi sur "}
            {member.socials.map((social, i) => [
              i > 0 && ", ",
              <a
                key={social.name}
                href={social.link}
                className="underline"
                target="_blank"
              >
                {social.name}
              </a>,
            ])}
          </div>
        )}
        <Image
          className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
          alt="coup de coeur"
          src={coupDeCoeur}
        />{" "}
        {member.films.map((film, i) => [
          i > 0 && ", ",
          <Link
            key={film.name}
            href={"/film/" + film.id}
            className="italic underline"
          >
            {film.name}
          </Link>,
        ])}
      </BodyCopy>
    </div>
  );
}
