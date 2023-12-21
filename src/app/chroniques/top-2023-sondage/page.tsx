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
      <h1>Top 2023 : Vos plus belles découvertes de l’année</h1>
      <br />
      Cette année, nous avons voulu, pour la première fois, vous consulter pour
      savoir quelles étaient vos plus belles découvertes de vieux films. Avec un
      tel champ des possibles, vos réponses ont forcément été extrêmement
      diverses. Parmi les XXX bulletins reçus, nous recensons plus de XXX
      différents films mentionnés (de XX différents réalisateurs). Malgré tout,
      de réelles tendances se dessinent, liées à ce que nous pourrions appeler
      “l’actualité du cinéma de patrimoine” : ressorties, rétrospectives,
      événements spéciaux…
      <br />
      <br />
      <Image
        width={700}
        height={394}
        className="post-image"
        src={ranking}
        alt=""
      />
      <p className="post-image-caption">
        N.B.&nbsp;: Étaient éligible tout film de plus de 3 ans. Nous avons pris
        la liberté de regrouper les votes pour les différentes parties de{" "}
        <i>Guerre et Paix</i> en un seul film.
      </p>
      Sans grande surprise, l’événement de l’année en termes de cinéma de
      patrimoine a été la ressortie en MOIS dernier de Jeanne Dielman. Le film,
      qui venait d’être consacrée “meilleur film de tous les temps” lors de
      fameux sondage décennal de Sight & Sound, a été mentionné par 49 d’entre
      vous. Les autres événements : la rétrospective intégrale Jean Eustache,
      Indéniablement, la ressortie de Jeanne Dielman a été l’événement majeur du
      cinéma de patrimoine de l’année. Frileux à l’idée de le voir chez soi, les
      cinéphiles se sont rués
      <br />
      <br />
      Cette année, le Prix Lumière (hommage rendu à une figure majeure du
      septième art) était remis à <strong>Wim Wenders</strong>. L&apos;immense
      majorité de ses films était donc proposée dans la programmation. Pour le
      plus grand bonheur de nos lecteurs et lectrices à Paris, on notera que la
      rétrospective ainsi concoctée a déjà trouvé le chemin des écrans de la
      capitale (depuis le 25 octobre). Pour nous, cela a été l&apos;occasion de
      se faire recaler de justesse pour une séance de <i>Paris, Texas</i>, mais
      aussi de profiter de la ‘Carte blanche à Wim Wenders&apos;. Idée
      géniale&nbsp;: tous les ans, le récipiendaire du prix s&apos;improvise
      aussi programmateur. Le choix de Wenders de projeter notamment{" "}
      <i>Beau Travail</i> (Claire Denis) et <i>Enter The Void</i> (Gaspar Noé),
      deux œuvres ultra stylisées et sensorielles, avait de quoi surprendre
      quelque peu. Une invitation à envisager différemment sa propre
      œuvre&nbsp;?
      <br />
      <h2>Tops de personnalités du monde du cinéma</h2>
      Le Rétro Projecteur a également eu l’occasion de solliciter des
      contributions de la part de différentes personnes du monde du cinéma :
      critiques institutionnel·le·s ou indépendant·e·s, cinéastes, membres
      d’associations promouvant le cinéma, … On est très reconnaissant à toutes
      ces personnalités !
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Top
          name={"Joachim Lepastier (Critique)"}
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
            ["Storie di vita e malavita", "Carlo Lizzani, Mino Giarda (1975)"],
            ["Seule contre la mafia", "Damiano Damiani (1970)"],
            ["Confidences pour confidences", "Pascal Thomas (1978)"],
          ]}
        />
        <Top
          name={"Nicolas Pariser (Réalisateur)"}
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
          name={"Eric Vernay (Critique)"}
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
        <Top
          name={"Marin Gérard (Critique, Critikat)"}
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
          name={"Luc Chessel (Libération)"}
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
          name={"Nicolas Moreno (Tsounami)"}
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
          name={"Pauline Jannon (SuperSeven)"}
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
          name={"Sylvain Lefort (Revus & Corrigés)"}
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
          name={"Alicia Arpaia (Sorociné)"}
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
          name={"Matteu Maestracci (Critique)"}
          top={[
            ["Violent Cop", "Takeshi Kitano (1989)"],
            ["Autour de minuit", "Bertrand Tavernier (1986)"],
            ["Taram et le chaudron magique", "Ted Berman, Richard Rich (1985)"],
            ["Mais vous êtes fous", "Audrey Diwan (2018)"],
            ["Hôtel des Amériques", "André Téchiné (1981)"],
          ]}
        />
        <Top
          name={"Victor Courgeon (Cinéma Le Méliès)"}
          top={[
            ["L'Âme sœur", "Fredi M. Murer (1985)"],
            ["Unrelated", "Joanna Hogg (2007)"],
            ["The Appointment", "Lindsey C. Vickers (1981)"],
            ["Déménagement", "Shinji Sōmai (1993)"],
            ["Vengeance Is Mine", "Michael Roemer (1984)"],
          ]}
        />
        <Top
          name={"Jean-Michel Frodon (Critique)"}
          top={[
            ["Adieu Philippine", "Jacques Rozier (1963)"],
            ["Ce vieux rêve qui bouge", "Alain Guiraudie (2000)"],
            ["Certaines Femmes", "Kelly Reichardt (2016)"],
            ["Histoire d&#39;un secret", "Mariana Otero (2003)"],
            ["L&#39;amour fou", "Jacques Rivette (1969)"],
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
              "Wesh Wesh, qu&#39;est-ce qui se passe ?",
              "Rabah Ameur-Zaïmeche (2001)",
            ],
          ]}
        />
      </div>
    </>
  );
}
