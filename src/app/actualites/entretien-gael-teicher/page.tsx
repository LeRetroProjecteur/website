import { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

import {
  Answer,
  FirstRow,
  MiddleColumn,
  MiddleColumnImageAndRightColumnCaption,
  Question,
  ThreeColumnLayout,
} from "../components";
import icon from "./img/icon.jpg";
import PlusHier from "./img/plus-qu-hier.png";

export const metadata: Metadata = {
  title: "Entretien avec Gaël Teicher",
};

export default function EntretienGaelTeicher() {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>Entretien avec Gaël Teicher</SousTitre1>
      </PageHeader>
      <ThreeColumnLayout>
        <FirstRow
          type="coup de projecteur"
          date="03/07/2024"
          image={icon}
          alt="gael teicher"
        />
        <MiddleColumn>
          <BodyCopy>
            <i>
              Le premier long métrage de Laurent Achard,{" "}
              <Link
                className="underline"
                href="/film/plus-hier-moins-demain-1998"
              >
                <i>Plus qu&apos;hier, moins que demain</i>
              </Link>
              , ressort aujourd&apos;hui dans une magnifique copie restaurée.
              Lors de la présentation du film au festival Fema La Rochelle, nous
              avons eu l&apos;occasion de rencontrer Gaël Teicher qui distribue
              le film avec La Traverse. Il nous a parlé de sa collaboration avec
              Laurent Achard, de la restauration du film et de la manière dont
              celui-ci parle à notre actualité politique.
            </i>
          </BodyCopy>
          <BodyCopy>
            <Question>
              À quand remonte votre collaboration avec Laurent Achard&nbsp;?
            </Question>
            <Answer>
              En 2014, je voulais produire un portrait de Paul Vecchiali pour la
              mythique collection Cinéastes de notre temps. Vecchiali, qui était
              un excessif magnifique, m&apos;a répondu&nbsp;: le seul qui
              pourrait le faire, c’est Laurent Achard. Laurent était
              initialement réticent, n&apos;ayant jamais réalisé de
              documentaire, mais il a finalement accepté et le film est
              magnifique. On a ensuite fait trois autres portraits de cinéastes
              (Brisseau, Mazuy et Stévenin) et un court métrage avant la
              restauration de{" "}
              <Link
                className="underline"
                href="/film/plus-hier-moins-demain-1998"
              >
                <i>Plus qu&apos;hier, moins que demain</i>
              </Link>
              .
            </Answer>
            <Question>
              De qui venait l&apos;idée de restaurer le film&nbsp;?
            </Question>
            <Answer>
              <div>
                De moi. C’est un de mes films de chevet. Je trouve qu&apos;il
                est éblouissant, aussi bien dans ce qu&apos;il raconte que dans
                sa mise en scène. C&apos;est aussi un objet rare dans le paysage
                du cinéma français de ces dernières années en ce qu&apos;il
                visite un endroit et des gens dont le cinéma français s&apos;est
                beaucoup désintéressé. On est dans un petit
                «&nbsp;bled&nbsp;»&nbsp;– ce qui n&apos;est pas du tout
                péjoratif dans ma bouche&nbsp;– au fin fond de la France et on
                soulève délicatement le couvercle de la marmite pour voir le
                bouillon dessous. Et c&apos;est important de faire cela en ce
                moment. On a beau déplorer le fait que 12 millions de personnes
                votent pour le Front National, si on regardait un peu plus loin
                que nos nombrils, comme le fait Laurent ici, on éviterait
                peut-être ce genre de catastrophe. Je pense que le cinéma peut
                guérir des choses. Pas avec une ampleur monumentale, mais il
                peut guérir certaines choses…
              </div>
            </Answer>
          </BodyCopy>
        </MiddleColumn>
        <MiddleColumnImageAndRightColumnCaption
          image={PlusHier}
          alt="PlusHier"
          caption={
            <>
              <Link
                className="underline"
                href="/film/plus-hier-moins-demain-1998"
              >
                <i>Plus qu&apos;hier, moins que demain</i>
              </Link>
              , Laurent Achard (1998)
            </>
          }
        />
        <MiddleColumn>
          <BodyCopy>
            <Question>
              Comment s&apos;est passée la restauration&nbsp;?
            </Question>
            <Answer>
              Il y a deux pièges dans la restauration&nbsp;: essayer de
              retrouver exactement ce qu&apos;était le 35mm (ce qui est
              évidemment impossible) ou aller trop loin dans le côté plastique
              et métallique du numérique. Pour cela, il faut toujours
              réinterpréter. C&apos;est précieux de pouvoir faire ce travail
              avec l&apos;auteur parce qu’il a une connaissance intime de
              l&apos;œuvre. Le distributeur en a une connaissance <i>extime</i>.
              Je crois sincèrement dans le fait que c&apos;est dans cette
              rencontre qu&apos;on trouve une justesse. Quand on peut bien sûr…
              On a pu faire ce travail avec Laurent en 2018-2019. C&apos;était
              passionnant parce qu&apos;il le redécouvrait lui-même, lui qui
              revoyait très peu ses propres films. Le négatif original
              n&apos;était pas en mauvais état et on a travaillé avec un
              merveilleux laboratoire qui s&apos;appelle Cosmodigital.
            </Answer>
            <Question>
              Comment présenteriez-vous le film à quelqu&apos;un qui ne connaît
              pas l&apos;œuvre de Laurent Achard&nbsp;?
            </Question>
            <Answer>
              <div>
                C&apos;est un sommet de mise en scène et un film formidablement
                joué par des acteurs peu connus. Ils sont tous extraordinaires,
                d&apos;une justesse. On aurait tort de classer le film dans le
                naturalisme alors que ce qu&apos;il cherche à faire c&apos;est
                de transcender le réel et les sentiments par la mise en scène.
                Au moment de la sortie du film, Frédéric Strauss a écrit :
                «&nbsp;Laurent Achard croit au cinéma. Le cinéma le sauve et le
                cinéma nous sauve.&nbsp;» Je trouve que c&apos;est ce qui
                définit le mieux le film. C&apos;est un film splendide sur des
                petites gens, sur leurs drames, petits ou grands. C’est un film
                sans genre. Ce n&apos;est ni une comédie, ni une tragédie.
                C&apos;est un film choral d’un équilibre absolu. Chaque
                personnage existe. Il n&apos;y a pas de personnage principal et
                de personnage secondaire. Tout le monde est au même plan. Ce qui
                est déjà un sujet. Tu regardes tout le monde pareil et chaque
                histoire vaut la peine qu&apos;on s’y penche. Et puis,
                c&apos;est un grand film d’amour&nbsp;: l&apos;amour du cinéaste
                pour les gens.
              </div>
            </Answer>
          </BodyCopy>
        </MiddleColumn>
      </ThreeColumnLayout>
    </>
  );
}
