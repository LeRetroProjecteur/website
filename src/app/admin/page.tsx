import Link from "next/link";

import { BodyCopy } from "@/components/typography/typography";

export default function Admin() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <BodyCopy>
        <Link href="/admin/tous-les-films">Tous les Films</Link>
      </BodyCopy>
      <BodyCopy>
        <Link href="/admin/semaine">Semaine</Link>
      </BodyCopy>
    </div>
  );
}
