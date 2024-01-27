import Link from "next/link";

import { SousTitre1 } from "@/components/typography/typography";

export default function Admin() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-10px">
      <SousTitre1>
        <Link className="underline" href="/admin/tous-les-films">
          Tous les Films
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link className="underline" href="/admin/semaine">
          Semaine
        </Link>
      </SousTitre1>
      <SousTitre1>
        <Link className="underline" href="/admin/generate-newsletter">
          Générateur de newsletter
        </Link>
      </SousTitre1>
    </div>
  );
}
