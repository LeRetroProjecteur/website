"use client";

import { useState } from "react";

import { MiddleColumn } from "@/components/articles/articles";
import RetroInput from "@/components/forms/retro-input";
import { Loading } from "@/components/icons/loading";
import { ThreeColumnPage } from "@/components/layout/page";
import PageHeader from "@/components/layout/page-header";
import { TextBox } from "@/components/layout/text-boxes";
import { SousTitre1 } from "@/components/typography/typography";

function renderInput(
  label: string,
  value: string,
  setValue: (value: string) => void,
  placeholder: string,
) {
  return (
    <div className="flex items-center gap-4">
      <label className="block w-32 text-16px font-medium uppercase">
        {label}
      </label>
      <RetroInput
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        className="h-40px w-full"
        leftAlignPlaceholder={true}
        lowercase={true}
      />
    </div>
  );
}

export default function AddMoviePage() {
  return (
    <>
      <PageHeader text="Ajout de film">
        <SousTitre1>Ajouter un nouveau film</SousTitre1>
      </PageHeader>
      <ThreeColumnPage>
        <MiddleColumn>
          <AddMovie />
        </MiddleColumn>
      </ThreeColumnPage>
    </>
  );
}

function AddMovie() {
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
    <div className="flex flex-col gap-y-20px">
      {/* Avec un ID */}
      <div className="flex flex-col gap-y-10px">
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
      </div>

      <div>
        <p className="border-y py-10px text-sm text-gray-600">
          Si vous avez fourni un ID au dessus, les autres champs sont
          facultatifs
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-y-10px">
        {renderInput(
          "Titre *",
          formData.title,
          (value) => handleInputChange("title", value),
          "Entrez le titre du film",
        )}
        {renderInput(
          "Cinéaste *",
          formData.director,
          (value) => handleInputChange("director", value),
          "Cinéaste (e.g., Jean-Luc Godard)",
        )}
        {renderInput(
          "Année *",
          formData.year,
          (value) => handleInputChange("year", value),
          "Année de sortie (e.g., 1997)",
        )}
        {renderInput(
          "Durée",
          formData.duration,
          (value) => handleInputChange("duration", value),
          "Durée en minutes (e.g., 120)",
        )}
        {renderInput(
          "Langue",
          formData.language,
          (value) => handleInputChange("language", value),
          "Langue originale (e.g., français)",
        )}
      </div>

      {/* Submit Button */}
      <div>
        <TextBox
          onClick={!isLoading ? addNewMovie : undefined}
          className={`bg-retro-gray text-white ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          {isLoading ? "En attente..." : "Rajouter le film"}
        </TextBox>
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
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
