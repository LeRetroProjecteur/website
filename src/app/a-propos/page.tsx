"use client";

import PageHeader from "@/components/layout/page-header";
import Image from "next/image";

export default function RecherchePage() {
    return (
        <div className="flex grow flex-col pb-4">
          <div className="pb-2 lg:pb-4">
            <PageHeader text="coups de coeur" />
          </div>
          <div className="flex items-center justify-between border-b  pb-2 lg:border-t lg:bg-retro-green lg:px-5 lg:py-4 lg:pr-3">
              <div className="text-xl/6 font-semibold uppercase text-retro-gray lg:text-3xl/6">
                Qui sommes-nous ?
              </div>
          </div>
            <span id="review_box">
              <div className="moviebox">
                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/website-cine.appspot.com/o/images%2Fadieu-philippine-1963.jpg?alt=media`}
                  alt="movie-screenshot"
                  width={1200}
                  height={675}
                  className="h-auto w-full"
                />
              </div>
            </span>

            <br/>
            <div className="font-medium leading-7 lg:pl-5"
                 dangerouslySetInnerHTML={{ __html: "<p>Le Rétro Projecteur est un site de cinéma de patrimoine à Paris. " +
                         "Nous vous proposons une sélection de films à voir dans les salles de cinéma parisiennes, " +
                         "ainsi que des critiques et des analyses de films." + "<br/><br/>" +
                         "Cinémas, producteurs, indépendants ? " +
                         "<a href='contact@leretroprojecteur.com'> <u>Ecrivez-nous ici !</u></a>" +
                         "</p>"}}>
            </div>
        </div>
    );
}