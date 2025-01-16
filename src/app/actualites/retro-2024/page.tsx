import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";

import {
  ArticleLayout,
  MiddleColumn,
  Section,
} from "@/components/articles/articles";
import { BodyCopy, SousTitre2 } from "@/components/typography/typography";

import { info } from "./pageInfo";

export const metadata: Metadata = {
  title: info.title,
};

const TOP_FILMS: {
  titre: string;
  id: string;
  extraInfo: string;
}[] = [
  {
    titre: "Napoléon",
    id: "napoleon-1927",
    extraInfo: "Abel Gance (1927)", // : 76 voix
  },
  {
    titre: "Les Sept Samouraïs",
    id: "les-sept-samourais-1954",
    extraInfo: "Akira Kurosawa (1954)", // : 21 voix
  },
  {
    titre: "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",
    id: "jeanne-dielman-23-quai-commerce-1080-bruxelles-1975",
    extraInfo: "Chantal Akerman (1975)", // : 21 voix
  },
  {
    titre: "News from Home",
    id: "news-from-home-1977",
    extraInfo: "Chantal Akerman (1977)", // : 20 voix
  },
  {
    titre: "Entre le ciel et l'enfer",
    id: "entre-ciel-enfer-1963",
    extraInfo: "Akira Kurosawa (1963)", // : 20 voix
  },
  {
    titre: "D'Est",
    id: "d-est-1993",
    extraInfo: "Chantal Akerman (1993)", // : 19 voix
  },
  {
    titre: "Mulholland Drive",
    id: "mulholland-drive-2001",
    extraInfo: "David Lynch (2001)", // : 18 voix
  },
  {
    titre: "Dersou Ouzala",
    id: "dersou-ouzala-1975",
    extraInfo: "Akira Kurosawa (1975)", // : 16 voix
  },
  {
    titre: "Les Rendez-vous d'Anna",
    id: "rendez-anna-1978",
    extraInfo: "Chantal Akerman (1978)", // : 16 voix
  },
  {
    titre: "Les Chaussons rouges",
    id: "les-chaussons-rouges-1948",
    extraInfo: "Michael Powell et Emeric Pressburger (1948)", // : 16 voix
  },
];

function TopTable({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode[];
}) {
  return (
    <>
      <div
        className={
          "flex flex-col border-y border-retro-bordeaux bg-retro-bordeaux px-10px py-10px text-center text-22px font-semibold uppercase leading-22px tracking-[-0.01em] lg:py-20px lg:text-15px"
        }
      >
        <SousTitre2 textColor="retro-blue">{titre}</SousTitre2>
      </div>
      {children.map((child, i) => (
        <ol
          key={i}
          className="flex grow items-center justify-center border-b border-retro-bordeaux bg-retro-blue px-5px py-7px text-center text-16px font-medium leading-20px tracking-[-0.01em] text-retro-bordeaux lg:py-10px"
        >
          <li>
            {i + 1}.&nbsp;{child}
          </li>
        </ol>
      ))}
    </>
  );
}

export default function Page() {
  return (
    <ArticleLayout info={info}>
      <MiddleColumn>
        <Section>
          <BodyCopy>
            <strong>
              Chantal Akerman, Akira Kurosawa, Abel Gance, Eric Rohmer… qui a
              dit que ces figures tutélaires du cinéma n&apos;avaient plus leur
              place dans les tops de fin d&apos;année&nbsp;?
            </strong>{" "}
            Il y a quelques semaines, nous avons voulu vous consulter pour
            savoir quelles ont été vos plus belles découvertes de vieux films au
            cours des douze derniers mois. Vous avez été 435 à répondre à notre
            sondage, avec plus de 2000 films mentionnés de plus de 1000
            cinéastes différents&nbsp;! Des grands classiques aux pépites
            oubliées, des superproductions hollywoodiennes aux expérimentations
            insolites, c&apos;est une certaine histoire du cinéma que racontent
            vos scrutins. Et une myriade de titres à rajouter dans notre liste
            de lecture pour 2025…
          </BodyCopy>
        </Section>
        <Section>
          <div className="lg:flex">
            <div className="flex flex-col pb-20px lg:w-1/2 lg:pb-0 lg:pr-10px">
              <TopTable titre="top films">
                {TOP_FILMS.map(({ titre, extraInfo, id }) => (
                  <span key={id}>
                    <Link href={`/film/${id}`}>
                      <i className="font-semibold uppercase underline">
                        {titre}
                      </i>
                    </Link>
                    , {extraInfo}
                  </span>
                ))}
              </TopTable>
            </div>
            <div className="flex flex-col lg:w-1/2 lg:pl-10px">
              <TopTable titre="top cinéastes">
                <span className="font-semibold">Chantal Akerman</span>
                <span className="font-semibold">Abel Gance</span>
                <span className="font-semibold">Akira Kurosawa</span>
                <span className="font-semibold">David Lynch</span>
                <span className="font-semibold">Eric Rohmer</span>
                <span className="font-semibold">Yasujirô Ozu</span>
                <span className="font-semibold">Takeshi Kitano</span>
                <span className="font-semibold">Wong Kar-Wai</span>
                <span className="font-semibold">Alfred Hitchcock</span>
                <span className="font-semibold">Sean Baker</span>
              </TopTable>
              {/* (132 voix) */}
              {/* (86 voix) */}
              {/* (80 voix) */}
              {/* (55 voix) */}
              {/* (37 voix) */}
              {/* (36 voix) */}
              {/* (35 voix) */}
              {/* (35 voix) */}
              {/* (34 voix) */}
              {/* (34 voix) */}
            </div>
          </div>
        </Section>
        <Section>
          <BodyCopy>
            Aidée par la ressortie par Capricci de seize de ses films au cours
            de l&apos;automne, <strong>Chantal Akerman</strong> demeure, pour la
            deuxième année consécutive, la cinéaste dont vous avez le plus aimé
            découvrir les films en 2024. Un tel plébiscite (132 mentions)
            témoigne à la fois du foisonnement de son œuvre (17 films distincts
            cités, plus que pour n&apos;importe quel autre cinéaste) que du
            statut relativement confidentiel occupé jusqu&apos;à récemment par
            la cinéaste belge dans le canon cinématographique. On ne manquera
            pas de noter que c&apos;est la veine expérimentale de son cinéma qui
            a plutôt reçu votre assentiment avec{" "}
            <Link className="underline" href="/film/news-from-home-1977">
              <i>News from Home</i>
            </Link>{" "}
            et{" "}
            <Link className="underline" href="/film/d-est-1993">
              <i>D&apos;Est</i>
            </Link>{" "}
            se frayant des places inattendues dans le top 10.
            <br />
            <br />
            L&apos;autre événement majeur de l&apos;année fut indéniablement la
            restauration, au terme de 16 ans de travail, du{" "}
            <strong>
              {" "}
              <Link className="underline" href="/film/napoleon-1927">
                <i>Napoléon</i>
              </Link>{" "}
              d&apos;Abel Gance
            </strong>
            . Longtemps introuvable ou alors dans des versions qui ne
            reflétaient pas le projet initial du cinéaste, le film a enfin
            refait peau neuve. La ressortie a donné lieu à de nombreuses séances
            exceptionnelles dont plusieurs ont cherché à reproduire le
            dispositif de projection sur plusieurs écrans imaginé par Gance.
            Avec 76 mentions, la fresque historique arrive très largement en
            tête du classement de films (loin devant <i>Les Sept Samouraïs</i>{" "}
            et <i>Jeanne Dielman</i>, 21 mentions chacun).
            <br />
            <br />
            Vos bulletins de vote valident donc bien l&apos;impressionnant
            travail de défrichage et de réactualisation de vieux films fait par
            <strong>d&apos;infatigables boîtes de distributions</strong>. Grâce
            à eux, des films de Kurosawa (Splendor Films et Carlotta), de
            Jacques Rozier (Potemkine Films), de Frederick Wiseman (Météore
            Films), ou encore de Wong Kar Wai (The Jokers) ont pu être
            découverts&nbsp;&ndash; et surtout appréciés&nbsp;!&nbsp;&ndash; par
            vous. Ces quelques noms confirment d&apos;ailleurs une tendance déjà
            relevée l&apos;année dernière et qui n&apos;a fait que
            s&apos;accentuer en 2024 : les noces tenaces entre la programmation
            de vieux films en salles à Paris et le cinéma asiatique. On décompte
            pas moins de 346 mentions pour des films japonais (qui arrive juste
            derrière le trio USA-France-Italie), 107 pour des films hongkongais
            et 44 pour le cinéma chinois.
            <br />
            <br />
            Rien de très étonnant là-dedans quand on se souvient que vous étiez
            nombreux·ses en 2023 à réclamer plus de projections de films
            asiatiques. Cette année, on remarque dans vos commentaires une envie
            grandissante de mieux découvrir{" "}
            <strong>le cinéma de pays non-occidentaux</strong> avec des mentions
            pour le philippin Lav Diaz, les brésiliens Glauber Raucha et Rogério
            Sganzerla, le chilien Patricio Guzman ou encore pour les cinémas
            indien et yougoslave.
            <br />
            <br />
            Enfin, vous êtes nombreux·ses à nous faire part de votre envie de
            voir plus de vieux films de <strong>cinéastes femmes</strong>{" "}
            programmés en salles. Nous notions l&apos;année dernière que le
            phénomène Akerman était l&apos;arbre qui cachait la forêt de la
            sous-représentation des réalisatrices. Impossible cette année de ne
            pas se répéter&nbsp;: si Akerman arrive en tête du classement des
            cinéastes les plus cités, il faut descendre à la 47e&nbsp;(!!) place
            pour trouver une autre femme, Agnès Varda&nbsp;! Heureusement, vous
            donnez dans vos commentaires différentes pistes pour rectifier le
            tir en 2025&nbsp;: Jane Campion, Josephine Decker, Ann Hui,
            Marguerite Duras, Vera Chytilova, Catherine Breillat, Andrea Arnold…
            À bon entendeur&nbsp;!
          </BodyCopy>
        </Section>
      </MiddleColumn>
    </ArticleLayout>
  );
}
