"use client";

import clsx from "clsx";
import html2canvas from "html2canvas";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

import { SearchResults } from "@/app/recherche/recherche";
import RetroInput from "@/components/forms/retro-input";
import { SuspenseWithLoading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

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
}: {
  text: string;
  onClickFunction: () => void;
}) {
  return (
    <button
      onClick={onClickFunction}
      className="border bg-retro-green p-15px font-bold"
    >
      {text}
    </button>
  );
}

function NumberInCircle({ number }: { number: number }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-retro-green">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-bold">
        {number}
      </div>
    </div>
  );
}

function ShareableContent({ rowsData, fullName }: ShareableContentProps) {
  return (
    <div className="max-w-450px rounded-lg border border-retro-gray bg-retro-green p-10px">
      <h2 className="pb-7px text-center text-xl font-bold">
        Ma Rétrospective 2024
      </h2>
      {fullName && <p className="pb-5px text-center">Par {fullName}</p>}
      <div className="flex flex-col gap-y-5px px-10px">
        {rowsData
          .filter((row) => row.movie !== "")
          .map((row, index) => (
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
      <div className="flex items-end justify-between pt-7px">
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
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex grow" id="shareableContent">
        <ShareableContent rowsData={rowsData} fullName={fullName} />
      </div>
      <h2 className="pb-10px pt-30px text-2xl font-bold tracking-wide">
        Partagez votre rétrospective !
      </h2>
      <div className="flex gap-x-10px">
        <Button
          text="Modifier ma rétrospective"
          onClickFunction={() => (window.location.href = "/sondage-2024")}
        />
        <Button text="Télécharger" onClickFunction={handleDownload} />
      </div>
    </div>
  );
}

function SondageRow({ cell1, cell2 }: { cell1: ReactNode; cell2: ReactNode }) {
  return (
    <div className="flex items-center">
      <div className="w-30px px-4px py-5px lg:w-40px">{cell1}</div>
      <div className="flex grow basis-0 px-4px py-5px">{cell2}</div>
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
        <div className="font-bold">
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
            placeholder="Recherchez un film..."
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
        placeholder="Réponse facultative"
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
    <div className={clsx(className, "flex flex-col pb-20px")}>
      <input
        value={value}
        onChange={(e) => onChangeFunction(e.target.value)}
        className="w-[300px] border p-10px"
        placeholder={placeholder}
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
    if (isSubmitting) return; // Prevent double submission
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
      setIsSubmitting(false); // Reset submitting state on error
    }
  };
  return (
    <>
      <PageHeader text="Ma Rétro 2024">
        <SousTitre1>Votez pour vos meilleures ressorties cinéma</SousTitre1>
      </PageHeader>
      {showSharePage ? (
        <SharePage rowsData={rowsData} fullName={fullName} />
      ) : (
        <>
          {isSubmitting ? (
            <LoadingPage />
          ) : (
            <div className="flex grow flex-col lg:pl-20px">
              {/* Name */}
              <TextInputBox
                placeholder="Nom (facultatif)"
                value={fullName}
                onChangeFunction={setFullName}
                className="flex justify-start pl-34px lg:pl-44px"
              />
              {/* Top */}
              <SondageRow
                cell1={<div className="font-bold">#</div>}
                cell2={<div className="font-bold">Film</div>}
              />
              {rowsData.map((_, index) => (
                <MovieRow
                  key={index}
                  index={index}
                  allMoviesPromise={allMoviesPromise}
                  onUpdate={(data) => updateRowData(index, data)}
                />
              ))}
              <div className="px-34px pt-10px lg:px-44px">
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
                  <div className="flex items-start gap-x-8px">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-1"
                    />
                    <label className="pb-10px font-bold">
                      Je souhaite m&apos;inscrire à la newsletter du Rétro
                      Projecteur pour recevoir l&apos;actualité des ressorties
                      cinéma chaque semaine !
                    </label>
                  </div>
                  {newsletter && (
                    <TextInputBox
                      placeholder="Votre adresse email"
                      value={email}
                      onChangeFunction={setEmail}
                      className="pl-24px"
                    />
                  )}
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button text="ENVOYEZ !" onClickFunction={handleSubmit} />
              </div>
              <p className="mt-4 font-bold">{responseMessage}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
