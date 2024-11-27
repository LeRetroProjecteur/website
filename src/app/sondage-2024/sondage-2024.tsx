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

import loading from "../../assets/loading.gif";

interface RowData {
  movie: string;
  movie_id: string;
  note: string;
}

interface ShareableContentProps {
  rowsData: RowData[];
  fullName: string;
}

function ShareableContent({ rowsData, fullName }: ShareableContentProps) {
  return (
    <div className="relative max-w-2xl rounded-lg bg-retro-green p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Mon Top Films 2024
      </h2>
      {fullName && <p className="mb-6 text-center text-lg">Par {fullName}</p>}
      <div className="space-y-4">
        {rowsData
          .filter((row) => row.movie !== "")
          .map((row, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-start">
                <div className="relative flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-retro-green">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-lg font-bold">{row.movie}</div>
                  {row.note && (
                    <div className="mt-2 text-sm italic text-gray-700">
                      {row.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div className="-ml-4">
          <Image
            src="/img/logo-gray.svg"
            alt="Logo"
            width={34}
            height={34}
            className="h-12 w-auto"
          />
        </div>
        <div className="-mr-4">
          <span className="font-bold text-retro-gray">#MaRetro2024</span>
        </div>
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-retro-gray p-4">
      <div id="shareableContent">
        <ShareableContent rowsData={rowsData} fullName={fullName} />
      </div>

      <h2 className="mb-4 mt-12 text-2xl font-bold tracking-wide text-retro-green">
        PARTAGEZ VOTRE TOP !
      </h2>

      <div className="flex space-x-4">
        <button
          onClick={() => (window.location.href = "/sondage-2024")}
          className="border bg-retro-green p-4 text-lg font-bold shadow-lg hover:bg-opacity-90"
        >
          Modifier votre top
        </button>
        <button
          onClick={handleDownload}
          className="border bg-retro-green p-4 text-lg font-bold shadow-lg hover:bg-opacity-90"
        >
          Télécharger
        </button>
      </div>
    </div>
  );
}

function SondageRow({
  cell1,
  cell2,
  cell3,
}: {
  cell1: ReactNode;
  cell2: ReactNode;
  cell3: ReactNode;
}) {
  return (
    <div className="flex items-center">
      <div className="w-30px px-4px py-5px lg:w-40px">{cell1}</div>
      <div className="w-[50%] px-4px py-5px">{cell2}</div>
      <div className="flex grow basis-0 px-4px py-5px">{cell3}</div>
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
  onUpdate: (data: { movie: string; movie_id: string; note: string }) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [note, setNote] = useState("");
  const setSearchFind = (st: string, id: string = "") => {
    setSearchTerm(st);
    setMovieId(id);
    setShowResults(true);
    onUpdate({ movie: st, movie_id: id, note });
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
      cell3={
        <input
          type="text"
          className="h-42px w-full px-2 lg:h-48px"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            onUpdate({
              movie: searchTerm,
              movie_id: movieId,
              note: e.target.value,
            });
          }}
        />
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
      movie_id: "",
      note: "",
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
      movie_id: string;
      note: string;
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
          id: row.movie_id,
          notes: row.note,
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

  if (showSharePage) {
    return <SharePage rowsData={rowsData} fullName={fullName} />;
  }

  return (
    <>
      <PageHeader text="Ma Rétro 2024">
        <SousTitre1>Votez pour vos meilleures ressorties cinéma</SousTitre1>
      </PageHeader>
      <div className="flex grow flex-col lg:pl-20px">
        <div>
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
            cell3={
              <div className="font-bold">Où avez-vous vu ce film&nbsp;?</div>
            }
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
                  Projecteur pour recevoir toute l&apos;actualité des ressorties
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
            {isSubmitting ? (
              <Image
                src={loading}
                alt="loading"
                className="h-[300px] w-[300px]"
              />
            ) : (
              <button
                onClick={handleSubmit}
                className="border bg-retro-green p-15px font-bold"
              >
                ENVOYEZ !
              </button>
            )}
          </div>
          <p className="mt-4 font-bold">{responseMessage}</p>
        </div>
      </div>
    </>
  );
}
