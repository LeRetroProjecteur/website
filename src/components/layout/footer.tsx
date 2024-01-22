import Link from "next/link";

import { FooterCopy } from "../typography/typography";
import FooterLinks from "./footer-links";

export default function Footer() {
  return (
    <div className="flex grow flex-col border-t pt-13px lg:h-146px lg:pt-10px">
      <div className="flex flex-col lg:grow lg:justify-between">
        <div className="text-center lg:text-left">
          <FooterCopy>
            Un problème sur le site ?<span className="hidden lg:inline"> </span>
            <br className="lg:hidden" />
            Signalez-le nous{" "}
            <a
              href="mailto:contact@leretroprojecteur.com"
              className="underline"
            >
              ICI
            </a>{" "}
            !
          </FooterCopy>
        </div>
        <div className="pt-28px text-center lg:pt-0 lg:text-left">
          <FooterCopy>
            Design graphique par{" "}
            <a
              href="https://clairemalot.com/"
              className="underline"
              target="_blank"
            >
              claire malot
            </a>
            <br />
            <Link href="/admin">©</Link> Le Rétro Projecteur 2021–2024 <br />
            «&nbsp;Pour le grand écran, pas la p&apos;tite lucarne&nbsp;!&nbsp;»
          </FooterCopy>
        </div>
      </div>
      <div className="flex pb-28px pt-13px lg:hidden lg:py-0">
        <FooterLinks color="gray" />
      </div>
    </div>
  );
}
