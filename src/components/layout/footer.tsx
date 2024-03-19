import Link from "next/link";

import { FooterCopy } from "../typography/typography";
import FooterLinks from "./footer-links";

export default function Footer() {
  return (
    <div className="flex grow flex-col lg:h-146px lg:border-t lg:pt-10px">
      <div className="flex lg:hidden">
        <FooterLinks color="retro-gray" />
      </div>
      <div className="flex flex-col lg:grow lg:justify-between">
        <div className="hidden text-center lg:block lg:text-left">
          <FooterCopy>
            Un problème sur le site ?<span className="hidden lg:inline"> </span>
            <br className="lg:hidden" />{" "}
            <a
              href="mailto:contact@leretroprojecteur.com"
              className="underline"
            >
              Signalez-le nous&nbsp;!
            </a>
          </FooterCopy>
        </div>
        <div className="pt-20px text-center lg:pt-0 lg:text-left">
          <FooterCopy>
            <Link href="/admin/tous-les-films">©</Link> Le Rétro Projecteur
            2021–2024
            <br />
            Graphisme par{" "}
            <a
              href="https://clairemalot.com/"
              className="underline"
              target="_blank"
            >
              claire malot
            </a>
            .<span className="hidden lg:inline"> </span>
            <br className="lg:hidden" />
            Développement par jroitgrund.
          </FooterCopy>
        </div>
        <div className="py-20px text-center lg:py-0 lg:text-left">
          <FooterCopy>
            «&nbsp;Pour le grand écran, pas la p&apos;tite lucarne&nbsp;!&nbsp;»
          </FooterCopy>
        </div>
      </div>
    </div>
  );
}
