import Link from "next/link";
import { ReactNode } from "react";

import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

import {
  FirstRow,
  MiddleColumn,
  Section,
  SectionHeader,
  ThreeColumnLayout,
} from "../components";
import placeholder from "../placeholder.png";

const TOP_FILMS: {
  titre: string;
  id: string;
  directorsAndYear: string;
}[] = [
  {
    titre: "Jeanne Dielman 23, Quai Du Commerce, 1080 Bruxelles",
    id: "jeanne-dielman-23-quai-commerce-1080-bruxelles-1975",
    directorsAndYear: "Chantal Akerman (1975)",
  },
  {
    titre: "Mes petites amoureuses",
    id: "mes-petites-amoureuses-1974",
    directorsAndYear: "Jean Eustache (1974)",
  },
  {
    titre: "Déménagement",
    id: "demenagement-1993",
    directorsAndYear: "Shinji Sōmai (1993)",
  },
  {
    titre: "Guerre et Paix",
    id: "guerre-et-paix-1966",
    directorsAndYear: "Sergey Bondarchuk (1966)",
  },
  {
    titre: "House",
    id: "house-1977",
    directorsAndYear: "Nobuhiko Ôbayashi (1977)",
  },
  {
    titre: "Welfare",
    id: "welfare-1975",
    directorsAndYear: "Frederick Wiseman (1975)",
  },
  {
    titre: "La Maman et la Putain",
    id: "maman-putain-1972",
    directorsAndYear: "Jean Eustache (1972)",
  },
  {
    titre: "Dancer in the Dark",
    id: "dancer-dark-2000",
    directorsAndYear: "Lars von Trier (2000)",
  },
  {
    titre: "Cure",
    id: "cure-1997",
    directorsAndYear: "Kiyoshi Kurosawa (1997)",
  },
  {
    titre: "Lost Highway",
    id: "lost-highway-1997",
    directorsAndYear: "David Lynch (1997)",
  },
];

interface Critique {
  nom: string;
  references: { nom: string; href?: string }[];
  top: { titre: string; id: string; directorsAndYear: string }[];
}

const CRITIQUES: Critique[] = [
  {
    nom: "Alicia Arpaia",
    references: [
      { nom: "Sorociné", href: "https://www.sorocine.com/" },
      { nom: "Revus & Corrigés", href: "https://revusetcorriges.com/" },
    ],
    top: [
      {
        titre: "Hester Street",
        id: "",
        directorsAndYear: "Joan Micklin Silver (1975)",
      },
      {
        titre: "Les Aventures du prince Ahmed",
        id: "",
        directorsAndYear: "Lotte Reiniger, Carl Koch (1926)",
      },
      {
        titre: "Wanda",
        id: "",
        directorsAndYear: "Barbara Loden (1970)",
      },
      {
        titre: "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",
        id: "",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "Le Challat de Tunis",
        id: "",
        directorsAndYear: "Kaouther Ben Hania (2014)",
      },
      {
        titre: "Récréations",
        id: "",
        directorsAndYear: "Claire Simon (1992)",
      },
      {
        titre: "Nous étions jeunes",
        id: "",
        directorsAndYear: "Binka Zhelyazkova (1961)",
      },
      {
        titre: "Haut les coeurs!",
        id: "",
        directorsAndYear: "Solveig Anspach (1998)",
      },
      {
        titre: "La dame de Constantinople",
        id: "",
        directorsAndYear: "Judit Elek (1969)",
      },
      {
        titre: "Lumière",
        id: "",
        directorsAndYear: "Jeanne Moreau (1976)",
      },
    ],
  },
  {
    nom: "Luc Chessel",
    references: [
      {
        nom: "Libération",
        href: "https://www.liberation.fr/auteur/luc-chessel/",
      },
    ],
    top: [
      {
        titre: "Déménagement",
        id: "",
        directorsAndYear: "Shinji Sōmai (1993)",
      },
      {
        titre: "Sois belle et tais-toi",
        id: "",
        directorsAndYear: "Delphine Seyrig (1977)",
      },
      {
        titre: "L'amour fou",
        id: "",
        directorsAndYear: "Jacques Rivette (1969)",
      },
      {
        titre: "Beyrouth ma ville",
        id: "",
        directorsAndYear: "Jocelyne Saab (1982)",
      },
      {
        titre: "Numéro zéro",
        id: "",
        directorsAndYear: "Jean Eustache (1971)",
      },
      {
        titre: "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",
        id: "",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "Mes petites amoureuses",
        id: "",
        directorsAndYear: "Jean Eustache (1974)",
      },
      {
        titre: "Le Festin nu",
        id: "",
        directorsAndYear: "David Cronenberg (1991)",
      },
      {
        titre: "Amerika - Rapports de classe",
        id: "",
        directorsAndYear: "Jean-Marie Straub, Danièle Huillet (1984)",
      },
      {
        titre: "Classified People",
        id: "",
        directorsAndYear: "Yolande Zauberman (1987)",
      },
    ],
  },

  {
    nom: "Victor Courgeon",
    references: [
      {
        nom: "Cinéma Le Méliès Montreuil",
        href: "http://meliesmontreuil.fr/",
      },
    ],
    top: [
      {
        titre: "L'Âme sœur",
        id: "",
        directorsAndYear: "Fredi M. Murer (1985)",
      },
      {
        titre: "Unrelated",
        id: "",
        directorsAndYear: "Joanna Hogg (2007)",
      },
      {
        titre: "The Appointment",
        id: "",
        directorsAndYear: "Lindsey C. Vickers (1981)",
      },
      {
        titre: "Déménagement",
        id: "",
        directorsAndYear: "Shinji Sōmai (1993)",
      },
      {
        titre: "Vengeance Is Mine",
        id: "",
        directorsAndYear: "Michael Roemer (1984)",
      },
    ],
  },
  {
    nom: "Marin Gérard",
    references: [
      {
        nom: "Critikat",
        href: "https://www.critikat.com/author/maringerard/",
      },
    ],
    top: [
      {
        titre: "L'Homme qui en savait trop",
        id: "",
        directorsAndYear: "Alfred Hitchcock (1956)",
      },
      {
        titre: "La Blonde framboise",
        id: "",
        directorsAndYear: "Raoul Walsh (1941)",
      },
      {
        titre: "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",
        id: "",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "Le Secret derrière la porte",
        id: "",
        directorsAndYear: "Fritz Lang (1948)",
      },
      {
        titre: "Le Songe de la lumiere",
        id: "",
        directorsAndYear: "Victor Erice (1992)",
      },
      {
        titre: "Welfare",
        id: "",
        directorsAndYear: "Frederick Wiseman (1975)",
      },
      {
        titre: "Le Diable probablement",
        id: "",
        directorsAndYear: "Robert Bresson (1977)",
      },
      {
        titre: "My Dinner With André",
        id: "",
        directorsAndYear: "Louis Malle (1981)",
      },
      {
        titre: "La vie ne me fait pas peur",
        id: "",
        directorsAndYear: "Noémie Lvovsky (1999)",
      },
      {
        titre: "Remorquess",
        id: "",
        directorsAndYear: "Jean Gremillon (1941)",
      },
    ],
  },
];

{
  /* </div>
              <div>
                <h4>
                  Pauline Jannon (
                  <i>
                    <a href="https://superseven.fr/" target="_blank">
                      SuperSeven
                    </a>
                  </i>
                  )
                </h4>
                <ol>
                  <>
                    <i>Spider</i>, David Cronenberg (2002)
                  </>
                  <>
                    <i>Guerre et Paix</i>, Sergey Bondarchuk (1966)
                  </>
                  <>
                    <i>Pasqualino</i>, Lina Wertmüller (1975)
                  </>
                  <>
                    <i>Kasaba</i>, Nuri Bilge Ceylan (1997)
                  </>
                  <>
                    <i>Jonas qui aura 25 ans en l’an 2000</i>, Alain Tanner (1976)
                  </>
                  <>
                    <i>Il giovedi</i>, Dino Risi (1964)
                  </>
                  <>
                    <i>Out-takes from the life of a happy man</i>, Jonas Mekas
                    (2012)
                  </>
                  <>
                    <i>Ghost Dog: la voie du samourai</i>, Jim Jarmusch (1999)
                  </>
                  <>
                    <i>Bonjour</i>, Yasujirô Ozu (1959)
                  </>
                  <>
                    <i>Cette sacrée vérité</i>, Leo McCarey (1937)
                  </>
                </ol>
              </div>
              <div>
                <h4>
                  Sylvain Lefort (
                  <i>
                    <a href="https://revusetcorriges.com/" target="_blank">
                      Revus &amp; Corrigés
                    </a>
                  </i>
                  )
                </h4>
                <ol>
                  <>
                    <i>Les Soeurs Munekata</i>, Yasujirô Ozu (1950)
                  </>
                  <>
                    <i>Intolérance</i>, D.W. Griffith (1916)
                  </>
                  <>
                    <i>Une vie difficile</i>, Dino Risi (1961)
                  </>
                  <>
                    <i>Au fil du temps</i>, Wim Wenders (1976)
                  </>
                  <>
                    <i>Petulia</i>, Richard Lester (1968)
                  </>
                  <>
                    <i>Daniel</i>, Sidney Lumet (1983)
                  </>
                  <>
                    <i>Jeanne Dielman</i>, 23, quai du Commerce, 1080 Bruxelles,
                    Chantal Akerman (1975)
                  </>
                  <>
                    <i>La Bataille d&apos;Alger</i>, Gillo Pontecorvo (1966)
                  </>
                  <>
                    <i>Graffiti Party</i>, John Milius (1978)
                  </>
                  <>
                    <i>Vie privée</i>, Louis Malle (1962)
                  </>
                </ol>
              </div>
              <div>
                <h4>
                  Joachim Lepastier (
                  <i>
                    <a href="https://aoc.media/" target="_blank">
                      AOC
                    </a>
                  </i>
                  )
                </h4>
                <ol>
                  <>
                    <i>Gallipoli</i>, Peter Weir (1981)
                  </>
                  <>
                    <i>Rouge Sang</i>, Rudolf Thome (1970)
                  </>
                  <>
                    <i>Messidor</i>, Alain Tanner (1978)
                  </>
                  <>
                    <i>Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles</i>,
                    Chantal Akerman (1975)
                  </>
                  <>
                    <i>House</i>, Nobuhiko Ôbayashi (1977)
                  </>
                  <>
                    <i>Bungalow pour femmes</i>, Raoul Walsh (1956)
                  </>
                  <>
                    <i>Un bourgeois tout petit</i>, petit, Mario Monicelli (1977)
                  </>
                  <>
                    <i>Storie di vita e malavita</i>, Carlo Lizzani (1975)
                  </>
                  <>
                    <i>Seule contre la mafia</i>, Damiano Damiani (1970)
                  </>
                  <>
                    <i>Confidences pour confidences</i>, Pascal Thomas (1978)
                  </>
                </ol>
              </div>
              <div>
                <h4>
                  Matteu Maestracci (
                  <i>
                    <a
                      href="https://www.francetvinfo.fr/redaction/matteu-maestracci/"
                      target="_blank"
                    >
                      France Info
                    </a>
                  </i>
                  )
                </h4>
                <ol>
                  <>
                    <i>Violent Cop</i>, Takeshi Kitano (1989)
                  </>
                  <>
                    <i>Autour de minuit</i>, Bertrand Tavernier (1986)
                  </>
                  <>
                    <i>Taram et le chaudron magique</i>, Ted Berman, Richard Rich
                    (1985)
                  </>
                  <>
                    <i>Mais vous êtes fous</i>, Audrey Diwan (2018)
                  </>
                  <>
                    <i>Hôtel des Amériques</i>, André Téchiné (1981)
                  </>
                </ol>
              </div>
              <div>
                <h4>
                  Nicolas Moreno (
                  <i>
                    <a href="https://tsounami.fr/" target="_blank">
                      Tsounami
                    </a>
                  </i>
                  )
                </h4>
                <ol>
                  <>
                    <i>Les Quatre cavaliers de l&apos;apocalypse</i>, Vincente
                    Minnelli (1962)
                  </>
                  <>
                    <i>La Clepsydre</i>, Wojciech Has (1973)
                  </>
                  <>
                    <i>Nanouk l&apos;Esquimau</i>, Robert J. Flaherty (1922)
                  </>
                  <>
                    <i>Shoah</i>, Claude Lanzmann (1985)
                  </>
                  <>
                    <i>Guerre et paix - Episode 1: Andreï Bolkonski</i>, Sergey
                    Bondarchuk (1966)
                  </>
                  <>
                    <i>Reminiscences of a Journey to Lithuania</i>, Jonas Mekas
                    (1971)
                  </>
                  <>
                    <i>L&apos;amour fou</i>, Jacques Rivette (1969)
                  </>
                  <>
                    <i>Wanda</i>, Barbara Loden (1970)
                  </>
                  <>
                    <i>Jack le magnifique</i>, Peter Bogdanovich (1979)
                  </>
                  <>
                    <i>Les Chants de Mandrin</i>, Rabah Ameur-Zaïmeche (2011)
                  </>
                </ol>
              </div>
              <div>
                <h4>
                  Nicolas Pariser (<i>Réalisateur</i>)
                </h4>
                <ol>
                  <>
                    <i>Saraband</i>, Ingmar Bergman (2003)
                  </>
                  <>
                    <i>S.O.B.</i>, Blake Edwards (1981)
                  </>
                  <>
                    <i>La Vengeance est à Moi</i>, Shôhei Imamura (1979)
                  </>
                  <>
                    <i>Elle s&apos;appelait Scorpion</i>, Shun&apos;ya Itō (1972)
                  </>
                  <>
                    <i>Massacre à la tronçonneuse</i>, Tobe Hooper (1974)
                  </>
                  <>
                    <i>Le Gaucho</i>, Jacques Tourneur (1952)
                  </>
                  <>
                    <i>Du rouge pour un truand</i>, Lewis Teague (1979)
                  </>
                  <>
                    <i>The Big Wednesday</i>, John Milius (1978)
                  </>
                  <>
                    <i>Voyage sans retour</i>, Tay Garnett (1932)
                  </>
                  <>
                    <i>Contes cruels de la jeunesse</i>, Nagisa Oshima (1960)
                  </>
                </ol>
              </div>
              <div>
                <h4>
                  Eric Vernay (
                  <i>
                    <a href="https://sofilm.fr/" target="_blank">
                      SoFilm
                    </a>
                  </i>
                  )
                </h4>
                <ol>
                  <>
                    <i>Larmes de joie</i>, Mario Monicelli (1960)
                  </>
                  <>
                    <i>Un vrai crime d&apos;amour</i>, Luigi Comencini (1974)
                  </>
                  <>
                    <i>Une vie difficile</i>, Dino Risi (1961)
                  </>
                  <>
                    <i>Un Jeu brutal</i>, Jean-Claude Brisseau (1983)
                  </>
                  <>
                    <i>Récit d&apos;un propriétaire</i>, Yasujirô Ozu (1947)
                  </>
                  <>
                    <i>Daisy Miller</i>, Peter Bogdanovich (1974)
                  </>
                  <>
                    <i>San Babila : un crime inutile</i>, Carlo Lizzani (1976)
                  </>
                  <>
                    <i>La rupture</i>, Claude Chabrol (1970)
                  </>
                  <>
                    <i>Chère Louise</i>, Philippe de Broca (1972)
                  </>
                  <>
                    <i>Avant de t&apos;aimer</i>, Ida Lupino, Elmer Clifton (1949)
                  </>
                </ol>
              </div>
            </div>
            <br />
            <br />*/
}

const FRODON: Critique = {
  nom: "Jean-Michel Frodon",
  references: [
    { nom: "Projection Publique", href: "https://projection-publique.com/" },
    {
      nom: "Slate.fr",
      href: "https://www.slate.fr/source/15525/jean-michel-frodon",
    },
  ],
  top: [
    {
      titre: "Adieu Philippine",
      id: "",
      directorsAndYear: "Jacques Rozier (1963)",
    },
    {
      titre: "Ce vieux rêve qui bouge",
      id: "",
      directorsAndYear: "Alain Guiraudie (2000)",
    },

    {
      titre: "Certaines Femmes",
      id: "",
      directorsAndYear: "Kelly Reichardt (2016)",
    },
    {
      titre: "Histoire d'un secret",
      id: "",
      directorsAndYear: "Mariana Otero (2003)",
    },
    {
      titre: "L'amour fou",
      id: "",
      directorsAndYear: "Jacques Rivette (1969)",
    },
    {
      titre: "La Maman et la Putain",
      id: "",
      directorsAndYear: "Jean Eustache (1972)",
    },
    {
      titre: "Le Diable probablement",
      id: "",
      directorsAndYear: "Robert Bresson (1977)",
    },
    {
      titre: "Le Goût de la cerise",
      id: "",
      directorsAndYear: "Abbas Kiarostami (1997)",
    },
    {
      titre: "Le Joli Mai, Chris Marker",
      id: "",
      directorsAndYear: "ierre Lhomme (1963)",
    },
    {
      titre: "Les Fleurs de Shanghai",
      id: "",
      directorsAndYear: "Hou Hsiao-Hsien (1998)",
    },
    {
      titre: "Les Soeurs Munekata",
      id: "",
      directorsAndYear: "Yasujirô Ozu (1950)",
    },
    {
      titre: "Loulou",
      id: "",
      directorsAndYear: "Maurice Pialat (1980)",
    },
    {
      titre: "Ma nuit chez Maud",
      id: "",
      directorsAndYear: "Eric Rohmer (1969)",
    },
    {
      titre: "Nothing But a Man",
      id: "",
      directorsAndYear: "Michael Roemer (1964)",
    },
    {
      titre: "Outrage",
      id: "",
      directorsAndYear: "Ida Lupino (1950)",
    },

    {
      titre: "Palomita blanca",
      id: "",
      directorsAndYear: "Raoul Ruiz (1973)",
    },
    {
      titre: "Portrait of Jason",
      id: "",
      directorsAndYear: "Shirley Clarke (1967)",
    },
    {
      titre: "Rio Bravo",
      id: "",
      directorsAndYear: "Howard Hawks (1959)",
    },
    {
      titre: "Touki-bouki",
      id: "",
      directorsAndYear: "Djibril Diop Mambety (1973)",
    },
    {
      titre: "Tropical Malady",
      id: "",
      directorsAndYear: "Apichatpong Weerasethakul (2004)",
    },
    {
      titre: "Une femme sous influence",
      id: "",
      directorsAndYear: "John Cassavetes (1974)",
    },
    {
      titre: "Wanda",
      id: "",
      directorsAndYear: "Barbara Loden (1970)",
    },
    {
      titre: "Welfare",
      id: "",
      directorsAndYear: "Frederick Wiseman (1975)",
    },
    {
      titre: "Wesh Wesh, qu'est-ce qui se passe ?",
      id: "",
      directorsAndYear: "Rabah Ameur-Zaïmeche (2001)",
    },
  ],
};

export default function Top2023() {
  return (
    <>
      <PageHeader text="Top 2023">
        <SousTitre1>Vos plus belles découvertes de l&apos;année</SousTitre1>
      </PageHeader>
      <ThreeColumnLayout>
        <FirstRow
          type="retro-spective"
          date="28/12/2023"
          image={placeholder}
          alt="top 2023"
        />
        <MiddleColumn>
          <Section>
            <BodyCopy>
              <strong>
                Cette année, nous avons voulu, pour la première fois, vous
                consulter
              </strong>{" "}
              pour savoir quelles étaient vos plus belles découvertes de vieux
              films. Avec un tel champ des possibles, vos réponses ont forcément
              été extrêmement diverses. Parmi les 279 bulletins reçus, nous
              recensons plus de 1000 différents films mentionnés (de plus de 450
              différents réalisateurs). Malgré tout, de réelles tendances se
              dessinent, liées à ce que nous pourrions appeler une véritable
              actualité du cinéma de patrimoine.
            </BodyCopy>
          </Section>
          <Section>
            <div className="lg:flex">
              <div className="flex flex-col pb-20px lg:w-1/2 lg:border-r lg:pb-0 lg:pr-10px">
                <TopTable titre="le top films">
                  {TOP_FILMS.map(({ titre, directorsAndYear, id }) => (
                    <span key={id}>
                      <Link
                        className="uppercase underline"
                        href={`/film/${id}`}
                      >
                        {titre}
                      </Link>
                      , {directorsAndYear}
                    </span>
                  ))}
                </TopTable>
              </div>
              <div className="flex flex-col lg:w-1/2 lg:pl-10px">
                <TopTable titre="le top cinéastes">
                  <span>Chantal Akerman</span>
                  <span>Yasujirô Ozu</span>
                  <span>Jean Eustache</span>
                  <span>Lars von Trier</span>
                  <span>David Lynch</span>
                  <span>Sidney Lumet</span>
                  <span>Hou Hsiao-Hsien</span>
                  <span>Louis Malle</span>
                  <span>Robert Altman</span>
                  <span>Stanley Kubrick et Billy Wilder (ex-aequo)</span>
                </TopTable>
              </div>
            </div>
          </Section>
          <Section>
            <BodyCopy>
              C&apos;est sans grande surprise que{" "}
              <strong>
                la ressortie en avril dernier de{" "}
                <i>
                  <Link
                    className="underline"
                    href="/film/jeanne-dielman-23-quai-commerce-1080-bruxelles-1975"
                  >
                    Jeanne Dielman
                  </Link>
                </i>
              </strong>{" "}
              a été l&apos;événement majeur de l&apos;année du cinéma de
              patrimoine. Le film, qui venait d&apos;être consacré
              «&nbsp;meilleur film de tous les temps&nbsp;» par le fameux{" "}
              <a
                target="blank"
                className="underline"
                href="https://www.bfi.org.uk/sight-and-sound/greatest-films-all-time"
              >
                sondage décennal Sight &amp; Sound
              </a>
              , a été sélectionné par 49 d&apos;entre vous. Les autres films
              cités témoignent également d&apos;événements marquants de
              l&apos;année&nbsp;: la rétrospective historique consacrée à
              l&apos;intégralité des films de <strong>Jean Eustache</strong>{" "}
              (jusqu&apos;alors plus ou moins introuvables), la rétrospective{" "}
              <strong>Lars von Trier</strong> dans la foulée du festival de la
              Rochelle et la ressortie de nombreux films rares (
              <i>Déménagement</i>, <i>House</i>, <i>Welfare</i> et{" "}
              <i>Lost Highway</i>).
              <br />
              <br />
              Si <strong>Chantal Akerman</strong> est également la réalisatrice
              la plus citée, c&apos;est presque uniquement grâce à{" "}
              <i>Jeanne Dielman</i> (5 votes seulement pour d&apos;autres de ses
              films). On pourrait lui opposer le cas du réalisateur japonais{" "}
              <strong>Yasujiro Ozu</strong>
              &nbsp;: alors même qu&apos;aucun de ses films ne se fraye un
              chemin dans le Top 10, le cinéaste n&apos;en demeure pas moins
              troisième en nombre total de citations et surtout celui dont le
              plus grand nombre de films différents ont été mentionnés (15,
              contre 13 pour Louis Malle ou Jean-Luc Godard et 12 pour Lars von
              Trier). Assez logique, étant donné la ressortie de certains des
              films «&nbsp;rares et inédits&nbsp;» du maître japonais.
              <br />
              <br />
              Mais le cas Ozu ne suffit pas à expliquer{" "}
              <strong>
                l&apos;extraordinaire popularité du cinéma japonais
              </strong>{" "}
              dans vos scrutins. En effet, il y a 233 citations pour des films
              japonais (derrière seulement les États-Unis et la France, et
              nettement devant l&apos;Italie). Aux ressorties déjà mentionnées
              s&apos;ajoute la popularité de réalisateurs moins connus (Takeshi
              Kitano, Nobuhiko Ôbayashi, Shinya Tsukamoto, Kinuyo Tanaka, Kaneto
              Shindô), tous cités au moins 10 fois.
              <br />
              <br />
              Pour le reste, vos choix semblent confirmer une certaine idée du
              canon cinématographique traditionnel&nbsp;:{" "}
              <strong>un tropisme européen</strong> (après les États-Unis, la
              France, le Japon et l&apos;Italie viennent la Grande-Bretagne,
              l&apos;Allemagne, la Belgique, l&apos;Espagne, l&apos;URSS et
              finalement Taïwan), et{" "}
              <strong>un goût prononcé pour les cinéma des années 1970</strong>{" "}
              (première décennie aux nombres de citations devant les années 1990
              et 1960).
            </BodyCopy>
          </Section>
          <Section>
            <BodyCopy>
              Nous avons également profité de ce sondage pour vous demander{" "}
              <strong>
                ce que vous aimeriez voir plus souvent programmé en salles
              </strong>
              . Nombre d&apos;entre vous nous ont fait part de votre envie de
              voir <strong>plus de cinéastes asiatiques</strong>&nbsp;- ou, peut
              être, un <i>autre</i> cinéma asiatique&nbsp;- programmés en
              salles. Ont notamment été cités Tsai Ming Liang, Tsui Hark,
              Apichatpong Weerasethakul, John Woo, Yoon Ga-eun, Kenji Mizoguchi,
              Johnnie To, Sammo Hung et Liu Chia-Liang. On espère que le succès
              des ressorties de cinéma japonais (décrit par l&apos;un·e de vous
              comme «&nbsp;le plus beau du monde&nbsp;») donnera des idées à
              certains distributeurs !
              <br />
              <br />
              Plusieurs d&apos;entre vous nous ont aussi fait part de leur envie
              de{" "}
              <strong>
                voir plus de femmes cinéastes programmées en salles
              </strong>
              . Difficile en effet de ne pas se dire que Chantal Akerman a été
              l&apos;arbre qui cachait la forêt en cette année 2023
              (réalisatrice la plus citée mais seule femme du top 10). En 2022,
              nous découvrions en salles l&apos;extraordinaire{" "}
              <a
                target="_blank"
                className="underline"
                href="https://leretroprojecteur.com/details/variety-1983"
              >
                <i>Variety</i> de Bette Gordon
              </a>
              , ou encore l&apos;œuvre de Kinuyo Tanako, confirmant que le
              manque de représentation de femmes dans le canon traditionnel
              résulte à la fois des obstacles infligés aux femmes cinéastes et
              du fait que leur œuvre est insuffisamment distribuée.
              <br />
              <br />
              Enfin, vous avez été plusieurs à déplorer l&apos;absence en salles
              de vieux{" "}
              <strong>films d&apos;animation et de documentaires</strong>
              , deux véritables continents de la production cinématographiques
              trop souvent décrits (pour mieux les ostraciser) comme
              «&nbsp;genres&nbsp;» à part entière. Que 2024 fasse tomber ces
              catégories superflues&nbsp;!
              <br />
              <br />
              P.S. La palme du plus grand nombre de séances de vieux films vus
              en salle cette année revient à une certaine Eva, avec un total
              absolument ahurissant de 300. Qui pour faire mieux l&apos;année
              prochaine&nbsp;?
            </BodyCopy>
          </Section>
          <Section>
            <SectionHeader>
              Tops de personnalités du monde du cinéma
            </SectionHeader>
            <BodyCopy>
              Le Rétro Projecteur a également sollicité des contributions de la
              part de différentes personnalités du monde du cinéma : critiques
              institutionnel·le·s ou indépendant·e·s, cinéastes, membres
              d&apos;associations,&nbsp;… On les remercie pour leur
              participation&nbsp;!
            </BodyCopy>
          </Section>
          <Section>
            {CRITIQUES.map((critique, i) => (
              <CritiqueTable key={i} critique={critique} />
            ))}
          </Section>
          <Section>
            <BodyCopy className="pb-20px">
              Plutôt que de nous faire part de ses plus belles découvertes de
              l’année, Jean-Michel Frodon a choisi ses coups de cœur parmi tous
              les films que nous avons sélectionnés dans les conseils
              hebdomadaires de notre newsletter en 2023. Les voici (par ordre
              alphabétique) :
            </BodyCopy>
            <CritiqueTable critique={FRODON} unordered />
          </Section>
        </MiddleColumn>
      </ThreeColumnLayout>
    </>
  );
}

function TopTable({
  titre,
  children,
}: {
  titre: string;
  children: ReactNode[];
}) {
  return (
    <>
      <div className="flex flex-col border-y bg-retro-green py-10px text-center text-22px font-semibold uppercase leading-22px tracking-[-0.01em] text-retro-gray lg:py-20px lg:text-22px lg:leading-22px">
        {titre}
      </div>
      {children.map((child, i) => (
        <ol
          key={i}
          className="flex grow items-center justify-center border-b px-5px py-5px text-center text-14px font-medium leading-18px tracking-[-0.01em] lg:py-10px lg:text-14px lg:leading-18px"
        >
          <li>
            {i + 1}.&nbsp;{child}
          </li>
        </ol>
      ))}
    </>
  );
}

function CritiqueTable({
  critique: { nom, references, top },
  unordered,
}: {
  critique: Critique;
  unordered?: boolean;
}) {
  const inside = top.map(({ titre, directorsAndYear, id }, i) => (
    <li
      className="leading-30px lg:leading-30px text-16px font-medium tracking-[-0.01em] lg:text-16px"
      key={i}
    >
      <span key={id}>
        <Link className="uppercase underline" href={`/film/${id}`}>
          {titre}
        </Link>
        , {directorsAndYear}
      </span>
    </li>
  ));
  return (
    <>
      <div className="border-y bg-retro-pale-green py-10px text-center text-25px font-semibold leading-25px tracking-[-0.01em] text-retro-gray lg:py-15px lg:text-25px lg:leading-25px">
        <span className="uppercase">{nom}</span>
        {references.length > 0 && " ("}
        {references.map(({ nom, href }, i) => (
          <>
            {i > 0 && ", "}
            {href != null ? (
              <a target="_blank" href={href}>
                {nom}
              </a>
            ) : (
              { nom }
            )}
          </>
        ))}
        {references.length > 0 && ")"}
      </div>
      {unordered ?? false ? (
        <ol className="list-inside list-decimal py-10px pl-25px pr-5px lg:py-20px">
          {" "}
          {inside}
        </ol>
      ) : (
        <ul className="list-inside list-decimal py-10px pl-25px pr-5px lg:py-20px">
          {inside}
        </ul>
      )}
    </>
  );
}
