import { Metadata } from "next";
import Link from "next/link";

import {
  Answer,
  ArticleLayout,
  MiddleColumn,
  Question,
} from "@/components/articles/articles";
import { BodyCopy } from "@/components/typography/typography";

import { info } from "./pageInfo";

export const metadata: Metadata = {
  title: info.title,
};

export default function Page() {
  return (
    <ArticleLayout info={info}>
      <MiddleColumn>
        <BodyCopy>
          <i>
            La deuxième édition du{" "}
            <a
              target="_blank"
              className="underline"
              href="https://campusfilmfestival.fr"
            >
              Campus Film Festival
            </a>{" "}
            aura lieu du vendredi 26 au dimanche 28 avril 2024 au cinéma
            Saint-André des Arts. En attendant le lancement, nous avons
            rencontré Marine Wagner, qui fait partie du comité d’organisation.
            L’occasion de s’interroger sur les enjeux liés à la tenue d’un
            festival de cinéma de patrimoine en salles de nos jours…
          </i>
        </BodyCopy>
        <BodyCopy>
          <Question>Qu’est-ce que le Campus Film Festival&nbsp;?</Question>
          <Answer>
            Le Campus Film Festival est un festival de cinéma organisé par des
            étudiant·es de l&apos;Université Paris 8. Notre équipe est composée
            de jeunes passionné·es de cinéma, avec des aspirations
            professionnelles variées telles que la production, la distribution
            et la médiation autour des publics du cinéma, ainsi que les métiers
            télévisuels. Lors de la première édition, qui a eu lieu en mai 2023,
            nous avons mis en avant des films abordant le thème de la jeunesse
            et du passage à l&apos;âge adulte.
          </Answer>
          <Question>
            Comment avez-vous pensé la programmation cette année&nbsp;?
          </Question>
          <Answer>
            <div>
              Tout en restant dans la lignée de la précédente édition nous avons
              voulu, cette année, explorer des œuvres qui mêlent des
              questionnements autour de la jeunesse (premier amour, découverte
              du désir) avec des univers imaginaires et oniriques. La sélection
              combine classiques intemporels et récits contemporains. Léa Mysius
              nous fait l’honneur d’être la marraine de notre festival et
              présentera son film{" "}
              <Link className="underline" href="/film/ava-2017">
                <i>Ava</i>
              </Link>{" "}
              (dimanche 28 avril à 20h), un coming of age unique en son genre.
            </div>
            <div>
              Le festival débute vendredi avec la projection de{" "}
              <Link className="underline" href="/film/peggy-sue-mariee-1986">
                <i>Peggy Sue s’est mariée</i>
              </Link>{" "}
              de Francis Ford Coppola à 20h, présentée par la drag-queen
              Babouchka Babouche et suivie d’une soirée blind-test et DJ-set.
              Nous accueillons également le collectif d’artistes Artemisiae qui
              exposeront leurs œuvres dans le hall du Saint-André des Arts.
              Notre sélection comprend également des films d’horreur (
              <Link className="underline" href="/film/memento-mori-1999">
                <i>Memento Mori</i>
              </Link>{" "}
              de Min Kyu-dong et Kim Tae-yong,{" "}
              <Link className="underline" href="/film/it-follows-2014">
                <i>It Follows</i>
              </Link>{" "}
              de David Robert Mitchell), un film d’animation français (
              <Link className="underline" href="/film/gwen-livre-sable-1984">
                <i>Gwen, le livre de sable</i>
              </Link>{" "}
              de Jean-François Laguionie) ou encore le classique{" "}
              <Link className="underline" href="/film/trois-femmes-1977">
                <i>Trois femmes</i>
              </Link>{" "}
              de Robert Altman.
            </div>
            <div>
              En sélectionnant ces films, nous avons cherché à créer un
              programme diversifié et équilibré, offrant quelque chose pour tous
              les goûts et toutes les sensibilités. Notre objectif était de
              susciter la réflexion, l&apos;émotion et l&apos;émerveillement
              chez le public.
            </div>
          </Answer>
          <Question>
            Quels sont les enjeux liés à l’organisation d’un festival de cinéma
            de patrimoine&nbsp;?
          </Question>
          <Answer>
            Tout repose sur l’importance de composer une programmation
            équilibrée, qui soit grand public tout en étant pointue. Nous avons
            surmonté bien des obstacles pour les films n’ayant plus de
            distributeurs français. Il faut s’improviser enquêteur·ices pour
            dénicher les coordonnées des ayants-droits, s’habituer aussi à leur
            silence, leur refus, voire même à leur revirement à quelques jours
            du festival&nbsp;! C’est l’aspect le plus incertain de la
            programmation, mais aussi le plus exaltant, lorsqu’enfin tous les
            astres s’alignent pour projeter la pépite cinématographique enfouie.
          </Answer>
          <Question>
            Quel est le public visé par le Campus Festival&nbsp;? Quel est le
            modèle économique d’un festival comme le vôtre&nbsp;?
          </Question>
          <Answer>
            <div>
              Le Campus Film Festival vise un public diversifié, mais avec une
              attention particulière portée aux jeunes spectateur·trices ainsi
              qu&apos;à celles et ceux qui apprécient la nostalgie et les
              expériences passées. En mettant l&apos;accent sur les thèmes du
              rêve, de l&apos;onirisme et des aspirations profondes de la
              jeunesse, le festival attire naturellement un public étudiant et
              jeune adulte, avide de découvertes cinématographiques
              contemporaines, mais aussi de récits classiques qui résonnent avec
              leur propre expérience de vie.
            </div>
            <div>
              Notre festival ne pourrait exister sans certaines subventions
              ainsi que nos partenaires qui nous soutiennent. Notre projet
              bénéficie notamment du dispositif Culture-ActionS, un dispositif
              des Crous de soutien aux initiatives étudiantes, et nous comptons
              également à nos partenaires la faculté de Paris 8 ainsi que la
              FSDIE.
            </div>
          </Answer>
        </BodyCopy>
      </MiddleColumn>
    </ArticleLayout>
  );
}
