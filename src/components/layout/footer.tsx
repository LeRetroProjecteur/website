import Link from "next/link";

import { FooterCopy } from "../typography/typography";
import FooterLinks from "./footer-links";

export default function Footer() {
  return (
    <div className="flex grow flex-col lg:h-146px lg:border-t lg:pt-10px">
      <div className="flex lg:hidden">
        <FooterLinks color="retro-gray" />
      </div>
      <div className="flex flex-col gap-y-20px py-20px lg:grow lg:justify-between lg:py-0">
        <div className="text-center lg:text-left">
          <FooterCopy>
            Un problème à signaler&nbsp;? Des suggestions&nbsp;?
            <span className="hidden lg:inline"> </span>
            <br className="lg:hidden" />{" "}
            <a
              href="mailto:contact@leretroprojecteur.com"
              className="underline"
            >
              Contactez-nous&nbsp;!
            </a>
          </FooterCopy>
        </div>
        <div className="hidden text-center lg:block lg:text-left">
          <FooterCopy>
            <a href="./portail-seances" className="underline">
              Utilisez notre portail
            </a>{" "}
            pour rajouter des séances à notre calendrier
          </FooterCopy>
        </div>
        <div className="text-center lg:text-left">
          <FooterCopy>
            <Link href="/admin/tous-les-films">©</Link> Le Rétro Projecteur
            <br />
            Graphisme par{" "}
            <a
              href="https://clairemalot.com/"
              className="underline"
              target="_blank"
            >
              claire malot
            </a>
          </FooterCopy>
        </div>
      </div>
    </div>
  );
}
