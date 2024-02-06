import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

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
      <TwoColumnPage children1={<Project />} children2={<Team />} />
    </>
  );
}

function Project() {
  return (
    <div>
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
    </div>
  );
}

const teamMembers = [
  {
    name: "Nicolas Guetta-Jeanrenaud",
    role: "Rédacteur",
    socials: [
      { name: "Twitter", link: "https://twitter.com/nicogj_" },
      { name: "Letterboxd", link: "https://letterboxd.com/nicogj/" },
    ],
    films: [
      { name: "Metropolis", link: "/film/metropolis-1927" },
      { name: "Ma Nuit chez Maud", link: "/film/nuit-chez-maud-1969" },
      { name: "Printemps Tardif", link: "/film/printemps-tardif-1949" },
      { name: "Old Joy", link: "/film/old-joy-2006" },
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
      { name: "Les Parapluies de Cherbourg", link: "/film/parapluies-cherbourg-1963" },
      { name: "Jeannette, l'enfance de Jeanne d'Arc", link: "/film/jeannette-enfance-jeanne-arc-2017" },
      { name: "L'Atalante", link: "/film/l-atalante-1934" },
      { name: "Marie-Antoinette", link: "/film/marie-antoinette-2006" },
    ],
  },
  {
    name: "Ugo Tanielian",
    role: "Technologiste",
    socials: [],
    films: [
      { name: "Il était une fois dans l'Ouest", link: "/film/etait-fois-ouest-1968" },
      { name: "John McCabe", link: "/film/john-mccabe-1971" },
      { name: "Voyage au bout de l'enfer", link: "/film/voyage-bout-enfer-1978" },
      { name: "Nothing But a Man", link: "/film/nothing-man-1964" },
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
      { name: "L'un chante, l'autre pas", link: "/film/chante-autre-1977" },
      { name: "Conte d'été", link: "/film/conte-d-ete-1996" },
      { name: "First Cow", link: "/film/first-cow-2020" },
    ],
  },
  {
    name: "Jonathan Roitgrund",
    role: "Développeur",
    socials: [],
    films: [
      { name: "After Hours", link: "/film/after-hours-1985" },
      { name: "Stranger than Paradise", link: "/film/stranger-than-paradise-1984" },
      { name: "Ça tourne à Manhattan", link: "https://fr.wikipedia.org/wiki/%C3%87a_tourne_%C3%A0_Manhattan" },
    ],
  },
];

function Team() {
  return (
    <div>
      <div className="flex justify-center border-y bg-retro-green py-15px">
        <SousTitre2>l&apos;équipe du rétro</SousTitre2>
      </div>
      <div>
        {teamMembers.map((teamMember) => (
          <TeamMember key={teamMember.name} member={teamMember} />
        ))}
      </div>
    </div>
  );
}

function Film({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <i>
      <Link href={link} className="underline">
        {name}
      </Link>
    </i>
  );
}

function Social(
  {name, link}: {name:string, link:string}
) {
  return (
    <span>
      <a href={link} className="underline" target="_blank">
        {name}
      </a>
    </span>
  );
}


function TeamMember({
  member,
}: {
  member: {
    name: string;
    role: string;
    socialsIntro?: string;
    socials: ReactNode[];
    films: ReactNode[];
  };
}) {
  return (
    <div className="border-b py-17px text-center">
      <BodyCopy>
        <div>{member.name}</div>
        <div className="uppercase">{member.role}</div>
        {member.socials.length > 0 && (
          <div>
            {member.socialsIntro != null
              ? member.socialsIntro
              : "Retrouvez moi sur "
            }
            {member.socials
              .map((social) => (
                <Social key={social.name} name={social.name} link={social.link} />
              ))
              .join(", ")
            }
            .
          </div>
        )}
        <Image
          className="mt-[-0.1875rem] inline-block h-21px w-auto w-auto pr-5px"
          alt="coup de coeur"
          src={coupDeCoeur}
        />{" "}
        {member.films
          .map(( film ) => (
            <Film key={film.name} name={film.name} link={film.link} />
          ))
          .join(", ")}
      </BodyCopy>
    </div>
  );
}
