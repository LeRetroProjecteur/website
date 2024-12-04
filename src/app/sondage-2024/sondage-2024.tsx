"use client";

import clsx from "clsx";
import html2canvas from "html2canvas";
import Image from "next/image";
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

interface ShareableContentProps {
  rowsData: {
    movie: string;
    id: string;
  }[];
  fullName: string;
}

function Button({
  text,
  onClickFunction,
  disabled = false,
}: {
  text: string;
  onClickFunction: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex grow flex-col pt-20px">
      <button
        onClick={onClickFunction}
        disabled={disabled}
        className={`${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <TextBox bgColor={"retro-gray"} textColor={"retro-white"}>
          <div>{text.toUpperCase()}</div>
        </TextBox>
      </button>
    </div>
  );
}

function NumberInCircle({ number }: { number: number }) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-retro-green">
      <span className="text-center font-bold">{number}</span>
    </div>
  );
}

const SHARE_CONFIG = {
  // Common padding and spacing values
  spacing: {
    bottomPadding: 30, // px - padding before logo section
    movieGap: 7, // px - gap between movies
    contentPadding: 12, // px - padding around content
  },
} as const;

function ShareableContent({ rowsData, fullName }: ShareableContentProps) {
  const filteredMovies = rowsData.filter((row) => row.movie !== "");

  return (
    <div
      className="bg-retro-green"
      style={{
        padding: SHARE_CONFIG.spacing.contentPadding,
      }}
    >
      <h2 className="pb-7px text-center text-xl font-bold">
        Ma Rétrospective 2024
      </h2>
      {fullName && <p className="pb-5px text-center">Par {fullName}</p>}
      {/* Movies list with configured gap */}
      <div
        className="flex flex-col px-10px"
        style={{
          gap: SHARE_CONFIG.spacing.movieGap,
        }}
      >
        {filteredMovies.map((row, index) => (
          <div
            key={index}
            className="rounded-lg bg-white px-10px py-5px shadow"
          >
            <div className="flex items-center">
              <div className="relative">
                <NumberInCircle number={index + 1} />
              </div>
              <div className="flex grow flex-col pl-10px">
                <div className="font-bold">{row.movie}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Logo section with configured padding */}
      <div
        className="mt-auto flex items-end justify-between"
        style={{ paddingTop: SHARE_CONFIG.spacing.bottomPadding }}
      >
        <Image
          src="/img/logo-gray.svg"
          alt="Logo"
          width={34}
          height={34}
          className="h-auto w-157px max-w-[40%]"
        />
        <div className="font-bold text-retro-gray">#MaRétro2024</div>
      </div>
    </div>
  );
}

function SharePage({ rowsData, fullName }: ShareableContentProps) {
  const handleDownload = async () => {
    try {
      const element = document.getElementById("shareableContent");
      if (!element) return;
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: true,
      });
      // Open image in new tab instead of direct download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
          // Clean up the URL after the window is opened
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };
  return (
    <>
      <div className="flex grow justify-center pb-20px" id="shareableContent">
        <ShareableContent rowsData={rowsData} fullName={fullName} />
      </div>
      <div className="border-t pt-20px">
        Merci pour votre participation&nbsp;! N&apos;hésitez pas à partager
        votre rétrospective 2024 et à encourager vos ami.e.s à venir
        voter&nbsp;!
      </div>
      <Button
        text="Modifier ma rétrospective"
        onClickFunction={() => (window.location.href = "/sondage-2024")}
      />
      <Button text="Télécharger" onClickFunction={handleDownload} />
    </>
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
        <div className="flex h-full items-center justify-center border text-center text-retro-gray">
          {index + 1}
          {index < 5 && <span className="text-retro-red">*</span>}
        </div>
      }
      cell2={
        <div className="flex grow flex-col">
          <RetroInput
            value={searchTerm}
            setValue={(st) => setSearchFind(st)}
            leftAlignPlaceholder
            customTypography
            placeholder={"Rechercher un film...".toUpperCase()}
            transparentPlaceholder
            className="flex grow"
          />
          <SuspenseWithLoading hideLoading={searchTerm.length === 0}>
            {showResults && (
              <SearchResults
                extraClass="text-left px-5px py-2px border-x border-b"
                nbResults={5}
                searchTerm={searchTerm}
                allDataPromise={allMoviesPromise}
                noResultsText="Aucun film trouvé dans la base de données, mais vous pouvez le renseigner manuellement."
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

export default function Sondage2024({
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
    const hasAtLeastOneMovie = rowsData.some((row) => row.movie.trim() !== "");

    if (!hasAtLeastOneMovie) {
      setResponseMessage("Veuillez sélectionner au moins un film.");
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
                  <div className="border-y bg-retro-green uppercase text-retro-gray">
                    <SondageRow
                      cell1={
                        <div className="py-6px text-center font-bold lg:py-17px">
                          <SousTitre2>#</SousTitre2>
                        </div>
                      }
                      cell2={
                        <div className="py-6px text-center font-bold lg:py-17px">
                          <SousTitre2>Film</SousTitre2>
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
                  <div className="flex flex-col pt-30px">
                    <div className="flex items-start gap-x-10px">
                      <div
                        onClick={() => setNewsletter(!newsletter)}
                        className={clsx(
                          "tw-ring-color-black flex h-42px min-w-42px cursor-pointer items-center justify-center border accent-black lg:h-48px lg:min-w-48px",
                          newsletter ? "bg-retro-blue" : "text-retro-blue",
                        )}
                      >
                        {newsletter && <p className="text-retro-gray">✓</p>}
                      </div>
                      <label className="border bg-retro-blue p-5px px-12px py-8px uppercase text-retro-gray">
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
                <Button
                  text="Envoyer mon top 2024&nbsp;!"
                  onClickFunction={handleSubmit}
                />
                <p className="mt-4 font-bold">{responseMessage}</p>
              </>
            )}
          </MiddleColumn>
        </ThreeColumnLayout>
      )}
    </>
  );
}
