import PageHeader from "@/components/layout/page-header";
import { BodyCopy, SousTitre1 } from "@/components/typography/typography";

import {
  FirstRow,
  MiddleColumnImageAndRightColumnCaption,
  MiddleColumnSection,
  ThreeColumnLayout,
} from "../components";
import altman from "./img/altman.jpg";
import cuaronAnderson from "./img/cuaron-anderson.jpg";
import icon from "./img/icon.jpg";
import lyon from "./img/lyon.jpeg";
import mareeNoire from "./img/maree_noire.jpg";
import ozuRay from "./img/ozu-ray.jpg";

export default function Top2022() {
  return (
    <>
      <PageHeader text="actualités">
        <SousTitre1>Retour sur le Festival Lumière 2023</SousTitre1>
      </PageHeader>
      <ThreeColumnLayout>
        <FirstRow
          type="retour de festival"
          date="31/10/2023"
          image={icon}
          alt="lumiere"
        />
        <MiddleColumnSection>
          <BodyCopy>
            <strong>
              Créer l&apos;événement autour du cinéma de patrimoine.
            </strong>{" "}
            Ce pourrait être un bon résumé de la mission que nous nous sommes
            fixés au Rétro Projecteur à notre très modeste échelle. C&apos;est
            en tout cas ce que parvient à faire, année après année, le Festival
            Lumière à Lyon. S&apos;envisageant comme un «&nbsp;festival de
            cinéma pour tous&nbsp;», la manifestation gâte son public avec une
            programmation mêlant films rares et grands classiques. Mais
            &apos;Lumière&apos; est aujourd&apos;hui bien plus que la simple
            opportunité offerte à tout un chacun de vivre
            «&nbsp;l&apos;expérience festival&nbsp;» (avec combat de coqs sur le
            nombre de séances ingurgités à la clé). Le rendez-vous est devenu
            essentiel aussi pour bon nombre de professionnels du secteur qui
            s&apos;y retrouvent pour négocier les droits de films fraîchement
            restaurés, dans l&apos;espoir de leur donner une nouvelle vie en
            salles.
            <br />
            <br />
            Plaire à un grand public un brin nostalgique d&apos;un côté, mettre
            en lumière des films que l&apos;on croyait oubliés ou perdus de
            l&apos;autre&nbsp;: voici donc les deux bras que le festival
            parvient à manier avec une impressionnante agilité. Le succès de la
            formule est sans aucun doute pour beaucoup lié à la personne (et au
            carnet d&apos;adresses) de Thierry Frémaux, qui cumule les postes de
            directeur de l&apos;Institut Lumière et de délégué général du
            Festival de Cannes. Sa force de frappe, dont on peut logiquement
            questionner le bien fondé, permet notamment à ce qu&apos;un{" "}
            <strong>Wes Anderson</strong> se fasse le présentateur enjoué de la
            trilogie d&apos;Apu de Satyajit Ray. Plus détonnant encore&nbsp;:{" "}
            <strong>Alfonso Cuarón</strong> qui fait le déplacement uniquement
            pour présenter trois films du suisse Alain Tanner, réalisateur
            radical et profondément anti-système. Découvrir{" "}
            <i className="italic">Charles mort ou vif</i> juste après le
            visionnage d&apos;un clip-hommage au réalisateur mexicain incluant
            de nombreuses scènes de{" "}
            <i className="italic">
              Harry Potter et le Prisonnier d&apos;Azkaban
            </i>{" "}
            était une expérience empreinte d&apos;une joyeuse ironie.
          </BodyCopy>
        </MiddleColumnSection>
        <MiddleColumnImageAndRightColumnCaption
          image={cuaronAnderson}
          alt="Cuaron et Anderson"
          caption={
            <>
              À gauche&nbsp;: Alfonso Cuarón présente{" "}
              <i className="italic">Charles mort ou vif</i> d&apos;Alain Tanner
              avec Thierry Frémaux.
              <br />À droite&nbsp;: Wes Anderson présente{" "}
              <i className="italic">La Complainte du sentier</i> de Satyajit
              Ray.
            </>
          }
        />
        <MiddleColumnSection>
          <BodyCopy>
            Cette année, le Prix Lumière (hommage rendu à une figure majeure du
            septième art) était remis à <strong>Wim Wenders</strong>.
            L&apos;immense majorité de ses films était donc proposée dans la
            programmation. Pour le plus grand bonheur de nos lecteurs et
            lectrices à Paris, on notera que la rétrospective ainsi concoctée a
            déjà trouvé le chemin des écrans de la capitale (depuis le 25
            octobre). Pour nous, cela a été l&apos;occasion de se faire recaler
            de justesse pour une séance de{" "}
            <i className="italic">Paris, Texas</i>, mais aussi de profiter de la
            ‘Carte blanche à Wim Wenders&apos;. Idée géniale&nbsp;: tous les
            ans, le récipiendaire du prix s&apos;improvise aussi programmateur.
            Le choix de Wenders de projeter notamment{" "}
            <i className="italic">Beau Travail</i> (Claire Denis) et{" "}
            <i className="italic">Enter The Void</i> (Gaspar Noé), deux œuvres
            ultra stylisées et sensorielles, avait de quoi surprendre quelque
            peu. Une invitation à envisager différemment sa propre œuvre&nbsp;?
            <br />
            <br />
            Plus sympathique encore, on a vu Wenders débarquer à
            l&apos;improviste pour présenter{" "}
            <strong>
              un des six films nouvellement restaurés d&apos;Ozu
            </strong>, <i className="italic">Une femme dans le vent</i> (1948).
            Il conclut sa présentation en s&apos;installant carrément avec le
            public du cinéma Lumière Terreaux, cédant à la tentation de revoir
            le film dans une salle comble. Totalement inédit en France, ce
            dernier a fait l&apos;objet d&apos;une ressortie nationale dans la
            foulée (le 25 octobre). C&apos;est l&apos;histoire d&apos;une femme
            dont le mari tarde à rentrer de la guerre et qui, pour
            s&apos;occuper de son enfant malade, se trouve contrainte de se
            prostituer. On comprendra pourquoi le film n&apos;est pas dans le
            canon de son réalisateur (curseurs mélodramatiques poussés un peu
            loin, reléguant au deuxième plan le génie d&apos;Ozu pour le banal)
            malgré une passionnante description des mutations
            d&apos;après-guerre et de l&apos;américanisation balbutiante des
            tokyoïtes.
            <br />
            <br />
            Heureusement, les inédits d&apos;Ozu ne sont pas les seuls films du
            Festival qui auront droit à une ressortie nationale prochaine. On
            mentionnera notamment{" "}
            <strong>la fameuse trilogie d&apos;Apu de Satyajit Ray</strong>
            &nbsp;- <i className="italic">
              La Complainte du sentier
            </i> (1955), <i className="italic">L&apos;invaincu</i> (1956) et{" "}
            <i className="italic">Le Monde d&apos;Apu</i> (1959)&nbsp;- prévue
            en salles le 6 décembre prochain. Le plaisir du festivalier est en
            bonne partie imputable aux secrètes correspondances que les films
            nous permettent de tisser entre eux. Ainsi ne peut-on pas
            s&apos;empêcher de rapprocher les films du réalisateur indien de la{" "}
            <i className="italic">Femme dans le vent</i> d&apos;Ozu tant toutes
            ces œuvres semblent profondément mues par des préoccupations
            analogues au néoréalisme européen tout en assumant pleinement un
            penchant mélodramatique appuyé.
          </BodyCopy>
        </MiddleColumnSection>
        <MiddleColumnImageAndRightColumnCaption
          image={ozuRay}
          alt="Ozu et Ray"
          caption={
            <>
              À gauche&nbsp;: Wenders présente{" "}
              <i className="italic">Une femme dans le vent</i> d&apos;Ozu.
              <br />À droite&nbsp;: Ray sur le tournage de{" "}
              <i className="italic">L&apos;invaincu</i>, photographié par Marc
              Riboud et exposé au Musée des Confluences.
            </>
          }
        />
        <MiddleColumnSection>
          <BodyCopy>
            Si un festival suggère des correspondances, il propose également
            beaucoup de ruptures de ton. Ainsi en est-il d&apos;une journée où
            l&apos;on court du deuxième volet de la trilogie de Satyajit Ray à
            la projection de{" "}
            <strong>
              <i className="italic">Lune froide</i> de Patrick Bouchitey
            </strong>{" "}
            (sortie nationale le 15 novembre). Difficile en effet de trouver, à
            part le noir & blanc, des similitudes entre ces deux films.
            Bouchitey était là en personne pour présenter cette nouvelle
            restauration dont il anticipa l&apos;humour noir en agitant sa canne
            et en s&apos;exclamant «&nbsp;C&apos;est le festival de
            canne&nbsp;!&nbsp;». Parler du film invite inévitablement à en
            évoquer sa production&nbsp;: en 1990, Bouchitey réalise un court
            métrage très provocateur qu&apos;il décide, l&apos;année suivante,
            d&apos;intégrer à la fin d&apos;un film plus long. On pourra alors
            se demander ce qui justifia une telle décision si ce n&apos;est le
            fait qu&apos;il est (malheureusement&nbsp;!) plus difficile
            d&apos;assurer une postérité à un court qu&apos;à un long. En effet,
            cette séquence finale est de loin la partie la plus intéressante du
            film (d&apos;une noirceur et d&apos;une bizarrerie qui fait froid
            dans le dos).
            <br />
            <br />
            En ce qui concerne les autres films qui bénéficieront d&apos;une
            sortie prochaine, on mentionnera également le fascinant{" "}
            <strong>
              <i className="italic">Bushman</i> de David Schikele
            </strong>
            . Le film suit les aventures d&apos;un jeune Nigérian, Gabriel, qui
            s&apos;installe à San Francisco dans les années 1960 et subit de
            plein fouet le racisme des Blancs sans pour autant parvenir à
            s&apos;intégrer parmi la communauté afro-américaine pour qui il
            demeure un étranger. Le film est là encore comme coupé en deux mais
            pour des raisons tout autres&nbsp;: pendant le tournage, Gabriel fut
            abusivement arrêté et renvoyé au Nigéria. La dernière partie du film
            se mue alors en documentaire de cette injustice, assumant totalement
            l&apos;impossibilité de combler l&apos;absence physique de
            l&apos;acteur. Passionnant film gigogne que l&apos;on aura plaisir à
            retrouver en salles au printemps prochain.
            <br />
            <br />
            Un petit mot aussi sur une des découvertes les plus enthousiasmantes
            du festival, cette fois-ci pleinement dans le domaine du
            documentaire&nbsp;:{" "}
            <strong>
              <i className="italic">Marée noire et colère rouge</i> de René
              Vautier
            </strong>{" "}
            sur l&apos;écoulement de l&apos;Amoco Cadiz au large des côtes
            bretonnes. Démontage en règle de la couverture faite à l&apos;époque
            par les médias (mimant les tropes du reportage télé pour mieux les
            ridiculiser), le film est un magnifique rappel que le cinéma
            documentaire peut et doit demeurer un contrepoint à la grammaire
            télévisuelle. À notre connaissance, il n&apos;y a pas de date de
            sortie prévue pour ce petit bijou, mais nous surveillerons cela de
            près.
          </BodyCopy>
        </MiddleColumnSection>
        <MiddleColumnImageAndRightColumnCaption
          image={mareeNoire}
          alt="Marée noire et colère rouge"
          caption={
            <>
              <i className="italic">Marée noire et colère rouge</i>, René
              Vautier (1978)
            </>
          }
        />
        <MiddleColumnSection>
          <BodyCopy>
            Le Festival Lumière se targue de ne pas être un événement
            compétitif. Cela n&apos;a pas empêché un événement particulier
            d&apos;attirer une bonne partie de l&apos;attention des
            festivaliers&nbsp;: <strong>la rétrospective Robert Altman</strong>.
            La cause d&apos;un tel émoi est à trouver dans la rareté d&apos;un
            tel événement. Altman a en effet toujours cherché à diversifier ses
            sources de financements pour échapper à la tutelle des grands
            studios, ce qui rend très compliqué le fait de réunir tous les
            différents droits d&apos;exploitation de ses films. La rétrospective
            de douze de ses œuvres les plus connues (de{" "}
            <i className="italic">M*A*S*H</i> en 1970 à{" "}
            <i className="italic">Gosford Park</i> en 2001) était donc
            historique. Des réalisateurs du Nouvel Hollywood, Altman est
            peut-être celui dont les cinéastes américains contemporains se
            revendiquent le plus ouvertement (à commencer évidemment par Paul
            Thomas Anderson). Il demeure cependant relativement peu connu en
            France et revoir certains de ses films permet de mesurer combien
            Altman est resté, sans doute plus que ses pairs (Coppola, Spielberg
            ou Scorsese), un réalisateur irréductiblement américain. Les quatre
            de ses films qu&apos;on a vus à Lyon montrent déjà les différents
            bouts par lesquels il a cherché à analyser ce pays&nbsp;: Hollywood
            (<i className="italic">The Player</i>) et plus généralement Los
            Angeles (<i className="italic">Short Cuts</i>), la Grande Dépression
            (<i className="italic">Nous sommes tous des voleurs</i>) et la
            conquête de l&apos;ouest (<i className="italic">John McCabe</i>).
          </BodyCopy>
        </MiddleColumnSection>
        <MiddleColumnImageAndRightColumnCaption
          image={altman}
          alt="John McCage"
          caption={
            <>
              <i className="italic">John McCabe</i>, Robert Altman (1971)
            </>
          }
        />
        <MiddleColumnSection>
          <BodyCopy>
            Le visionnage de{" "}
            <strong>
              <i className="italic">John McCabe</i>
            </strong>{" "}
            fut peut-être l&apos;expérience la plus éclatante du festival.
            Prenant le contrepied formel de la grande tradition du western
            américain, Altman évacue totalement le désert et les grands espaces.
            Le petit coin de terre de la Colombie britannique où se situe le
            récit n&apos;est pas particulièrement beau. Niché entre des arbres,
            on y est claustrophobe même en extérieur. On l&apos;est encore plus
            dans le bordel et le saloon où l&apos;on passe la majeure partie du
            film. Récit de fondation, <i className="italic">John McCabe</i> fait
            état d&apos;un désenchantement immédiat. Le personnage apparaît au
            début du film comme l&apos;incarnation de la figure charismatique et
            mystérieuse dont le genre est particulièrement friand. Mais ce
            n&apos;est que pour mieux révéler ses bassesses et sa veule
            insignifiance tout de suite après. Le grand rêve entrepreneurial sur
            lequel les États-Unis se targuent d&apos;être fondé est très
            clairement montré pour ce qu&apos;il est&nbsp;: un vain fantasme de
            politiciens avides de pouvoir, un argument électoral parmi
            d&apos;autres. Le film confirme en tout cas que l&apos;effronterie
            altmanienne n&apos;a pas pris la moindre ride.
          </BodyCopy>
        </MiddleColumnSection>
        <MiddleColumnImageAndRightColumnCaption
          image={lyon}
          alt="Lyon"
          caption={<>Lyon, la vraie Ville Lumière&nbsp;?</>}
        />
        <MiddleColumnSection>
          <BodyCopy>
            En guise de conclusion, un dernier petit souvenir absolument
            inoubliable du festival&nbsp;: le visionnage de{" "}
            <strong>
              <i className="italic">Maine-Océan</i> de Jacques Rozier
            </strong>
            . Le film était projeté en forme d&apos;hommage à l&apos;intempestif
            réalisateur français décédé au début de l&apos;été. On y retrouve
            tout ce qui fait le sel de son cinéma&nbsp;: l&apos;oisiveté des
            vacances comme seul moteur narratif, un récit hors de contrôle, une
            radicale liberté de ton et de style, des acteurs amateurs qui
            improvisent beaucoup de leurs dialogues… On retiendra à tout jamais
            le plaisir de voir en salle l&apos;une des scènes de procès les plus
            hilarantes et déjantées qui soit. Joyeuse promesse que
            l&apos;exploitation de vieux films en salles n&apos;a pas dit son
            dernier mot&nbsp;!
          </BodyCopy>
        </MiddleColumnSection>
      </ThreeColumnLayout>
    </>
  );
}
