import { Metadata } from "next";
import Image from "next/image";
import React from "react";

import Top from "@/components/top";

import ranking from "./img/ranking.png";

export const metadata: Metadata = {
  title: "Top 2023 | Le Rétro Projecteur — Cinéma de patrimoine à Paris",
  description: "",
  other: {
    "og:image":
      "https://leretroprojecteur.com/chroniques/top-2023-sondage/img/icon.png",
    "twitter:card": "summary_large_image",
    "twitter:image":
      "https://leretroprojecteur.com/chroniques/top-2023-sondage/img/icon.png",
  },
};

export default function Sondage2023() {
  return (
    <>
      <h1>Top 2023&nbsp;: Vos plus belles découvertes de l’année</h1>
      <br />
      Cette année, nous avons voulu, pour la première fois, vous consulter pour
      savoir quelles étaient vos plus belles découvertes de vieux films. Avec un
      tel champ des possibles, vos réponses ont forcément été extrêmement
      diverses. Parmi les 279 bulletins reçus, nous recensons plus de 1000
      différents films mentionnés (de plus de 450 différents réalisateurs).
      Malgré tout, de réelles tendances se dessinent, liées à ce que nous
      pourrions appeler une véritable actualité du cinéma de patrimoine.
      <br />
      <br />
      <Image
        width={700}
        height={394}
        className="post-image"
        src={ranking}
        alt=""
      />
      <br />
      C’est sans grande surprise que la ressortie en avril dernier de{" "}
      <i>
        <a
          href={
            "https://leretroprojecteur.com/details/jeanne-dielman-23-quai-commerce-1080-bruxelles-1975"
          }
        >
          Jeanne Dielman
        </a>
      </i>{" "}
      a été l’événement majeur de l’année du cinéma de patrimoine. Le film, qui
      venait d’être consacré «&nbsp;meilleur film de tous les temps&nbsp;» par
      le fameux{" "}
      <a
        href={"https://www.bfi.org.uk/sight-and-sound/greatest-films-all-time"}
      >
        sondage décennal Sight & Sound
      </a>
      , a été sélectionné par 49 d’entre vous. Les autres films cités témoignent
      également d’événements marquants de l’année&nbsp;: la rétrospective
      historique consacrée à l’intégralité des films de Jean Eustache
      (jusqu’alors plus ou moins introuvables), la rétrospective Lars von Trier
      dans la foulée du festival de la Rochelle et la ressortie de nombreux
      films rares (<i>Déménagement</i>, <i>House</i>, <i>Welfare</i> et{" "}
      <i>Lost Highway</i>).
      <br />
      <br />
      Si Chantal Akerman est également la réalisatrice la plus citée, c’est
      presque uniquement grâce à <i>Jeanne Dielman</i> (5 votes seulement pour
      d’autres de ses films). On pourrait lui opposer le cas du réalisateur
      japonais Yasujiro Ozu&nbsp;: alors même qu’aucun de ses films ne se fraye
      un chemin dans le Top 10, le cinéaste n’en demeure pas moins troisième en
      nombre total de citations et surtout celui dont le plus grand nombre de
      films différents ont été mentionnés (15, contre 13 pour Louis Malle ou
      Jean-Luc Godard et 12 pour Lars von Trier). Assez logique, étant donné la
      ressortie de certains des films «&nbsp;rares et inédits&nbsp;» du maître
      japonais.
      <br />
      <br />
      Mais le cas Ozu ne suffit pas à expliquer l’extraordinaire popularité du
      cinéma japonais dans vos scrutins. En effet, il y a 233 citations pour des
      films japonais (derrière seulement les États-Unis et la France, et
      nettement devant l’Italie). Aux ressorties déjà mentionnées s’ajoute la
      popularité de réalisateurs moins connus (Takeshi Kitano, Nobuhiko
      Ôbayashi, Shinya Tsukamoto, Kinuyo Tanaka, Kaneto Shindô), tous cités au
      moins 10 fois.
      <br />
      <br />
      Pour le reste, vos choix semblent confirmer une certaine idée du canon
      cinématographique traditionnel&nbsp;: un tropisme européen (après les
      États-Unis, la France, le Japon et l’Italie viennent la Grande-Bretagne,
      l’Allemagne, la Belgique, l’Espagne, l’URSS et finalement Taïwan), et un
      goût prononcé pour les cinéma des années 1970 (première décennie aux
      nombres de citations devant les années 1990 et 1960).
      <br />
      <br />
      <p style={{ textAlign: "center" }}>***</p>
      <br />
      Nous avons également profité de ce sondage pour vous demander ce que vous
      aimeriez voir plus souvent programmé en salles. Nombre d’entre vous nous
      ont fait part de votre envie de voir plus de cinéastes asiatiques&nbsp;–
      ou, peut être, un <i>autre</i> cinéma asiatique&nbsp;– programmés en
      salles. Ont notamment été cités Tsai Ming Liang, Tsui Hark, Apichatpong
      Weerasethakul, John Woo, Yoon Ga-eun, Kenji Mizoguchi, Johnnie To, Sammo
      Hung et Liu Chia-Liang. On espère que le succès des ressorties de cinéma
      japonais (décrit par l’un·e de vous comme «&nbsp;le plus beau du
      monde&nbsp;») donnera des idées à certains distributeurs !
      <br />
      <br />
      Plusieurs d’entre vous nous ont aussi fait part de leur envie de voir plus
      de femmes cinéastes programmées en salles. Difficile en effet de ne pas se
      dire que Chantal Akerman a été l’arbre qui cachait la forêt en cette année
      2023 (réalisatrice la plus citée mais seule femme du top 10). En 2022,
      nous découvrions en salles l’extraordinaire{" "}
      <a href={"https://leretroprojecteur.com/details/variety-1983"}>
        <i>Variety</i> de Bette Gordon
      </a>
      , ou encore l’œuvre de Kinuyo Tanako, confirmant que le manque de
      représentation de femmes dans le canon traditionnel de la cinéphilie
      résulte à la fois des obstacles infligés aux femmes cinéastes et du fait
      que leur œuvre est insuffisamment distribuée.
      <br />
      <br />
      Enfin, vous avez été plusieurs à déplorer l’absence en salles de vieux
      films d’animation et de documentaires, deux véritables continents de la
      production cinématographiques trop souvent décrits (pour mieux les
      ostraciser) comme «&nbsp;genres&nbsp;» à part entière. Que 2024 fasse
      tomber ces catégories superflues&nbsp;!
      <br />
      <br />
      P.S. La palme du plus grand nombre de séances de vieux films vus en salle
      cette année revient à une certaine Eva, avec un total absolument
      ahurissant de 300. Qui pour faire mieux l’année prochaine&nbsp;?
      <br />
      <br />
      {/*<h2>Les Tops de l’équipe du Rétro Projecteur</h2>*/}
      {/*<div style={{ textAlign: "center" }}>*/}
      {/*  <Top*/}
      {/*    name={"Lionel Guetta-Jeanrenaud"}*/}
      {/*    role={""}*/}
      {/*    top={[*/}
      {/*      [*/}
      {/*        "Jeanne Dielman",*/}
      {/*        "23, quai du Commerce, 1080 Bruxelles, Chantal Akerman (1975)",*/}
      {/*      ],*/}
      {/*      ["Zéro de conduite", "Jean Vigo (1933)"],*/}
      {/*      ["La Rosière de Pessac", "Jean Eustache (1968)"],*/}
      {/*      ["Les Naufragés de l'ile de la Tortue", "Jacques Rozier (1974)"],*/}
      {/*      ["John McCabe", "Robert Altman (1971)"],*/}
      {/*      ["Opening Night", "John Cassavetes (1977)"],*/}
      {/*      ["Le Mandat", "Ousmane Sembene (1968)"],*/}
      {/*      ["Quatre nuits avec Anna", "Jerzy Skolimowski (2008)"],*/}
      {/*      ["Entre nos mains", "Mariana Otero (2010)"],*/}
      {/*      ["Le Salon de musique", "Satyajit Ray (1958)"],*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*  <Top*/}
      {/*    name={"Nicolas Guetta-Jeanrenaud"}*/}
      {/*    role={""}*/}
      {/*    top={[*/}
      {/*      ["Les Idiots", "Lars von Trier (1998)"],*/}
      {/*      ["La Rosière de Pessac", "Jean Eustache (1968)"],*/}
      {/*      [*/}
      {/*        "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",*/}
      {/*        "Chantal Akerman (1975)",*/}
      {/*      ],*/}
      {/*      ["Haute pègre", "Ernst Lubitsch (1932)"],*/}
      {/*      ["Short Cuts", "Robert Altman (1993)"],*/}
      {/*      ["Welfare", "Frederick Wiseman (1975)"],*/}
      {/*      ["Le Goût de la cerise", "Abbas Kiarostami (1997)"],*/}
      {/*      ["Nothing But a Man", "Michael Roemer (1964)"],*/}
      {/*      [*/}
      {/*        "Chronique d'Anna Magdalena Bach",*/}
      {/*        "Jean-Marie Straub, Danièle Huillet (1967)",*/}
      {/*      ],*/}
      {/*      ["Invasion Los Angeles", "John Carpenter (1988)"],*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*  <Top*/}
      {/*    name={"Ugo Tanielian"}*/}
      {/*    role={""}*/}
      {/*    top={[*/}
      {/*      ["Blood Simple", "Joel Coen, Ethan Coen (1984)"],*/}
      {/*      ["Il était un père", "Yasujirô Ozu (1942)"],*/}
      {/*      ["John McCabe", "Robert Altman (1971)"],*/}
      {/*      ["Bonnie and Clyde", "Arthur Penn (1967)"],*/}
      {/*      ["Nothing But a Man", "Michael Roemer (1964)"],*/}
      {/*      ["À bout de course", "Sidney Lumet (1988)"],*/}
      {/*      ["La Chronique des pauvres amants", "Carlo Lizzani (1954)"],*/}
      {/*      ["Ténèbres", "Dario Argento (1982)"],*/}
      {/*      ["Serpico", "Sidney Lumet (1973)"],*/}
      {/*      ["La Nuit du chasseur", "Charles Laughton (1955)"],*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</div>*/}
      <h2>Tops de personnalités du monde du cinéma</h2>
      Le Rétro Projecteur a également eu l’occasion de solliciter des
      contributions de la part de différentes personnes du monde du cinéma :
      critiques institutionnel·le·s ou indépendant·e·s, cinéastes, membres
      d’associations promouvant le cinéma,&nbsp;… On est très reconnaissant à
      toutes ces personnalités&nbsp;!
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Top
          name={"Alicia Arpaia"}
          role={"Sorociné"}
          top={[
            ["Hester Street", "Joan Micklin Silver (1975)"],
            [
              "Les Aventures du prince Ahmed",
              "Lotte Reiniger, Carl Koch (1926)",
            ],
            ["Wanda", "Barbara Loden (1970)"],
            [
              "Jeanne Dielman",
              "23, quai du Commerce, 1080 Bruxelles, Chantal Akerman (1975)",
            ],
            ["Le Challat de Tunis", "Kaouther Ben Hania (2014)"],
            ["Récréations", "Claire Simon (1992)"],
            ["Nous étions jeunes", "Binka Zhelyazkova (1961)"],
            ["Haut les coeurs!", "Solveig Anspach (1998)"],
            ["La dame de Constantinople", "Judit Elek (1969)"],
            ["Lumière", "Jeanne Moreau (1976)"],
          ]}
        />
        <Top
          name={"Luc Chessel"}
          role={"Critique, Libération"}
          top={[
            ["Déménagement", "Shinji Sōmai (1993)"],
            ["Sois belle et tais-toi", "Delphine Seyrig (1977)"],
            ["L'amour fou", "Jacques Rivette (1969)"],
            ["Beyrouth ma ville", "Jocelyne Saab (1982)"],
            ["Numéro zéro", "Jean Eustache (1971)"],
            [
              "Jeanne Dielman",
              "23, quai du Commerce, 1080 Bruxelles, Chantal Akerman (1975)",
            ],
            ["Mes petites amoureuses", "Jean Eustache (1974)"],
            ["Le Festin nu", "David Cronenberg (1991)"],
            [
              "Amerika – Rapports de classe",
              "Jean-Marie Straub, Danièle Huillet (1984)",
            ],
            ["Classified People", "Yolande Zauberman (1987)"],
          ]}
        />
        <Top
          name={"Victor Courgeon"}
          role={"Programmateur, Cinéma Le Méliès"}
          top={[
            ["L'Âme sœur", "Fredi M. Murer (1985)"],
            ["Unrelated", "Joanna Hogg (2007)"],
            ["The Appointment", "Lindsey C. Vickers (1981)"],
            ["Déménagement", "Shinji Sōmai (1993)"],
            ["Vengeance Is Mine", "Michael Roemer (1984)"],
          ]}
        />
        <Top
          name={"Marin Gérard"}
          role={"Critique, Critikat"}
          top={[
            ["L'Homme qui en savait trop", "Alfred Hitchcock (1956)"],
            ["La Blonde framboise", "Raoul Walsh (1941)"],
            [
              "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",
              "Chantal Akerman (1975)",
            ],
            ["Le Secret derrière la porte", "Fritz Lang (1948)"],
            ["Le Songe de la lumiere", "Victor Erice (1992)"],
            ["Welfare", "Frederick Wiseman (1975)"],
            ["Le Diable probablement", "Robert Bresson (1977)"],
            ["My Dinner With André", "Louis Malle (1981)"],
            ["La vie ne me fait pas peur", "Noémie Lvovsky (1999)"],
            ["Remorques", "Jean Gremillon (1941)"],
          ]}
        />
        <Top
          name={"Pauline Jannon"}
          role={"SuperSeven"}
          top={[
            ["Spider", "David Cronenberg (2002)"],
            ["Guerre et Paix", "Sergey Bondarchuk (1966)"],
            ["Pasqualino", "Lina Wertmüller (1975)"],
            ["Kasaba", "Nuri Bilge Ceylan (1997)"],
            ["Jonas qui aura 25 ans en l’an 2000", "Alain Tanner (1976)"],
            ["Il giovedi", "Dino Risi (1964)"],
            ["Out-takes from the life of a happy man", "Jonas Mekas (2012)"],
            ["Ghost Dog: la voie du samourai", "Jim Jarmusch (1999)"],
            ["Bonjour", "Yasujirô Ozu (1959)"],
            ["Cette sacrée vérité", "Leo McCarey (1937)"],
          ]}
        />
        <Top
          name={"Sylvain Lefort"}
          role={"Revus & Corrigés"}
          top={[
            ["Les Soeurs Munekata", "Yasujirô Ozu (1950)"],
            ["Intolérance", "D.W. Griffith (1916)"],
            ["Une vie difficile", "Dino Risi (1961)"],
            ["Au fil du temps", "Wim Wenders (1976)"],
            ["Daniel", "Sidney Lumet (1983)"],
            [
              "Jeanne Dielman",
              "23, quai du Commerce, 1080 Bruxelles, Chantal Akerman (1975)",
            ],
            ["Petulia", "Richard Lester (1968)"],
            ["La Bataille d'Alger", "Gillo Pontecorvo (1966)"],
            ["Graffiti Party", "John Milius (1978)"],
            ["Vie privée", "Louis Malle (1962)"],
          ]}
        />
        <Top
          name={"Joachim Lepastier"}
          role={"Critique, AOC"}
          top={[
            ["Gallipoli", "Peter Weir (1981)"],
            ["Rouge Sang", "Rudolf Thome (1970)"],
            ["Messidor", "Alain Tanner (1978)"],
            [
              "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles",
              "Chantal Akerman (1975)",
            ],
            ["House", "Nobuhiko Ôbayashi (1977)"],
            ["Bungalow pour femmes", "Raoul Walsh (1956)"],
            ["Un bourgeois tout petit", "petit, Mario Monicelli (1977)"],
            ["Storie di vita e malavita", "Carlo Lizzani (1975)"],
            ["Seule contre la mafia", "Damiano Damiani (1970)"],
            ["Confidences pour confidences", "Pascal Thomas (1978)"],
          ]}
        />
        <Top
          name={"Matteu Maestracci"}
          role={"Critique"}
          top={[
            ["Violent Cop", "Takeshi Kitano (1989)"],
            ["Autour de minuit", "Bertrand Tavernier (1986)"],
            ["Taram et le chaudron magique", "Ted Berman, Richard Rich (1985)"],
            ["Mais vous êtes fous", "Audrey Diwan (2018)"],
            ["Hôtel des Amériques", "André Téchiné (1981)"],
          ]}
        />
        <Top
          name={"Nicolas Moreno"}
          role={"Tsounami"}
          top={[
            [
              "Les Quatre cavaliers de l'apocalypse",
              "Vincente Minnelli (1962)",
            ],
            ["La Clepsydre", "Wojciech Has (1973)"],
            ["Nanouk l'Esquimau", "Robert J. Flaherty (1922)"],
            ["Shoah", "Claude Lanzmann (1985)"],
            [
              "Guerre et paix - Episode 1: Andreï Bolkonski",
              "Sergey Bondarchuk (1966)",
            ],
            ["Reminiscences of a Journey to Lithuania", "Jonas Mekas (1971)"],
            ["L'amour fou", "Jacques Rivette (1969)"],
            ["Wanda", "Barbara Loden (1970)"],
            ["Jack le magnifique", "Peter Bogdanovich (1979)"],
            ["Les Chants de Mandrin", "Rabah Ameur-Zaïmeche (2011)"],
          ]}
        />
        <Top
          name={"Nicolas Pariser"}
          role={"Réalisateur"}
          top={[
            ["Saraband", "Ingmar Bergman (2003)"],
            ["S.O.B.", "Blake Edwards (1981)"],
            ["La Vengeance est à Moi", "Shôhei Imamura (1979)"],
            ["Elle s'appelait Scorpion", "Shun'ya Itō (1972)"],
            ["Massacre à la tronçonneuse", "Tobe Hooper (1974)"],
            ["Le Gaucho", "Jacques Tourneur (1952)"],
            ["Du rouge pour un truand", "Lewis Teague (1979)"],
            ["The Big Wednesday", "John Milius (1978)"],
            ["Voyage sans retour", "Tay Garnett (1932)"],
            ["Contes cruels de la jeunesse", "Nagisa Oshima (1960)"],
          ]}
        />
        <Top
          name={"Eric Vernay"}
          role={"Critique, SoFilm"}
          top={[
            ["Larmes de joie", "Mario Monicelli (1960)"],
            ["Un vrai crime d'amour", "Luigi Comencini (1974)"],
            ["Une vie difficile", "Dino Risi (1961)"],
            ["Un Jeu brutal", "Jean-Claude Brisseau (1983)"],
            ["Récit d'un propriétaire", "Yasujirô Ozu (1947)"],
            ["Daisy Miller", "Peter Bogdanovich (1974)"],
            ["San Babila : un crime inutile", "Carlo Lizzani (1976)"],
            ["La rupture", "Claude Chabrol (1970)"],
            ["Chère Louise", "Philippe de Broca (1972)"],
            ["Avant de t'aimer", "Ida Lupino, Elmer Clifton (1949)"],
          ]}
        />
      </div>
      <br />
      <br />
      Plutôt que de nous faire part de ses plus belles découvertes de l’année,
      Jean-Michel Frodon a choisi ses coups de cœur parmi tous les films que
      nous avons sélectionnés dans les conseils hebdomadaires de notre
      newsletter en 2023. Les voici&nbsp;:
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Top
          name={"Jean-Michel Frodon"}
          role={"Critique"}
          top={[
            ["Adieu Philippine", "Jacques Rozier (1963)"],
            ["Ce vieux rêve qui bouge", "Alain Guiraudie (2000)"],
            ["Certaines Femmes", "Kelly Reichardt (2016)"],
            ["Histoire d'un secret", "Mariana Otero (2003)"],
            ["L'amour fou", "Jacques Rivette (1969)"],
            ["La Maman et la Putain", "Jean Eustache (1972)"],
            ["Le Diable probablement", "Robert Bresson (1977)"],
            ["Le Goût de la cerise", "Abbas Kiarostami (1997)"],
            ["Le Joli Mai, Chris Marker", "Pierre Lhomme (1963)"],
            ["Les Fleurs de Shanghai", "Hou Hsiao-Hsien (1998)"],
            ["Les Soeurs Munekata", "Yasujirô Ozu (1950)"],
            ["Loulou", "Maurice Pialat (1980)"],
            ["Ma nuit chez Maud", "Eric Rohmer (1969)"],
            ["Nothing But a Man", "Michael Roemer (1964)"],
            ["Outrage", "Ida Lupino (1950)"],
            ["Palomita blanca", "Raoul Ruiz (1973)"],
            ["Portrait of Jason", "Shirley Clarke (1967)"],
            ["Rio Bravo", "Howard Hawks (1959)"],
            ["Touki-bouki", "Djibril Diop Mambety (1973)"],
            ["Tropical Malady", "Apichatpong Weerasethakul (2004)"],
            ["Une femme sous influence", "John Cassavetes (1974)"],
            ["Wanda", "Barbara Loden (1970)"],
            ["Welfare", "Frederick Wiseman (1975)"],
            [
              "Wesh Wesh, qu'est-ce qui se passe ?",
              "Rabah Ameur-Zaïmeche (2001)",
            ],
          ]}
        />
      </div>
    </>
  );
}
