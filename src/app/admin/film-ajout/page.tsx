"use client";

import { useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import { Loading } from "@/components/icons/loading";
import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { SousTitre1 } from "@/components/typography/typography";

export default function AddMoviePage() {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    year: "",
    duration: "",
    language: "",
    allocine_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add new movie
  const addNewMovie = async () => {
    // Validate required fields - if allocine_id is provided, other fields aren't required
    if (
      !formData.allocine_id &&
      (!formData.title || !formData.director || !formData.year)
    ) {
      setMessage({
        text: "Either Allocine ID or Title, Director, and Year are required",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Create payload
      const payload = {
        title: formData.title,
        directors: formData.director,
        year: parseInt(formData.year, 10) || formData.year,
        duration: formData.duration
          ? parseInt(formData.duration, 10) * 60 || formData.duration
          : "",
        language: formData.language,
        allocine_id: formData.allocine_id,
        status: "add",
      };

      const API_ENDPOINT =
        "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_document_to_db";

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
        text: `Movie added successfully`,
        type: "success",
      });

      // Reset form
      setFormData({
        title: "",
        director: "",
        year: "",
        duration: "",
        language: "",
        allocine_id: "",
      });
    } catch (error) {
      console.error("Error adding new movie:", error);
      setMessage({
        text: `Error adding movie: ${(error as Error).message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader text="FILM AJOUT">
        <SousTitre1>Ajouter un nouveau film</SousTitre1>
      </PageHeader>

      <div className="max-w-2xl">
        {/* Allocine ID Field */}
        <div className="mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            <label className="block w-32 text-15px font-medium uppercase">
              Allocine ID
            </label>
            <RetroInput
              value={formData.allocine_id}
              setValue={(value) => handleInputChange("allocine_id", value)}
              placeholder="ID Allocine (ex: 123456)"
              className="h-40px w-full"
              leftAlignPlaceholder={true}
              lowercase={true}
            />
          </div>
          <p className="mt-2 pl-36 text-sm text-gray-600">
            Si vous fournissez l&apos;ID Allocine, les autres champs sont
            facultatifs
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <label className="block w-32 text-16px font-medium uppercase">
              Titre *
            </label>
            <RetroInput
              value={formData.title}
              setValue={(value) => handleInputChange("title", value)}
              placeholder="Entrez le titre du film"
              className="h-40px w-full"
              leftAlignPlaceholder={true}
              lowercase={true}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="block w-32 text-16px font-medium uppercase">
              Réal. *
            </label>
            <RetroInput
              value={formData.director}
              setValue={(value) => handleInputChange("director", value)}
              placeholder="Nom du réalisateur"
              className="h-40px w-full"
              leftAlignPlaceholder={true}
              lowercase={true}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="block w-32 text-15px font-medium uppercase">
              Année *
            </label>
            <RetroInput
              value={formData.year}
              setValue={(value) => handleInputChange("year", value)}
              placeholder="Année de sortie (ex: 1997)"
              className="h-40px w-full"
              leftAlignPlaceholder={true}
              lowercase={true}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="block w-32 text-15px font-medium uppercase">
              Durée
            </label>
            <RetroInput
              value={formData.duration}
              setValue={(value) => handleInputChange("duration", value)}
              placeholder="Durée en minutes (ex: 120)"
              className="h-40px w-full"
              leftAlignPlaceholder={true}
              lowercase={true}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="block w-32 text-15px font-medium uppercase">
              Langue
            </label>
            <RetroInput
              value={formData.language}
              setValue={(value) => handleInputChange("language", value)}
              placeholder="Langue originale (ex: français)"
              className="h-40px w-full"
              leftAlignPlaceholder={true}
              lowercase={true}
            />
          </div>
        </div>

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

        {/* Submit Button */}
        <div className="mt-6">
          <TextBox
            onClick={!isLoading ? addNewMovie : undefined}
            className={`w-full max-w-xs bg-retro-gray text-white ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            {isLoading ? "Adding..." : "Add Movie"}
          </TextBox>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
