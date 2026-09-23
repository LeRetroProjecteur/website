"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";

import { SearchResults } from "@/app/recherche/recherche";
import { MiddleColumn } from "@/components/articles/articles";
import RetroInput from "@/components/forms/retro-input";
import { Loading } from "@/components/icons/loading";
import { ThreeColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { FormatNotes } from "@/components/seances/seances";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "website-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb",
};

const getClientFirebase = () => {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { app, db };
};

type DocumentData = Record<string, unknown>;

export default function DocumentUpdatePage() {
  return (
    <>
      <PageHeader text="Modifier un film">
        <SousTitre1>Mise à jour manuelle des infos d&apos;un film</SousTitre1>
      </PageHeader>
      <ThreeColumnPage>
        <MiddleColumn>
          <DocumentUpdate />
        </MiddleColumn>
      </ThreeColumnPage>
    </>
  );
}

function DocumentUpdate() {
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set());
  const [updatedValues, setUpdatedValues] = useState<Record<string, unknown>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const setSearchFind = (st: string, id: string = "") => {
    setQuery(st);
    setMovieId(id);
    setShowResults(true);
  };

  const loadDocument = async () => {
    if (!movieId.trim()) {
      setMessage({ text: "Veuillez choisir un film", type: "error" });
      return;
    }
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const { db } = getClientFirebase();
      const docRef = doc(db, "movie-info", movieId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData;
        setDocumentData(data);
        setSelectedFields(new Set());
        const manualValues: Record<string, unknown> = {};
        for (const key of Object.keys(data)) {
          if (
            key.endsWith("_manual") &&
            data[key] !== "" &&
            data[key] !== null &&
            data[key] !== undefined
          ) {
            manualValues[key.replace(/_manual$/, "")] = data[key];
          }
        }
        setUpdatedValues(manualValues);
        setMessage({ text: "Document chargé avec succès", type: "success" });
      } else {
        setMessage({ text: "Document introuvable", type: "error" });
      }
    } catch (error) {
      console.error("Error loading document:", error);
      setMessage({
        text: `Error loading document: ${(error as Error).message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleField = (field: string) => {
    setSelectedFields((prev) => {
      const next = new Set(prev);
      if (next.has(field)) {
        next.delete(field);
        setUpdatedValues((v) => {
          const { [field]: _, ...rest } = v;
          return rest;
        });
      } else {
        next.add(field);
      }
      return next;
    });
  };

  const updateFieldValue = (field: string, value: unknown) => {
    setSelectedFields((prev) => new Set(prev).add(field));
    setUpdatedValues((prev) => {
      if (
        documentData &&
        typeof documentData[field] === "number" &&
        typeof value === "string" &&
        !isNaN(Number(value))
      ) {
        return { ...prev, [field]: Number(value) };
      }
      return { ...prev, [field]: value };
    });
  };

  const generateUpdatePayload = () => {
    const updateFields: Record<string, unknown> = {};
    Array.from(selectedFields).forEach((field) => {
      updateFields[field] = updatedValues[field] ?? "";
    });
    return {
      document_name: movieId,
      data_to_upload: updateFields,
      status: "update",
    };
  };

  const updateDocument = async () => {
    if (!movieId.trim() || !documentData || selectedFields.size === 0) {
      setMessage({ text: "Aucune modification à appliquer", type: "error" });
      return;
    }
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const API_ENDPOINT =
        "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_document_to_db";
      const payload = generateUpdatePayload();
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
      setMessage({
        text: "Film mis à jour avec succès",
        type: "success",
      });
      setQuery("");
      setMovieId("");
      setShowResults(false);
      setDocumentData(null);
      setSelectedFields(new Set());
      setUpdatedValues({});
    } catch (error) {
      console.error("Error updating document:", error);
      setMessage({
        text: `Error updating document: ${(error as Error).message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const getSortedFieldNames = () => {
    if (!documentData) return [];
    return Object.keys(documentData)
      .filter((k) => !k.endsWith("_manual"))
      .sort((a, b) => a.localeCompare(b));
  };

  return (
    <div className="flex flex-col gap-y-20px">
      <div className="flex flex-col gap-y-10px">
        <div className="flex grow flex-col">
          <RetroInput
            value={query}
            setValue={(st) => setSearchFind(st)}
            placeholder="Recherchez un film"
            leftAlignPlaceholder
          />
          {showResults && (
            <SearchResults
              className="border-x px-5px py-2px"
              nbResults={5}
              query={query}
              onClick={(m) => {
                setSearchFind(
                  (m as SearchMovie).title +
                    ", " +
                    (m as SearchMovie).directors +
                    " (" +
                    (m as SearchMovie).year +
                    ")",
                  (m as SearchMovie).id,
                );
                setShowResults(false);
              }}
            />
          )}
        </div>
        <TextBox
          onClick={!isLoading ? loadDocument : undefined}
          className={`bg-retro-gray text-white ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "En attente..." : "Modifier les informations de ce film"}
        </TextBox>
        {message.text && (
          <div
            className={`my-4 p-4 ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}

      {documentData && !isLoading && (
        <div className="flex flex-col gap-y-20px">
          <div className="flex flex-col">
            <div className="border-y py-6px text-13px uppercase text-retro-gray">
              <div className="flex flex-nowrap items-center gap-x-5px">
                <div className="w-[16px] shrink-0" />
                <div className="w-[120px] shrink-0">Champ</div>
                <div className="flex grow basis-0">Donnée brute</div>
                <div className="flex grow basis-0">Correction manuelle</div>
              </div>
            </div>
            {getSortedFieldNames().map((field) => (
              <div key={field} className="border-b py-6px">
                <div className="flex flex-nowrap items-start gap-x-5px">
                  <input
                    type="checkbox"
                    checked={selectedFields.has(field)}
                    onChange={() => toggleField(field)}
                    className="mt-[3px] h-[14px] w-[16px] shrink-0"
                  />
                  <div className="w-[120px] shrink-0 text-13px font-medium">
                    {field}
                  </div>
                  <div className="flex grow basis-0 break-all text-13px">
                    <FormatNotes
                      notes={formatValue(documentData[field])}
                      maxLength={80}
                    />
                  </div>
                  <div className="flex grow basis-0">
                    {typeof documentData[field] === "object" ? (
                      <textarea
                        value={
                          updatedValues[field] !== undefined
                            ? typeof updatedValues[field] === "object"
                              ? JSON.stringify(updatedValues[field], null, 2)
                              : String(updatedValues[field])
                            : ""
                        }
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            updateFieldValue(field, parsed);
                          } catch {
                            updateFieldValue(field, e.target.value);
                          }
                        }}
                        className="min-h-20 w-full border text-13px"
                      />
                    ) : (
                      <input
                        type="text"
                        value={
                          updatedValues[field] !== undefined
                            ? String(updatedValues[field])
                            : ""
                        }
                        onChange={(e) =>
                          updateFieldValue(field, e.target.value)
                        }
                        className="flex w-full grow border text-13px"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedFields.size > 0 && (
            <div>
              <div className="border-y py-6px text-13px uppercase text-retro-gray">
                Aperçu des modifications
              </div>
              <pre className="overflow-x-auto border-b bg-retro-pale-green p-4 font-mono text-xs">
                {JSON.stringify(generateUpdatePayload(), null, 2)}
              </pre>
            </div>
          )}
          {selectedFields.size > 0 && (
            <TextBox
              onClick={!isLoading ? updateDocument : undefined}
              className={`bg-retro-gray text-white ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isLoading ? "En attente..." : "Appliquer les modifications"}
            </TextBox>
          )}
        </div>
      )}
    </div>
  );
}
