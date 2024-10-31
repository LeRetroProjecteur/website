import { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

import {
  FirstRow,
  MiddleColumn,
  MiddleColumnImageAndTitle,
  Section,
  SectionHeader,
  ThreeColumnLayout,
} from "../components";
import adieu from "./img/adieu.jpg";
import evangile from "./img/evangile.jpg";
import lola from "./img/lola.jpg";
import mamanputain from "./img/mamanputain.jpg";
import pictureshow from "./img/pictureshow.jpg";
import silence from "./img/silence.jpg";
import variety from "./img/variety.jpg";
import { info } from "./pageInfo";

export const metadata: Metadata = {
  title: info.title,
};

export default function Page() {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>{info.title}</SousTitre1>
      </PageHeader>
      <ThreeColumnLayout>
        <FirstRow
          type={info.type}
          date={info.date}
          image={info.icon}
          alt={info.title}
        />
        <MiddleColumn>
          <div className="pb-35px lg:pb-50px">
            <BodyCopy>
              Il y a maintenant un peu plus d&apos;un an, et alors même que
              l&apos;industrie du cinéma venait à peine de se
              «&nbsp;déconfiner&nbsp;», nous avons lancé Le Rétro Projecteur
              avec cette focalisation totalement déraisonnable de ne
              s&apos;intéresser qu&apos;au cinéma de patrimoine (!) exploité en
              salles (!!). À l&apos;aune de cette première année, nous avons eu
              envie de revenir sur nos plus beaux souvenirs de projections de
              vieux films à Paris.
              <br />
              <br />
              Si l&apos;année a indéniablement été marquée par la ressortie
              massive de{" "}
              <Link className="underline" href="/film/maman-putain-1972">
                <i>La maman et la putain</i>
              </Link>
              , elle a aussi été riche en découvertes d&apos;œuvres moins
              connues (comme le merveilleux{" "}
              <Link className="underline" href="/film/variety-1983">
                <i>Variety</i>
              </Link>{" "}
              de Bette Gordon ou{" "}
              <Link className="underline" href="/film/grand-silence-1968">
                <i>Le grand silence</i>
              </Link>{" "}
              de Sergio Corbucci). À cela se rajoutent les rétrospectives de
              Fassbinder, de Pasolini, de Kinuyo Tanaka ou encore de Jean-Luc
              Godard et Peter Bogdanovich à la suite de leur décès.
              <br />
              <br />
              Suivre de près l&apos;actualité du cinéma de patrimoine en salles
              invite inévitablement à s&apos;interroger sur le type de cinéma
              qui est promu par les programmateurs. En cela, la rediffusion de
              vieux films est un baromètre de la perception que nous avons
              aujourd&apos;hui du canon cinématographique. Nous reviendrons très
              vite sur cela avec une analyse détaillée des réalisateurs, régions
              et décennies qui ont dominé l&apos;année 2022.
              <br />
              <br />
              En attendant, nous sommes curieux de savoir ce que vous en avez
              pensé, vous, de cette année 2022. Quelles œuvres avez-vous préféré
              (re)découvrir en salles cette année&nbsp;? Qu&apos;avez-vous pensé
              de la programmation et des diverses rétrospectives&nbsp;? Quel
              cinéma de patrimoine souhaiteriez-vous retrouver plus souvent dans
              les salles parisiennes&nbsp;? N&apos;hésitez pas à nous faire part
              de vos impressions{" "}
              <a href="mailto:contact@leretroprojecteur.com">par mail</a>
              &nbsp;!
              <br />
              <br />
              En espérant qu&apos;en 2023 Le Rétro Projecteur continuera à vous
              aiguiller vers la séance d&apos;un vieux classique que vous rêvez
              de revoir ou d&apos;une pépite méconnue fraîchement
              restaurée&nbsp;!
              <br />
              <br />
              Bonne année et à bientôt dans les salles,
              <br />
              <br />
              -&nbsp;Le Rétro Projecteur
              <br />
              Le 2 janvier 2023
            </BodyCopy>
          </div>
          <Section>
            <SectionHeader>Notre top 2022</SectionHeader>
            <MiddleColumnImageAndTitle
              image={variety}
              alt="Variety"
              title={
                <>
                  <Link className="underline" href="/film/variety-1983">
                    <i>Variety</i>
                  </Link>{" "}
                  de Bette Gordon (1983), vu le 16 juin au Christine
                </>
              }
            />
            <BodyCopy>
              Le plaisir de découvrir ce film en version restaurée a été
              d&apos;autant plus grand que nous ne connaissions pas l&apos;œuvre
              de Bette Gordon.{" "}
              <Link className="underline" href="/film/variety-1983">
                <i>Variety</i>
              </Link>{" "}
              est un film qui a pour sujet le fait-même de se faire des films.
              Qui plus est : une bonne partie du récit se déroule carrément dans
              un cinéma (porno)&nbsp;! La réalisatrice nous plonge dans une
              ambiance mystérieuse, qui sollicite constamment notre imagination…
              Un chef d&apos;œuvre de suggestion.
            </BodyCopy>
          </Section>
          <Section>
            <MiddleColumnImageAndTitle
              image={mamanputain}
              alt="La maman et la putain"
              title={
                <>
                  <Link className="underline" href="/film/maman-putain-1972">
                    <i>La maman et la putain</i>
                  </Link>{" "}
                  de Jean Eustache (1983), vu le 18 juin au Mk2 Bastille
                </>
              }
            />
            <BodyCopy>
              Jusqu&apos;alors, les cinéphiles se refilaient sous le manteau des
              versions plus ou moins dégradées de ce film culte, jamais édité en
              DVD. Dans la frénésie que provoqua sa simple ressortie, on en
              oublierait presque de rappeler à quel point l&apos;œuvre est
              géniale. Dans un étrange mélange d&apos;anarchisme post-68ard et
              de dandysme, et au fil de longues scènes dialoguées à la mise en
              scène sèche, Eustache explore les impasses d&apos;une révolution
              sexuelle en train de se faire. Le format minimaliste de
              l&apos;image, proche du carré, rendait paradoxalement
              l&apos;expérience cinéma (au premier rang d&apos;une salle bondée
              en pleine canicule) d&apos;autant plus précieuse.
            </BodyCopy>
          </Section>
          <Section>
            <MiddleColumnImageAndTitle
              image={lola}
              alt="Lola, une femme allemande"
              title={
                <>
                  <Link
                    className="underline"
                    href="/film/lola-femme-allemande-1981"
                  >
                    <i>Lola, une femme allemande</i>
                  </Link>{" "}
                  de Rainer Werner Fassbinder (1981), vu le 18 août à
                  l&apos;Espace Saint-Michel
                </>
              }
            />
            <BodyCopy>
              Quarante ans après sa mort, Fassbinder était de retour, le temps
              d&apos;un été, sur les écrans de la capitale. La redécouverte de
              son œuvre nous a permis de mesurer combien l&apos;expressionnisme
              de sa scénographie, son ironie mordante et son incroyable
              impertinence se sont tristement raréfiés dans le paysage
              cinématographique contemporain. Poil à gratter jusque dans sa mise
              en scène, Fassbinder fonde l&apos;un de ses plus beaux films,{" "}
              <Link
                className="underline"
                href="/film/lola-femme-allemande-1981"
              >
                <i>Lola, une femme allemande</i>
              </Link>
              , sur un magnifique contrepied en nichant dans une légère comédie
              de mœurs un véritable brûlot politique au cynisme dévorant.
            </BodyCopy>
          </Section>
          <Section>
            <MiddleColumnImageAndTitle
              image={evangile}
              alt="L'Évangile selon Saint Matthieu"
              title={
                <>
                  <Link
                    className="underline"
                    href="/film/evangile-selon-saint-matthieu-1964"
                  >
                    <i>L&apos;Evangile selon Saint Matthieu</i>
                  </Link>{" "}
                  de Pier Paolo Pasolini (1964), vu le 4 septembre au Champo
                </>
              }
            />
            <BodyCopy>
              Autre grand cinéaste à l&apos;honneur cet été&nbsp;: Pierre Paolo
              Pasolini. S&apos;il partage avec Fassbinder son esprit provocateur
              et incendiaire (voir les Cahiers du Cinéma n°789), il se démarque
              par l&apos;omniprésence de thèmes en lien avec le christianisme
              dans son œuvre. Son traitement de ceux-ci peut relever aussi bien
              de la subversion que de la revitalisation. Dans{" "}
              <Link
                className="underline"
                href="/film/evangile-selon-saint-matthieu-1964"
              >
                <i>L&apos;Evangile selon Saint Matthieu</i>
              </Link>
              , le déplacement des représentations habituelles de scènes
              bibliques est double&nbsp;: Jésus est interprété par un
              syndicaliste catalan en lutte contre le franquisme et le style est
              bien plus proche de celui du documentaire que du péplum ou de
              l&apos;hagiographie.
            </BodyCopy>
          </Section>
          <Section>
            <MiddleColumnImageAndTitle
              image={pictureshow}
              alt="La Dernière séance"
              title={
                <>
                  <Link
                    className="underline"
                    href="/film/la-derniere-seance-1971"
                  >
                    <i>La Dernière séance</i>
                  </Link>{" "}
                  de Peter Bogdanovich (1971), vu le 18 mai au Forum des Images
                </>
              }
            />
            <BodyCopy>
              Décédé cette année, Peter Bogdanovich s&apos;est illustré aussi
              bien par sa propre œuvre que par son rôle de passeur cinéphilique.
              Ce n&apos;est donc peut-être pas un hasard si son film le plus
              connu s&apos;intéresse à la transmission de la mémoire. Dans une
              petite ville d&apos;Anarene, Texas, en plein dépeuplement, les
              parents cherchent à délester leur mélancolie sur la fringante
              jeunesse, la rendant nostalgique de souvenirs qu&apos;elle ne
              vivra jamais. Revoir{" "}
              <Link className="underline" href="/film/la-derniere-seance-1971">
                <i>La Dernière séance</i>
              </Link>{" "}
              dans une salle de cinéma à l&apos;heure où les oiseaux de mauvais
              augure nous prédisent les “dernières séances” de celles-ci, donne
              au film une épaisseur toute particulière...
            </BodyCopy>
          </Section>
          <Section>
            <MiddleColumnImageAndTitle
              image={silence}
              alt="Le Grand Silence"
              title={
                <>
                  <Link className="underline" href="/film/grand-silence-1968">
                    <i>Le grand silence</i>
                  </Link>{" "}
                  de Sergio Corbucci (1968), vu le 10 avril au Max Linder
                </>
              }
            />
            <BodyCopy>
              Aux côtés de Leone et Sollima, Corbucci est l&apos;un des “trois
              Sergio” à avoir durablement marqué le genre du western spaghetti.
              Avec{" "}
              <Link className="underline" href="/film/grand-silence-1968">
                <i>Le grand silence</i>
              </Link>
              , il réalise son chef-d&apos;œuvre mêlant les paysages hivernaux
              grandioses de l&apos;Utah à la musique envoûtante d&apos;Ennio
              Morricone. Le duel au sommet de deux pistoleros (Klaus Kinsky en
              cruel chasseur de prime et Jean-Louis Trintignant en cowboy
              bienveillant qui a perdu l&apos;usage de la parole) tient en
              haleine pendant tout le film, mais c&apos;est surtout le cynisme
              du final que l&apos;on garde en tête, tant il n&apos;avait rien à
              envier à celui de l&apos;exercice électoral auquel on s&apos;était
              soumis quelques heures plus tôt...
            </BodyCopy>
          </Section>
          <Section>
            <MiddleColumnImageAndTitle
              image={adieu}
              alt="Adieu au langage"
              title={
                <>
                  <Link
                    className="underline"
                    href="/film/adieu-au-langage-2014"
                  >
                    <i>Adieu au langage</i>
                  </Link>{" "}
                  de Jean-Luc Godard (2014), vu le 23 septembre au Mk2 Beaubourg
                </>
              }
            />
            <BodyCopy>
              Les adieux à Godard provoquèrent son retour sur les écrans de la
              capitale et la découverte de ce film fou… Ou comme la promesse que
              l&apos;intempérance et l&apos;inépuisable modernité du Suisse
              demeureront immortelles.
            </BodyCopy>
          </Section>
        </MiddleColumn>
      </ThreeColumnLayout>
    </>
  );
}
