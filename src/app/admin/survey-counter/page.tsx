import { Metadata } from "next";

import SurveyCounter from "./survey-counter";

export const metadata: Metadata = {
  title: "Ad Astra | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function CoeurPage() {
  return (
    <>
      <p
        style={{
          fontSize: "100px",
          textAlign: "center",
          color: "var(--red)",
          textShadow: "5px 5px 0px var(--black)",
        }}
      >
        <strong>
          <SurveyCounter />
        </strong>
      </p>
    </>
  );
}
