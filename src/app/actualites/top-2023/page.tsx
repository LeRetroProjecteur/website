import Link from "next/link";
import { ReactNode } from "react";

import PageHeader from "@/components/layout/page-header";
import {
  BodyCopy,
  SectionTitle,
  SousTitre1,
  SubsectionTitle,
} from "@/components/typography/typography";

import {
  FirstRow,
  MiddleColumn,
  Section,
  SectionHeader,
  ThreeColumnLayout,
} from "../components";
import icon from "./img/icon.jpg";

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
        id: "hester-street-1975",
        directorsAndYear: "Joan Micklin Silver (1975)",
      },
      {
        titre: "Les Aventures du prince Ahmed",
        id: "aventures-prince-ahmed-1926",
        directorsAndYear: "Lotte Reiniger, Carl Koch (1926)",
      },
      {
        titre: "Wanda",
        id: "wanda-1970",
        directorsAndYear: "Barbara Loden (1970)",
      },
      {
        titre: "Jeanne Dielman 23, Quai Du Commerce, 1080 Bruxelles",
        id: "jeanne-dielman-23-quai-commerce-1080-bruxelles-1975",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "Le Challat de Tunis",
        id: "challat-tunis-2014",
        directorsAndYear: "Kaouther Ben Hania (2014)",
      },
      {
        titre: "Récréations",
        id: "recreations-1992",
        directorsAndYear: "Claire Simon (1992)",
      },
      {
        titre: "Nous étions jeunes",
        id: "nous-etions-jeunes-1961",
        directorsAndYear: "Binka Zhelyazkova (1961)",
      },
      {
        titre: "Haut les coeurs!",
        id: "haut-les-coeurs-1998",
        directorsAndYear: "Solveig Anspach (1998)",
      },
      {
        titre: "La dame de Constantinople",
        id: "dame-constantinople-1969",
        directorsAndYear: "Judit Elek (1969)",
      },
      {
        titre: "Lumière",
        id: "lumiere-1976",
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
        id: "demenagement-1993",
        directorsAndYear: "Shinji Sōmai (1993)",
      },
      {
        titre: "Sois belle et tais-toi !",
        id: "belle-tais-1977",
        directorsAndYear: "Delphine Seyrig (1977)",
      },
      {
        titre: "L'amour fou",
        id: "l-amour-fou-1969",
        directorsAndYear: "Jacques Rivette (1969)",
      },
      {
        titre: "Beyrouth ma ville",
        id: "beyrouth-ma-ville-1983",
        directorsAndYear: "Jocelyne Saab (1982)",
      },
      {
        titre: "Numéro zéro",
        id: "numero-zero-1971",
        directorsAndYear: "Jean Eustache (1971)",
      },
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
        titre: "Le Festin nu",
        id: "le-festin-nu-1991",
        directorsAndYear: "David Cronenberg (1991)",
      },
      {
        titre: "Amerika – Rapports de classe",
        id: "amerika-rapports-classe-1984",
        directorsAndYear: "Jean-Marie Straub, Danièle Huillet (1984)",
      },
      {
        titre: "Classified People",
        id: "classified-people-1987",
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
        id: "l-ame-soeur-1985",
        directorsAndYear: "Fredi M. Murer (1985)",
      },
      {
        titre: "Unrelated",
        id: "unrelated-2007",
        directorsAndYear: "Joanna Hogg (2007)",
      },
      {
        titre: "The Appointment",
        id: "the-appointment-1981",
        directorsAndYear: "Lindsey C. Vickers (1981)",
      },
      {
        titre: "Déménagement",
        id: "demenagement-1993",
        directorsAndYear: "Shinji Sōmai (1993)",
      },
      {
        titre: "Vengeance Is Mine",
        id: "vengeance-is-mine-1984",
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
        id: "homme-savait-trop-1956",
        directorsAndYear: "Alfred Hitchcock (1956)",
      },
      {
        titre: "La Blonde framboise",
        id: "la-blonde-framboise-1941",
        directorsAndYear: "Raoul Walsh (1941)",
      },
      {
        titre: "Jeanne Dielman 23, Quai Du Commerce, 1080 Bruxelles",
        id: "jeanne-dielman-23-quai-commerce-1080-bruxelles-1975",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "Le Secret derrière la porte",
        id: "secret-derriere-porte-1948",
        directorsAndYear: "Fritz Lang (1948)",
      },
      {
        titre: "Le Songe de la lumiere",
        id: "songe-lumiere-1992",
        directorsAndYear: "Victor Erice (1992)",
      },
      {
        titre: "Welfare",
        id: "welfare-1975",
        directorsAndYear: "Frederick Wiseman (1975)",
      },
      {
        titre: "Le Diable probablement",
        id: "le-diable-probablement-1977",
        directorsAndYear: "Robert Bresson (1977)",
      },
      {
        titre: "My Dinner With André",
        id: "dinner-andre-1981",
        directorsAndYear: "Louis Malle (1981)",
      },
      {
        titre: "La vie ne me fait pas peur",
        id: "vie-fait-peur-1999",
        directorsAndYear: "Noémie Lvovsky (1999)",
      },
      {
        titre: "Remorques",
        id: "remorques-1941",
        directorsAndYear: "Jean Gremillon (1941)",
      },
    ],
  },
  {
    nom: "Pauline Jannon",
    references: [{ nom: "SuperSeven", href: "https://superseven.fr/" }],
    top: [
      {
        titre: "Spider",
        id: "spider-2002",
        directorsAndYear: "David Cronenberg (2002)",
      },
      {
        titre: "Guerre et Paix",
        id: "guerre-et-paix-1966",
        directorsAndYear: "Sergey Bondarchuk (1966)",
      },
      {
        titre: "Pasqualino",
        id: "pasqualino-1975",
        directorsAndYear: "Lina Wertmüller (1975)",
      },
      {
        titre: "Kasaba",
        id: "kasaba-1997",
        directorsAndYear: "Nuri Bilge Ceylan (1997)",
      },
      {
        titre: "Jonas qui aura 25 ans en l’an 2000",
        id: "jonas-25-ans-2000-1976",
        directorsAndYear: "Alain Tanner (1976)",
      },
      {
        titre: "Il giovedi",
        id: "il-giovedi-1963",
        directorsAndYear: "Dino Risi (1963)",
      },
      {
        titre: "Out-takes from the life of a happy man",
        id: "takes-life-happy-man-2012",
        directorsAndYear: "Jonas Mekas (2012)",
      },
      {
        titre: "Ghost Dog: la voie du samourai",
        id: "ghost-dog-voie-samourai-1999",
        directorsAndYear: "Jim Jarmusch (1999)",
      },
      {
        titre: "Bonjour",
        id: "bonjour-1959",
        directorsAndYear: "Yasujirô Ozu (1959)",
      },
      {
        titre: "Cette sacrée vérité",
        id: "cette-sacree-verite-1937",
        directorsAndYear: "Leo McCarey (1937)",
      },
    ],
  },
  {
    nom: "Sylvain Lefort",
    references: [
      { nom: "Revus & Corrigés", href: "https://revusetcorriges.com/" },
    ],
    top: [
      {
        titre: "Les Soeurs Munekata",
        id: "les-soeurs-munekata-1950",
        directorsAndYear: "Yasujirô Ozu (1950)",
      },
      {
        titre: "Intolérance",
        id: "intolerance-1916",
        directorsAndYear: "D.W. Griffith (1916)",
      },
      {
        titre: "Une vie difficile",
        id: "une-vie-difficile-1961",
        directorsAndYear: "Dino Risi (1961)",
      },
      {
        titre: "Au fil du temps",
        id: "fil-temps-1976",
        directorsAndYear: "Wim Wenders (1976)",
      },
      {
        titre: "Daniel",
        id: "daniel-1983",
        directorsAndYear: "Sidney Lumet (1983)",
      },
      {
        titre: "Jeanne Dielman 23, Quai Du Commerce, 1080 Bruxelles",
        id: "jeanne-dielman-23-quai-commerce-1080-bruxelles-1975",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "Petulia",
        id: "petulia-1968",
        directorsAndYear: "Richard Lester (1968)",
      },
      {
        titre: "La Bataille d'Alger",
        id: "bataille-alger-1966",
        directorsAndYear: "Gillo Pontecorvo (1966)",
      },
      {
        titre: "Graffiti Party",
        id: "graffiti-party-1978",
        directorsAndYear: "John Milius (1978)",
      },
      {
        titre: "Vie privée",
        id: "vie-privee-1962",
        directorsAndYear: "Louis Malle (1962)",
      },
    ],
  },
  {
    nom: "Joachim Lepastier ",
    references: [{ nom: "AOC", href: "https://aoc.media/" }],
    top: [
      {
        titre: "Gallipoli",
        id: "gallipoli-1981",
        directorsAndYear: "Peter Weir (1981)",
      },
      {
        titre: "Rouge Sang",
        id: "rote-sonne-1970",
        directorsAndYear: "Rudolf Thome (1970)",
      },
      {
        titre: "Messidor",
        id: "messidor-1978",
        directorsAndYear: "Alain Tanner (1978)",
      },
      {
        titre: "Jeanne Dielman 23, Quai Du Commerce, 1080 Bruxelles",
        id: "jeanne-dielman-23-quai-commerce-1080-bruxelles-1975",
        directorsAndYear: "Chantal Akerman (1975)",
      },
      {
        titre: "House",
        id: "house-1977",
        directorsAndYear: "Nobuhiko Ôbayashi (1977)",
      },
      {
        titre: "Bungalow pour femmes",
        id: "bungalow-pour-femmes-1956",
        directorsAndYear: "Raoul Walsh (1956)",
      },
      {
        titre: "Un bourgeois tout petit, petit",
        id: "bourgeois-tout-petit-petit-1977",
        directorsAndYear: "Mario Monicelli (1977)",
      },
      {
        titre: "Storie di vita e malavita",
        id: "storie-di-vita-e-malavita-1975",
        directorsAndYear: "Carlo Lizzani, Mino Giarda (1975)",
      },
      {
        titre: "Seule contre la mafia",
        id: "seule-contre-mafia-1970",
        directorsAndYear: "Damiano Damiani (1970)",
      },
      {
        titre: "Confidences pour confidences",
        id: "confidences-pour-confidences-1978",
        directorsAndYear: "Pascal Thomas (1978)",
      },
    ],
  },
  {
    nom: "Matteu Maestracci",
    references: [
      {
        nom: "France Info",
        href: "https://www.francetvinfo.fr/redaction/matteu-maestracci/",
      },
    ],
    top: [
      {
        titre: "Violent Cop",
        id: "violent-cop-1989",
        directorsAndYear: "Takeshi Kitano (1989)",
      },
      {
        titre: "Autour de minuit",
        id: "autour-de-minuit-1986",
        directorsAndYear: "Bertrand Tavernier (1986)",
      },
      {
        titre: "Taram et le chaudron magique",
        id: "taram-chaudron-magique-1985",
        directorsAndYear: "Ted Berman, Richard Rich (1985)",
      },
      {
        titre: "Mais vous êtes fous",
        id: "etes-fous-2018",
        directorsAndYear: "Audrey Diwan (2018)",
      },
      {
        titre: "Hôtel des Amériques",
        id: "hotel-des-ameriques-1981",
        directorsAndYear: "André Téchiné (1981)",
      },
    ],
  },
  {
    nom: "Nicolas Moreno",
    references: [{ nom: "Tsounami", href: "https://tsounami.fr/" }],
    top: [
      {
        titre: "Les Quatre cavaliers de l'apocalypse",
        id: "quatre-cavaliers-apocalypse-1962",
        directorsAndYear: "Vincente Minnelli (1962)",
      },
      {
        titre: "La Clepsydre",
        id: "la-clepsydre-1973",
        directorsAndYear: "Wojciech Has (1973)",
      },
      {
        titre: "Nanouk l'Esquimau",
        id: "nanouk-l-esquimau-1922",
        directorsAndYear: "Robert J. Flaherty (1922)",
      },
      {
        titre: "Shoah",
        id: "shoah-1985",
        directorsAndYear: "Claude Lanzmann (1985)",
      },
      {
        titre: "Guerre et paix - Episode 1: Andreï Bolkonski",
        id: "guerre-paix-episode-1-andrei-bolkonski-1966",
        directorsAndYear: "Sergey Bondarchuk (1966)",
      },
      {
        titre: "Reminiscences of a Journey to Lithuania",
        id: "reminiscences-journey-lithuania-1971",
        directorsAndYear: "Jonas Mekas (1971)",
      },
      {
        titre: "L'amour fou",
        id: "l-amour-fou-1969",
        directorsAndYear: "Jacques Rivette (1969)",
      },
      {
        titre: "Wanda",
        id: "wanda-1970",
        directorsAndYear: "Barbara Loden (1970)",
      },
      {
        titre: "Jack le magnifique",
        id: "jack-le-magnifique-1979",
        directorsAndYear: "Peter Bogdanovich (1979)",
      },
      {
        titre: "Les Chants de Mandrin",
        id: "chants-mandrin-2011",
        directorsAndYear: "Rabah Ameur-Zaïmeche (2011)",
      },
    ],
  },
  {
    nom: "Nicolas Pariser",
    references: [{ nom: "Réalisateur", href: "" }],
    top: [
      {
        titre: "Saraband",
        id: "saraband-2003",
        directorsAndYear: "Ingmar Bergman (2003)",
      },
      {
        titre: "S.O.B.",
        id: "s-o-b-1981",
        directorsAndYear: "Blake Edwards (1981)",
      },
      {
        titre: "La Vengeance est à Moi",
        id: "vengeance-1979",
        directorsAndYear: "Shôhei Imamura (1979)",
      },
      {
        titre: "Elle s'appelait Scorpion",
        id: "appelait-scorpion-1972",
        directorsAndYear: "Shun'ya Itō (1972)",
      },
      {
        titre: "Massacre à la tronçonneuse",
        id: "massacre-tronconneuse-1974",
        directorsAndYear: "Tobe Hooper (1974)",
      },
      {
        titre: "Le Gaucho",
        id: "le-gaucho-1952",
        directorsAndYear: "Jacques Tourneur (1952)",
      },
      {
        titre: "Du rouge pour un truand",
        id: "rouge-truand-1979",
        directorsAndYear: "Lewis Teague (1979)",
      },
      {
        titre: "The Big Wednesday",
        id: "graffiti-party-1978",
        directorsAndYear: "John Milius (1978)",
      },
      {
        titre: "Voyage sans retour",
        id: "voyage-sans-retour-1932",
        directorsAndYear: "Tay Garnett (1932)",
      },
      {
        titre: "Contes cruels de la jeunesse",
        id: "contes-cruels-jeunesse-1960",
        directorsAndYear: "Nagisa Oshima (1960)",
      },
    ],
  },
  {
    nom: "Eric Vernay",
    references: [{ nom: "SoFilm", href: "https://sofilm.fr/" }],
    top: [
      {
        titre: "Larmes de joie",
        id: "larmes-de-joie-1960",
        directorsAndYear: "Mario Monicelli (1960)",
      },
      {
        titre: "Un vrai crime d'amour",
        id: "vrai-crime-amour-1974",
        directorsAndYear: "Luigi Comencini (1974)",
      },
      {
        titre: "Une vie difficile",
        id: "une-vie-difficile-1961",
        directorsAndYear: "Dino Risi (1961)",
      },
      {
        titre: "Un Jeu brutal",
        id: "un-jeu-brutal-1983",
        directorsAndYear: "Jean-Claude Brisseau (1983)",
      },
      {
        titre: "Récit d'un propriétaire",
        id: "recit-proprietaire-1947",
        directorsAndYear: "Yasujirô Ozu (1947)",
      },
      {
        titre: "Daisy Miller",
        id: "daisy-miller-1974",
        directorsAndYear: "Peter Bogdanovich (1974)",
      },
      {
        titre: "San Babila : un crime inutile",
        id: "san-babila-crime-inutile-1976",
        directorsAndYear: "Carlo Lizzani (1976)",
      },
      {
        titre: "La rupture",
        id: "la-rupture-1970",
        directorsAndYear: "Claude Chabrol (1970)",
      },
      {
        titre: "Chère Louise",
        id: "chere-louise-1972",
        directorsAndYear: "Philippe de Broca (1972)",
      },
      {
        titre: "Avant de t'aimer",
        id: "avant-aimer-1949",
        directorsAndYear: "Ida Lupino, Elmer Clifton (1949)",
      },
    ],
  },
];

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
      id: "adieu-philippine-1963",
      directorsAndYear: "Jacques Rozier (1963)",
    },
    {
      titre: "Ce vieux rêve qui bouge",
      id: "vieux-reve-bouge-2000",
      directorsAndYear: "Alain Guiraudie (2000)",
    },

    {
      titre: "Certaines Femmes",
      id: "certaines-femmes-2016",
      directorsAndYear: "Kelly Reichardt (2016)",
    },
    {
      titre: "Histoire d'un secret",
      id: "histoire-secret-2003",
      directorsAndYear: "Mariana Otero (2003)",
    },
    {
      titre: "L'amour fou",
      id: "l-amour-fou-1969",
      directorsAndYear: "Jacques Rivette (1969)",
    },
    {
      titre: "La Maman et la Putain",
      id: "maman-putain-1972",
      directorsAndYear: "Jean Eustache (1972)",
    },
    {
      titre: "Le Diable probablement",
      id: "le-diable-probablement-1977",
      directorsAndYear: "Robert Bresson (1977)",
    },
    {
      titre: "Le Goût de la cerise",
      id: "gout-cerise-1997",
      directorsAndYear: "Abbas Kiarostami (1997)",
    },
    {
      titre: "Le Joli Mai, Chris Marker",
      id: "le-joli-mai-1963",
      directorsAndYear: "ierre Lhomme (1963)",
    },
    {
      titre: "Les Fleurs de Shanghai",
      id: "fleurs-shanghai-1998",
      directorsAndYear: "Hou Hsiao-Hsien (1998)",
    },
    {
      titre: "Les Soeurs Munekata",
      id: "les-soeurs-munekata-1950",
      directorsAndYear: "Yasujirô Ozu (1950)",
    },
    {
      titre: "Loulou",
      id: "loulou-1980",
      directorsAndYear: "Maurice Pialat (1980)",
    },
    {
      titre: "Ma nuit chez Maud",
      id: "nuit-chez-maud-1969",
      directorsAndYear: "Eric Rohmer (1969)",
    },
    {
      titre: "Nothing But a Man",
      id: "nothing-man-1964",
      directorsAndYear: "Michael Roemer (1964)",
    },
    {
      titre: "Outrage",
      id: "outrage-1950",
      directorsAndYear: "Ida Lupino (1950)",
    },

    {
      titre: "Palomita blanca",
      id: "palomita-blanca-1973",
      directorsAndYear: "Raoul Ruiz (1973)",
    },
    {
      titre: "Portrait of Jason",
      id: "portrait-of-jason-1967",
      directorsAndYear: "Shirley Clarke (1967)",
    },
    {
      titre: "Rio Bravo",
      id: "rio-bravo-1959",
      directorsAndYear: "Howard Hawks (1959)",
    },
    {
      titre: "Touki-bouki",
      id: "touki-bouki-1973",
      directorsAndYear: "Djibril Diop Mambety (1973)",
    },
    {
      titre: "Tropical Malady",
      id: "tropical-malady-2004",
      directorsAndYear: "Apichatpong Weerasethakul (2004)",
    },
    {
      titre: "Une femme sous influence",
      id: "femme-sous-influence-1974",
      directorsAndYear: "John Cassavetes (1974)",
    },
    {
      titre: "Wanda",
      id: "wanda-1970",
      directorsAndYear: "Barbara Loden (1970)",
    },
    {
      titre: "Welfare",
      id: "welfare-1975",
      directorsAndYear: "Frederick Wiseman (1975)",
    },
    {
      titre: "Wesh Wesh, qu'est-ce qui se passe ?",
      id: "wesh-wesh-passe-2001",
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
          image={icon}
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
                <TopTable titre="top films">
                  {TOP_FILMS.map(({ titre, directorsAndYear, id }) => (
                    <span key={id}>
                      <Link href={`/film/${id}`}>
                        <i className="font-semibold uppercase underline">
                          {titre}
                        </i>
                      </Link>
                      , {directorsAndYear}
                    </span>
                  ))}
                </TopTable>
              </div>
              <div className="flex flex-col lg:w-1/2 lg:pl-10px">
                <TopTable titre="top cinéastes">
                  <span className="font-semibold">Chantal Akerman</span>
                  <span className="font-semibold">Yasujirô Ozu</span>
                  <span className="font-semibold">Jean Eustache</span>
                  <span className="font-semibold">Lars von Trier</span>
                  <span className="font-semibold">David Lynch</span>
                  <span className="font-semibold">Sidney Lumet</span>
                  <span className="font-semibold">Hou Hsiao-Hsien</span>
                  <span className="font-semibold">Louis Malle</span>
                  <span className="font-semibold">Robert Altman</span>
                  <span className="font-semibold">
                    Stanley Kubrick et Billy Wilder (ex-aequo)
                  </span>
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
                target="_blank"
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
              <a className="underline" href="/film/variety-1983">
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
      <SectionTitle className="lg:text-15px">{titre}</SectionTitle>
      {children.map((child, i) => (
        <ol
          key={i}
          className="flex grow items-center justify-center border-b py-5px text-center text-16px font-medium leading-20px tracking-[-0.01em] lg:py-10px"
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
      className="py-5px text-16px font-medium leading-20px tracking-[-0.01em]"
      key={i}
    >
      <span key={id}>
        <Link className="uppercase underline" href={`/film/${id}`}>
          <i>{titre}</i>
        </Link>
        , {directorsAndYear}
      </span>
    </li>
  ));
  return (
    <div className="py-10px">
      <SubsectionTitle>
        <span className="uppercase">{nom}</span>
        {references.length > 0 && " ("}
        {references.map(({ nom, href }, i) => (
          <>
            {i > 0 && ", "}
            {href != "" ? (
              <a className="underline" target="_blank" href={href}>
                {nom}
              </a>
            ) : (
              <a>{nom}</a>
            )}
          </>
        ))}
        {references.length > 0 && ")"}
      </SubsectionTitle>
      {unordered ?? false ? (
        <ol className="list-inside list-decimal py-5px pl-25px pr-5px lg:py-10px">
          {" "}
          {inside}
        </ol>
      ) : (
        <ul className="list-inside list-decimal py-5px pl-25px pr-5px lg:py-10px">
          {inside}
        </ul>
      )}
    </div>
  );
}
