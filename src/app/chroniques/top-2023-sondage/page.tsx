import { Metadata } from "next";
import Image from "next/image";
import React from "react";

import Top from "@/components/top";

import ranking from "./img/ranking.png";

export const metadata: Metadata = {
  title: "Top 2023 | Le Rétro Projecteur — Cinéma de patrimoine à Paris",
  description: "Créer l'événement autour du cinéma de patrimoine.",
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
          name={"Joachim Lepastier"}
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
          name={"Nicolas Pariser"}
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
          name={"Marin Gérard"}
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
      </div>
    </>
  );
}
