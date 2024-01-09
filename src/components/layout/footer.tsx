import { MetaCopy } from "../typography/typography";
import FooterLinks from "./footer-links";

export default function Footer() {
  return (
    <div className="lg:pt-10px lg:h-163px flex grow flex-col gap-3 border-t pt-3">
      <div className="flex flex-col gap-7 lg:grow lg:justify-between">
        <div className="text-center lg:text-left">
          <MetaCopy>
            Un problème sur le site ? Signalez-le nous{" "}
            <a
              href="mailto:contact@leretroprojecteur.com"
              className="underline"
            >
              ICI
            </a>{" "}
            !
          </MetaCopy>
        </div>
        <div className="text-center lg:text-left">
          <MetaCopy>
            Design graphique par{" "}
            <a
              href="https://clairemalot.com/"
              className="underline"
              target="_blank"
            >
              claire malot
            </a>
            <br />
            © Le Rétro Projecteur 2021-2023 <br />« Pour le grand écran, pas la
            p&apos;tite lucarne ! »
          </MetaCopy>
        </div>
      </div>
      <div className="flex lg:hidden">
        <FooterLinks bigLineHeight={false} color="gray" />
      </div>
    </div>
  );
}
