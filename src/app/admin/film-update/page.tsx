"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";

import { SearchResults } from "@/app/recherche/recherche";
import { MiddleColumn } from "@/components/articles/articles";
import RetroInput from "@/components/forms/retro-input";
import { ThreeColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { SousTitre1 } from "@/components/typography/typography";
import { SearchMovie } from "@/lib/types";

// Firebase config for client-side
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "website-cine.firebaseapp.com",
  projectId: "website-cine",
  storageBucket: "website-cine.appspot.com",
  messagingSenderId: "1060388636946",
  appId: "1:1060388636946:web:ea3752ae94d0ab56e68bcb",
};

// Initialize Firebase (safely)
const getClientFirebase = () => {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { app, db };
};

// Type for document data
interface DocumentData {
  [key: string]: unknown;
}

export default function DocumentUpdatePage() {
  return (
    <>
      <PageHeader text="Modifier un film">
        <SousTitre1>Mise à jour manuelle des infos d&apos;un film</SousTitre1>
      </PageHeader>
      <ThreeColumnPage>
        <DocumentUpdate />
      </ThreeColumnPage>
    </>
  );
}

function DocumentUpdate() {
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>(
    {},
  );
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
  const collection = "movie-info";

  // Load document directly from Firestore
  const loadDocument = async () => {
    if (!movieId.trim()) {
      setMessage({ text: "Veuillez choisir un film", type: "error" });
      return;
    }
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const { db } = getClientFirebase();
      const docRef = doc(db, collection, movieId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData;
        setDocumentData(data);
        setSelectedFields({});
        setUpdatedValues({});
        setMessage({ text: "Document loaded successfully", type: "success" });
      } else {
        setMessage({ text: "Document not found", type: "error" });
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

  // Toggle field selection
  const toggleField = (field: string) => {
    setSelectedFields((prev) => {
      const newState = { ...prev };
      newState[field] = !prev[field];
      // If unchecking, remove from updatedValues
      if (!newState[field] && field in updatedValues) {
        const newValues = { ...updatedValues };
        delete newValues[field];
        setUpdatedValues(newValues);
      }
      return newState;
    });
  };

  // Update value for a field
  const updateFieldValue = (field: string, value: unknown) => {
    setUpdatedValues((prev) => {
      // Try to parse numbers if the original field is a number
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

  // Generate the update payload
  const generateUpdatePayload = () => {
    const updateFields: Record<string, unknown> = {};
    Object.keys(selectedFields).forEach((field) => {
      if (selectedFields[field] && updatedValues[field] !== undefined) {
        updateFields[field] = updatedValues[field];
      }
    });
    return {
      document_name: movieId,
      data_to_upload: updateFields,
      status: "update",
    };
  };

  // Update document
  const updateDocument = async () => {
    if (
      !movieId.trim() ||
      !documentData ||
      Object.keys(updatedValues).length === 0
    ) {
      setMessage({ text: "No changes to update", type: "error" });
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
      const responseData = await response.json();
      setMessage({
        text: responseData.message || "Document updated successfully",
        type: "success",
      });
      // Reload the document to show updated values
      await loadDocument();
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

  // Format value for display
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "null";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  // Get sorted field names
  const getSortedFieldNames = () => {
    if (!documentData) return [];
    return Object.keys(documentData).sort((a, b) => a.localeCompare(b));
  };

  return (
    <MiddleColumn>
      {/* FILM SELECTION */}
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
        <TextBox onClick={loadDocument} className="bg-retro-gray text-white">
          Modifier les informations de ce film
        </TextBox>
        {message.text && (
          <div
            className={`${
              message.type === "success" ? "bg-retro-green" : "bg-retro-red"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {/* UPDATE METADATA */}
      {documentData && !isLoading && (
        <div className="flex flex-col gap-y-20px">
          <div className="flex flex-col gap-y-10px rounded-md border">
            {getSortedFieldNames().map((field) => (
              <div
                key={field}
                className="flex flex-col items-start gap-2 border-b p-3 md:flex-row"
              >
                <div className="min-w-48 flex items-center md:w-1/3">
                  <input
                    type="checkbox"
                    checked={selectedFields[field] || false}
                    onChange={() => toggleField(field)}
                    className="mr-3 h-4 w-4"
                  />
                  <div>
                    <div className="font-medium">{field}</div>
                    <div className="max-w-64 truncate text-sm text-gray-600">
                      {formatValue(documentData[field])}
                    </div>
                  </div>
                </div>

                {selectedFields[field] && (
                  <div className="flex-1">
                    {typeof documentData[field] === "object" ? (
                      <textarea
                        value={
                          updatedValues[field] !== undefined
                            ? typeof updatedValues[field] === "object"
                              ? JSON.stringify(updatedValues[field], null, 2)
                              : String(updatedValues[field])
                            : JSON.stringify(documentData[field], null, 2)
                        }
                        onChange={(e) => {
                          try {
                            // Try to parse as JSON if it's an object
                            const parsed = JSON.parse(e.target.value);
                            updateFieldValue(field, parsed);
                          } catch {
                            // If not valid JSON, store as string
                            updateFieldValue(field, e.target.value);
                          }
                        }}
                        className="min-h-20 w-full border p-2"
                      />
                    ) : (
                      <RetroInput
                        value={
                          updatedValues[field] !== undefined
                            ? String(updatedValues[field])
                            : formatValue(documentData[field])
                        }
                        setValue={(value) => updateFieldValue(field, value)}
                        placeholder={`Enter new value`}
                        className="h-40px"
                        leftAlignPlaceholder={true}
                        lowercase={true}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {Object.keys(updatedValues).length > 0 && (
            <div className="mt-6">
              <SousTitre1>Update Preview</SousTitre1>
              <div className="mt-4 rounded-md bg-gray-100 p-4">
                <pre className="overflow-x-auto font-mono text-xs">
                  {JSON.stringify(generateUpdatePayload(), null, 2)}
                </pre>
              </div>
            </div>
          )}
          {Object.keys(updatedValues).length > 0 && (
            <TextBox
              onClick={updateDocument}
              className="bg-retro-gray px-5 py-2 text-15px font-medium uppercase text-white"
            >
              Update Document
            </TextBox>
          )}
        </div>
      )}
    </MiddleColumn>
  );
}
