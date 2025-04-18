"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { debounce } from "lodash-es";
import { useCallback, useEffect, useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import { Loading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { MetaCopy, SousTitre1 } from "@/components/typography/typography";
import { SearchMovie, searchResultsSchema } from "@/lib/types";

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
  const [mode, setMode] = useState<"direct" | "search">("direct");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [collection, setCollection] = useState("movie-info");
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>(
    {},
  );
  const [updatedValues, setUpdatedValues] = useState<Record<string, unknown>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Define the search function without debounce first
  const performSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/movies/search?${new URLSearchParams({
          query,
          nbResults: "10",
        }).toString()}`,
      );

      const results = await response.json();
      setSearchResults(searchResultsSchema.parse(results));
    } catch (error) {
      console.error("Error searching movies:", error);
      setMessage({ text: "Error searching for movies", type: "error" });
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Now create the debounced version
  const searchMovies = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 300),
    [performSearch],
  );

  // Effect to trigger search when the search term changes
  useEffect(() => {
    searchMovies(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]); // Only depend on searchTerm, not searchMovies

  // Handle search result selection
  const handleSelectMovie = (movie: SearchMovie) => {
    setDocumentId(movie.id);
    loadDocument();
  };

  // Load document directly from Firestore
  const loadDocument = async () => {
    if (!documentId.trim()) {
      setMessage({ text: "Please enter a document ID", type: "error" });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { db } = getClientFirebase();
      const docRef = doc(db, collection, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as DocumentData;
        setDocumentData(data);

        // Reset selections and updates
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
      document_name: documentId,
      data_to_upload: updateFields,
    };
  };

  // Update document
  const updateDocument = async () => {
    if (
      !documentId.trim() ||
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
    <>
      <PageHeader text="FILM UPDATE">
        <SousTitre1>Mise à jour des infos d&apos;un film</SousTitre1>
      </PageHeader>

      {/* Mode Selection */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setMode("direct")}
          className={`px-3 py-1.5 text-sm ${
            mode === "direct" ? "bg-retro-gray text-white" : "bg-gray-200"
          }`}
        >
          Direct ID Lookup
        </button>
        <button
          onClick={() => setMode("search")}
          className={`px-3 py-1.5 text-sm ${
            mode === "search" ? "bg-retro-gray text-white" : "bg-gray-200"
          }`}
        >
          Search Movie
        </button>
      </div>

      {/* Direct ID Mode */}
      {mode === "direct" && (
        <div className="mb-6">
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-15px font-medium uppercase">
                Document ID
              </label>
              <RetroInput
                value={documentId}
                setValue={setDocumentId}
                placeholder="Enter document ID (e.g., sauve-peut-vie-1979)"
                className="h-40px"
              />
            </div>

            <div>
              <label className="mb-2 block text-15px font-medium uppercase">
                Collection
              </label>
              <RetroInput
                value={collection}
                setValue={setCollection}
                placeholder="Collection name"
                className="h-40px"
              />
            </div>
          </div>

          <button
            onClick={loadDocument}
            className="bg-retro-gray px-5 py-2 text-15px font-medium uppercase text-white"
          >
            Load Document
          </button>
        </div>
      )}

      {/* Search Mode */}
      {mode === "search" && (
        <div className="mb-6">
          <div className="mb-4">
            <RetroInput
              customTypography
              value={searchTerm}
              setValue={setSearchTerm}
              placeholder="Recherchez un film"
              leftAlignPlaceholder
              transparentPlaceholder
              grayText
              className="h-50px text-21px font-medium uppercase lg:h-57px lg:text-29px lg:tracking-[-0.01em]"
            />
          </div>

          {/* Search Results */}
          {isSearching ? (
            <div className="flex justify-center py-6">
              <Loading />
            </div>
          ) : (
            searchTerm.length > 0 && (
              <div className="border-t">
                {searchResults.length > 0 ? (
                  searchResults.map((movie, i) => (
                    <div
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie)}
                      className={`cursor-pointer border-b py-10px pl-5px text-15px font-medium uppercase leading-20px lg:py-18px lg:pl-10px lg:text-18px lg:leading-21px lg:tracking-[0.01em] ${
                        i % 2 === 1 ? "bg-retro-pale-green" : ""
                      }`}
                    >
                      <u>{movie.title}</u>, {movie.directors} ({movie.year})
                    </div>
                  ))
                ) : (
                  <div className="pt-11px lg:pt-13px">
                    <MetaCopy>
                      Désolé, nous n&apos;avons rien trouvé qui corresponde à
                      votre recherche !
                    </MetaCopy>
                  </div>
                )}
              </div>
            )
          )}

          {/* Collection Selection */}
          {documentId && (
            <div className="mt-4">
              <label className="mb-2 block text-15px font-medium uppercase">
                Collection
              </label>
              <div className="flex gap-2">
                <RetroInput
                  value={collection}
                  setValue={setCollection}
                  placeholder="Collection name"
                  className="h-40px"
                />
                <button
                  onClick={loadDocument}
                  className="bg-retro-gray px-5 py-2 text-15px font-medium uppercase text-white"
                >
                  Load
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-6">
          <Loading />
        </div>
      )}

      {/* Message Display */}
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

      {/* Document Content */}
      {documentData && !isLoading && (
        <div className="mt-6 border-t pt-6">
          <SousTitre1>Document Fields ({documentId})</SousTitre1>

          <div className="mt-4 rounded-md border">
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
                        placeholder={`Enter new value for ${field}`}
                        className="h-35px"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Update Preview */}
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

          {/* Update Button */}
          {Object.keys(updatedValues).length > 0 && (
            <div className="mt-6">
              <button
                onClick={updateDocument}
                className="bg-retro-gray px-5 py-2 text-15px font-medium uppercase text-white"
              >
                Update Document
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
