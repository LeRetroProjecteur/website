import { Metadata } from "next";

import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

import { FirstRow, MiddleColumn, ThreeColumnLayout } from "../components";
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
        <FirstRow info={info} />
        <MiddleColumn>
          <BodyCopy>
            <b>
              Que celles et ceux qui auraient &eacute;t&eacute;
              d&eacute;&ccedil;us par la nouvelle adaptation du{" "}
              <em>Comte de Monte Cristo</em> ne se d&eacute;solent pas et que
              les autres se r&eacute;jouissent&nbsp;: il y en a
              d&rsquo;autres&nbsp;! beaucoup d&rsquo;autres&nbsp;!
            </b>
          </BodyCopy>
          <br />
          <BodyCopy>
            Si la litt&eacute;rature a toujours constitu&eacute; un
            pr&eacute;cieux fond d&rsquo;histoires pour le cin&eacute;ma,
            l&rsquo;&oelig;uvre d&rsquo;Alexandre Dumas est une vraie mine
            d&rsquo;or &nbsp;: <em>La Reine Margot</em>,{" "}
            <em>Les Trois Mousquetaires</em>, <em>Le Comte de Monte-Cristo</em>{" "}
            ont fourni la mati&egrave;re d&rsquo;un grand nombre de films
            &ndash; et d&rsquo;ailleurs aucun livre n&rsquo;a &eacute;t&eacute;
            plus adapt&eacute; au cin&eacute;ma que ce dernier. &Agrave; la mort
            de l&rsquo;auteur, Victor Hugo &eacute;crivait : &laquo;&nbsp;Le nom
            d&apos;Alexandre Dumas est plus que fran&ccedil;ais, il est
            europ&eacute;en&nbsp;; il est plus qu&apos;europ&eacute;en, il est
            universel. Son th&eacute;&acirc;tre a &eacute;t&eacute;
            affich&eacute; dans le monde entier&nbsp;; ses romans ont
            &eacute;t&eacute; traduits dans toutes les langues. &raquo;&nbsp; Le
            cin&eacute;ma a prolong&eacute; ses succ&egrave;s.
            L&rsquo;&eacute;tendue temporelle et spatiale des adaptations des
            aventures d&rsquo;Edmond Dant&egrave;s est sans commune
            mesure&nbsp;: France, Italie, &Eacute;tats-Unis, Allemagne, Mexique,
            Argentine, Union sovi&eacute;tique, &Eacute;gypte, Inde,
            Cor&eacute;e du Sud, Hong Kong&hellip; rares sont les pays qui
            n&rsquo;ont pas leur version nationale. L&rsquo;histoire du{" "}
            <em>Comte de Monte-Cristo</em> a tellement influenc&eacute;
            l&rsquo;imaginaire moderne de la vengeance qu&rsquo;il est difficile
            de recenser pr&eacute;cis&eacute;ment les adaptations du roman
            d&rsquo;Alexandre Dumas. La sortie du film de Matthieu Delaporte et
            Alexandre De La Patelli&egrave;re offre l&rsquo;occasion de se
            replonger dans les aventures d&rsquo;Edmond Dant&egrave;s sur le
            grand &eacute;cran.
          </BodyCopy>
          <br />
          <BodyCopy>
            L&rsquo;histoire du cin&eacute;ma et celle du{" "}
            <em>Comte de Monte-Cristo</em> sont plus intimement li&eacute;es
            qu&rsquo;on ne pourrait le croire ; l&rsquo;une retrace
            l&rsquo;autre et vice versa. D&egrave;s les d&eacute;buts du
            cin&eacute;matographe, et alors que les films ne durent qu&rsquo;une
            quinzaine de minutes, les cin&eacute;astes se tournent vers ce
            monument de la litt&eacute;rature. En janvier 1908, sur la plage de
            Laguna Beach en Californie, Francis Boggs tourne les sc&egrave;nes
            d&rsquo;ext&eacute;rieur d&rsquo;un film produit par William Selig :
            un homme sort des flots. Cet homme incarnait Edmond Dant&egrave;s et
            ce film s&rsquo;appelait <em>The Count of Monte Cristo</em>. La
            douceur du climat californien et le succ&egrave;s du film inciteront
            William Selig &agrave; fonder une entreprise de production
            bas&eacute;e &agrave; Los Angeles.{" "}
            <em>The Count of Monte Cristo,</em> consid&eacute;r&eacute; comme
            l&rsquo;un des tous premiers films produits en Californie, marquait
            le commencement de la grande histoire d&rsquo;Hollywood.
          </BodyCopy>
          <br />
          <BodyCopy>
            Quatre ans plus tard, Selig produit un remake&nbsp;; le r&ocirc;le
            d&rsquo;Edmond Dant&egrave;s est tenu par le m&ecirc;me acteur,
            Hobart Bosworth. Seulement, entre-temps, un certain Adolph Zukor a
            acquis les droits d&rsquo;adaptation du roman et a produit une
            version de 69 minutes (dur&eacute;e exceptionnelle pour
            l&rsquo;&eacute;poque), r&eacute;alis&eacute;e par un autre pionnier
            du cin&eacute;ma&nbsp;: Edwin S. Porter&nbsp;; il fait retirer le
            film de Selig de la circulation. <em>The Count of Monte Cristo </em>
            rencontre un grand succ&egrave;s populaire et lance la
            soci&eacute;t&eacute; de ce jeune producteur ambitieux : la{" "}
            <em>Famous Players Film Company</em>, qui trois ans plus tard
            deviendra la <em>Paramount</em>. Zukor avait choisi cette histoire
            parce que son adaptation au th&eacute;&acirc;tre rencontrait alors
            un succ&egrave;s consid&eacute;rable aux &Eacute;tats-Unis. Pour
            incarner le r&ocirc;le principal, il avait embauch&eacute; James
            O&rsquo;Neill, acteur d&rsquo;origine irlandaise qui, par sa
            fid&eacute;lit&eacute; au roman de Dumas m&eacute;rite qu&rsquo;on
            s&rsquo;y attarde. En 1883 &agrave; New York, James O&rsquo;Neill
            remplace au pied lev&eacute; l&rsquo;acteur principal d&rsquo;un
            Monte Cristo qui ne rencontrait alors qu&rsquo;un succ&egrave;s
            mod&eacute;r&eacute;&nbsp;; le public l&rsquo;adore ; il passera sa
            vie &ndash; plus de 6000 repr&eacute;sentations en 40 ans &ndash;
            dans la peau d&rsquo;Edmond Dant&egrave;s. Il mourut millionnaire et
            c&eacute;l&eacute;brissime, mais, selon les mots de son propre fils,
            le c&eacute;l&egrave;bre dramaturge Eugene O&rsquo;Neill,
            &ldquo;bris&eacute;, malheureux et terriblement amer&rdquo;.
          </BodyCopy>
          <br />
          <BodyCopy>
            Pendant ce temps-l&agrave;, Edmond Dant&egrave;s commen&ccedil;ait
            sa carri&egrave;re cin&eacute;matographique en France. Apr&egrave;s
            une toute premi&egrave;re version datant de 1908, dans laquelle il
            &eacute;tait jou&eacute; par Charles Krauss &ndash;
            interpr&egrave;te, au d&eacute;but des ann&eacute;es 1910, du
            policier &agrave; la poursuite de Zigomar, grand criminel
            contemporain de Fant&ocirc;mas, dont la post&eacute;rit&eacute; est
            assur&eacute;e par Denis Podalyd&egrave;s et son bateau, dans{" "}
            <em>Libert&eacute; Ol&eacute;ron</em> (2001) &ndash;, en 1913 le
            cin&eacute;ma fran&ccedil;ais lui offre un nouveau film, mis en
            sc&egrave;ne par Michel Carr&eacute;, le sc&eacute;nariste de{" "}
            <em>L&rsquo;Assommoir </em>d&rsquo;Albert Capellani. Entre 1915 et
            1917, Henri Pouctal r&eacute;alise une version de trois heures,
            qu&rsquo;il souhaite aussi fid&egrave;le que possible au livre et
            qu&rsquo;il tourne, dans la mesure du possible, dans les lieux
            d&eacute;crits par Dumas. Ce projet d&rsquo;une ambition folle donne
            naissance &agrave; l&rsquo;un des premiers grands film-fleuves
            fran&ccedil;ais, que Henri Langlois consid&eacute;rait comme
            l&rsquo;un des films qu&rsquo;enfant il avait
            pr&eacute;f&eacute;r&eacute;s.
          </BodyCopy>
          <br />
          <BodyCopy>
            Jusqu&rsquo;en 1968, les adaptations cin&eacute;matographiques se
            multiplient. Les deux versions de Robert Vernay, qui datent de 1943
            et 1954, m&eacute;ritent d&rsquo;&ecirc;tre
            mentionn&eacute;es&nbsp;: la premi&egrave;re parce qu&rsquo;elle est
            consid&eacute;r&eacute;e par beaucoup comme la meilleure adaptation
            existante (au coude &agrave; coude avec le film impressioniste de
            Henri Fescourt, de 1929)&nbsp;; la deuxi&egrave;me, dans laquelle
            Edmond Dant&egrave;s est incarn&eacute; par Jean Marais, parce
            qu&rsquo;elle offre au roman d&rsquo;Alexandre Dumas son plus grand
            succ&egrave;s populaire sur le grand &eacute;cran (pr&egrave;s de 8
            millions d&rsquo;entr&eacute;es).
          </BodyCopy>
          <br />
          <BodyCopy>
            Puis, petit &agrave; petit, la t&eacute;l&eacute;vision faisant son
            apparition dans les foyers fran&ccedil;ais, vient l&rsquo;heure des
            feuilletons&nbsp;; leur format est particuli&egrave;rement propice
            aux r&eacute;cits au long cours. &Agrave; partir de 1968, en France,
            toutes les adaptations du <em>Comte de Monte Cristo </em>sont
            produites pour la t&eacute;l&eacute;. Mais l&rsquo;imaginaire de la
            vengeance est marqu&eacute; &agrave; jamais et, au cours des
            d&eacute;cennies suivantes, des histoires inspir&eacute;es des
            aventures d&rsquo;Edmond Dant&egrave;s continuent d&rsquo;attirer
            les foules dans les salles obscures du monde entier.{" "}
            <em>V pour Vendetta</em> et <em>Oldboy</em> sont de loin les plus
            connues, mais pour les plus curieux on pourrait citer{" "}
            <em>Daerat Al-Enteqam</em> (film &eacute;gyptien de 1974) ou{" "}
            <em>Legacy of Rage</em> (film d&rsquo;action hongkongais de 1986).
            En France, il aura fallu attendre jusqu&rsquo;au 28 juin 2024 pour
            revoir Edmond Dant&egrave;s sur le grand &eacute;cran. Au vu des
            foules qui ont rempli les salles ces derni&egrave;res semaines (le
            film comptait plus de 2 millions de spectateurs 10 jours
            apr&egrave;s sa sortie), on peut parier que le film de Delaporte et
            De La Patelli&egrave;re a r&eacute;veill&eacute;
            l&rsquo;app&eacute;tit du public pour cette histoire
            in&eacute;puisable.
          </BodyCopy>
        </MiddleColumn>
      </ThreeColumnLayout>
    </>
  );
}
