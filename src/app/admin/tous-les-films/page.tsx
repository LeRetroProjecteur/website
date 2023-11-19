import { Suspense } from "react";

import Calendrier from "@/components/calendrier";
import {format, isSameMonth} from "date-fns";
import {fr} from "date-fns/locale";
import {FilterableMovies} from "@/app/admin/semaine/semaine";

export default function TousLesFilms() {
  return (
  <>
      <h2>
          Bienvenue Frère Lumar !
      </h2>
        <Suspense fallback={<></>}>
          <Calendrier allMovies={true} />
        </Suspense>
  </>
  );
}
