"use client";

import clsx from "clsx";
import React, { ReactNode, useState } from "react";

import { SearchResults } from "@/app/recherche/recherche";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { SousTitre1, SousTitre2 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

import { MiddleColumn, ThreeColumnLayout } from "../actualites/components";
import LoadingPage from "../loading";

function OpenQuestion({
  question,
  value,
  onChangeFunction,
}: {
  question: string;
  value: string;
  onChangeFunction: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col pt-20px">
      <label className="pb-5px">{question}</label>
      <textarea
        placeholder={"Réponse facultative".toUpperCase()}
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        className="h-[75px] resize-none p-10px"
      />
    </div>
  );
}

function TextInputBox({
  placeholder,
  value,
  onChangeFunction,
  className,
}: {
  placeholder: string;
  value: string;
  onChangeFunction: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  return (
    <div className={clsx(className, "flex flex-col py-10px")}>
      <input
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        className="border p-10px"
        placeholder={placeholder.toUpperCase()}
      />
    </div>
  );
}

function SondageRow({ cell1, cell2 }: { cell1: ReactNode; cell2: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-x-10px">
      <div className="w-42px lg:w-48px">{cell1}</div>
      <div className="flex grow basis-0">{cell2}</div>
    </div>
  );
}

function MovieRow({
  index,
  allMoviesPromise,
  onUpdate,
}: {
  index: number;
  allMoviesPromise: Promise<SearchMovie[]>;
  onUpdate: (data: { movie: string; id: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [_, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const setSearchFind = (st: string, id: string = "") => {
    setSearchTerm(st);
    setMovieId(id);
    setShowResults(true);
    onUpdate({ movie: st, id: id });
  };
  return (
    <SondageRow
      cell1={
        <div className="flex h-full items-center justify-center border text-center text-retro-bordeaux">
          {index + 1}
          {index < 5 && <span className="text-retro-bordeaux">*</span>}
        </div>
      }
      cell2={
        <div className="flex grow flex-col">
          <RetroInput
            value={searchTerm}
            setValue={(st) => setSearchFind(st)}
            blue={true}
            leftAlignPlaceholder
            customTypography
            placeholder={"Rechercher un film...".toUpperCase()}
            transparentPlaceholder
          />
          <SuspenseWithLoading hideLoading={searchTerm.length === 0}>
            {showResults && (
              <SearchResults
                altColor="retro-blue"
                className="border-x px-5px py-2px"
                nbResults={5}
                searchTerm={searchTerm}
                allDataPromise={allMoviesPromise}
                noResultsText="Nous ne trouvons pas votre film, mais vous pouvez le renseigner manuellement."
                lowercase={true}
                onClick={(movie) => {
                  setSearchFind(
                    `${movie.title}, ${movie.directors} (${movie.year})`,
                    movie.id,
                  );
                  setShowResults(false);
                }}
              />
            )}
          </SuspenseWithLoading>
        </div>
      }
    />
  );
}

interface ShareableContentProps {
  rowsData: {
    movie: string;
    id: string;
  }[];
  fullName: string;
}

const SHARE_CONFIG = {
  spacing: {
    contentPadding: 16, // px - padding around content
  },
} as const;

function ShareableContent({ rowsData, fullName }: ShareableContentProps) {
  const filteredMovies = rowsData.filter((row) => row.movie !== "");
  // const cornerTextStyle = "font-semi-bold text-retro-blue underline hidden lg:block uppercase";
  const cornerTextStyle =
    "font-semibold text-[13px] text-retro-blue underline hidden lg:block uppercase";
  return (
    <div className="w-[100%] bg-retro-bordeaux lg:w-500px">
      <div
        style={{
          padding: SHARE_CONFIG.spacing.contentPadding,
        }}
      >
        <div className="relative flex grow items-start">
          <div className={`absolute left-0 top-0 ${cornerTextStyle}`}>
            Top 2024
          </div>
          <div className="flex grow items-center justify-center text-center font-degular text-40px font-bold uppercase leading-35px text-retro-blue">
            Ma Rétro
            <br />
            2024
          </div>
          <div className={`absolute right-0 top-0 ${cornerTextStyle}`}>
            {fullName ? <>Par {fullName}</> : <>#MaRétro2024</>}
          </div>
        </div>
      </div>
      <div
        className="flex flex-col bg-retro-blue"
        style={{
          paddingLeft: SHARE_CONFIG.spacing.contentPadding,
          paddingRight: SHARE_CONFIG.spacing.contentPadding,
        }}
      >
        {filteredMovies.map((row, index) => (
          <div
            key={index}
            className={clsx(
              "flex w-full justify-center border-retro-bordeaux px-10px py-5px text-center text-retro-bordeaux",
              index === 0
                ? "border-b-[0.5px]"
                : index === filteredMovies.length - 1
                  ? "border-t-[0.5px]"
                  : "border-y-[0.5px]",
            )}
          >
            {index + 1}. {row.movie}
          </div>
        ))}
      </div>
      <div
        style={{
          padding: SHARE_CONFIG.spacing.contentPadding,
        }}
      >
        <div className="relative flex grow items-end">
          <div className={`absolute bottom-0 left-0 ${cornerTextStyle}`}>
            Top 2024
          </div>
          <div className="flex grow items-center justify-center">
            <img
              src="/img/logo-blue.png"
              alt="Logo"
              className="h-auto w-157px max-w-[40%]"
            />
          </div>
          <div className={`absolute bottom-0 right-0 ${cornerTextStyle}`}>
            #MaRétro2024
          </div>
        </div>
      </div>
    </div>
  );
}

function SharePage({ rowsData, fullName }: ShareableContentProps) {
  return (
    <>
      <div className="flex justify-center pb-20px" id="shareableContent">
        <ShareableContent rowsData={rowsData} fullName={fullName} />
      </div>
      <div className="border-t py-20px">
        Merci pour votre participation&nbsp;! N&apos;hésitez pas à partager
        votre rétrospective 2024 et à encourager vos ami.e.s à venir
        voter&nbsp;!
      </div>
      <div className="flex flex-col gap-y-10px">
        <TextBox link="/ma-retro-2024">Modifier ma rétrospective</TextBox>
      </div>
    </>
  );
}

export default function MaRetro2024({
  allMoviesPromise,
}: {
  allMoviesPromise: Promise<SearchMovie[]>;
}) {
  const numSubmissions = 10;
  const [responseMessage, setResponseMessage] = useState("");
  const [rowsData, setRowsData] = useState(
    Array(numSubmissions).fill({
      movie: "",
      id: "",
    }),
  );
  const [fullName, setFullName] = useState("");
  const [showSharePage, setShowSharePage] = useState(false);
  const [real, setReal] = useState("");
  const [nombreDeFois, setNombreDeFois] = useState("");
  const [autreInformation, setAutreInformation] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateRowData = (
    index: number,
    data: {
      movie: string;
      id: string;
    },
  ) => {
    const newRowsData = [...rowsData];
    newRowsData[index] = data;
    setRowsData(newRowsData);
  };
  const handleSubmit = async () => {
    // Check if at least one movie has been filled
    const hasAtLeastTwoMovies =
      rowsData.filter((row) => row.movie.trim() !== "").length >= 2;
    if (!hasAtLeastTwoMovies) {
      setResponseMessage("Veuillez sélectionner au moins cinq films.");
      return;
    }
    setIsSubmitting(true);
    try {
      const API_ENDPOINT =
        "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_poll_data_to_db";
      const transformedData = rowsData
        .filter((row) => row.movie !== "")
        .map((row) => ({
          movie: row.movie,
          id: row.id,
        }));
      const payload = {
        collection_name: "sondage-2024",
        votes: transformedData,
        director_requests: real,
        cinema_visits: nombreDeFois,
        additional_feedback: autreInformation,
        full_name: fullName,
        email: email,
        newsletter_signup: newsletter,
      };
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setResponseMessage("Données envoyées avec succès!");
      setShowSharePage(true);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Erreur lors de l'envoi. Veuillez réessayer.");
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <PageHeader text="Ma Rétro 2024">
        <SousTitre1>Votez pour vos meilleures ressorties cinéma</SousTitre1>
      </PageHeader>
      {isSubmitting ? (
        <LoadingPage />
      ) : (
        <ThreeColumnLayout>
          <MiddleColumn>
            {showSharePage ? (
              <SharePage rowsData={rowsData} fullName={fullName} />
            ) : (
              <>
                {/* Name */}
                <TextInputBox
                  placeholder="Votre nom/pseudo (facultatif)"
                  value={fullName}
                  onChangeFunction={setFullName}
                  className="pb-20px"
                />
                {/* Top */}
                <div className="flex flex-col gap-y-10px">
                  <div className="border-y bg-retro-blue uppercase">
                    <SondageRow
                      cell1={
                        <div className="retro-bordeaux py-6px text-center font-bold lg:py-17px">
                          <SousTitre2 textColor="retro-bordeaux">#</SousTitre2>
                        </div>
                      }
                      cell2={
                        <div className="py-6px text-center font-bold lg:py-17px">
                          <SousTitre2 textColor="retro-bordeaux">
                            Film
                          </SousTitre2>
                        </div>
                      }
                    />
                  </div>
                  {rowsData.map((_, index) => (
                    <MovieRow
                      key={index}
                      index={index}
                      allMoviesPromise={allMoviesPromise}
                      onUpdate={(data) => updateRowData(index, data)}
                    />
                  ))}
                </div>
                <div className="pt-10px">
                  {/* Additional Questions */}
                  <OpenQuestion
                    question="Y a-t-il des films ou des réalisateurs·rices en particulier que vous aimeriez voir plus souvent programmé·e·s en salle&nbsp;?"
                    value={real}
                    onChangeFunction={setReal}
                  />
                  <OpenQuestion
                    question="À combien estimez-vous le nombre de fois où vous êtes allé·e·s voir un film en ressortie au cinéma cette année&nbsp;?"
                    value={nombreDeFois}
                    onChangeFunction={setNombreDeFois}
                  />
                  <OpenQuestion
                    question="Des retours supplémentaires sur notre projet ou sur notre site web&nbsp;?"
                    value={autreInformation}
                    onChangeFunction={setAutreInformation}
                  />
                  {/* Newsletter Signup */}
                  <div className="flex flex-col py-30px">
                    <div className="flex items-start gap-x-10px">
                      <div
                          onClick={() => setNewsletter(!newsletter)}
                          className={clsx(
                              "min-w-[20px] flex h-20px cursor-pointer items-center justify-center border accent-black lg:h-30px lg:min-w-30px",  // Changed min-w-25x to min-w-[25px]
                              newsletter
                                  ? "bg-retro-blue"
                                  : "bg-retro-blue text-retro-blue",
                          )}
                      >
                        {newsletter && <p className="text-retro-gray">✓</p>}
                      </div>
                      <label className="border bg-retro-blue p-5px px-12px py-8px text-retro-gray">
                        Je souhaite m&apos;inscrire à «&nbsp;Up Close&nbsp;», la
                        newsletter hebdomadaire du Rétro Projecteur pour
                        recevoir l&apos;actualité des ressorties cinéma chaque
                        semaine&nbsp;!
                      </label>
                    </div>
                    {newsletter && (
                      <TextInputBox
                        placeholder="Votre adresse email*"
                        value={email}
                        onChangeFunction={setEmail}
                      />
                    )}
                  </div>
                </div>
                <TextBox
                  onClick={handleSubmit}
                  className="bg-retro-bordeaux text-retro-white"
                >
                  Envoyer mon top 2024&nbsp;!
                </TextBox>
                <p className="mt-4 font-bold">{responseMessage}</p>
              </>
            )}
          </MiddleColumn>
        </ThreeColumnLayout>
      )}
    </>
  );
}
