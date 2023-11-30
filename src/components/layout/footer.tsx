import FooterLinks from "./footer-links";

export default function Footer() {
  return (
    <div className="flex grow flex-col gap-3 border-t border-retro-gray pt-4">
      <div className="flex flex-col gap-7 text-xl font-medium uppercase leading-[1.10526] text-retro-gray">
        <div className="grow text-center">
          Un problème sur le site ? Signalez-le nous{" "}
          <a href="mailto:contact@leretroprojecteur.com" className="underline">
            ICI
          </a>
          !
        </div>
        <div className="grow text-center">
          Design graphique par{" "}
          <a href="https://clairemalot.com/" className="underline">
            claire malot
          </a>
          <br />
          © Le Rétro Projecteur 2021–2023 <br />« Pour le grand écran, pas la
          p&apos;tite lucarne ! »
        </div>
      </div>
      <FooterLinks color="gray" />
    </div>
  );
}