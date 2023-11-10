import { Metadata } from "next";
import { Suspense } from "react";

import Coeur from "./coeur";

export const metadata: Metadata = {
  title:
    "Nos Coups de Cœur | Le Rétro Projecteur – Cinéma de patrimoine à Paris",
};

export default function CoeurPage() {
  return (
    <>
      <h2>Archives&nbsp;: Nos Coups de Cœur</h2>
      <table id="userdata" className="center">
        <tbody>
          <Suspense
            fallback={[...Array(20)].map((_, i) => (
              <tr key={i}>
                <td>&nbsp;</td>
              </tr>
            ))}
          >
            <Coeur />
          </Suspense>
        </tbody>
      </table>
      <span id="cdc"></span>
    </>
  );
}
