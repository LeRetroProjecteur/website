"use client";

import { useState } from "react";

import RetroInput from "@/components/forms/retro-input";
import { TwoColumnPage } from "@/components/layout/two-column-page";
import { BodyCopy } from "@/components/typography/typography";

export default function NewsletterPage() {
  return <TwoColumnPage left={<Description />} right={<SignupForm />} />;
}

function Description() {
  return (
    <BodyCopy className="pb-20px lg:pb-0">
      «&nbsp;Up Close&nbsp;» est la newsletter hebdomadaire du Rétro Projecteur.
      Tous les mercredis, nous vous proposons un coup de projecteur sur
      l’actualité du cinéma de patrimoine en salle à Paris : recommandations de
      séances, récapitulatif des rétrospectives et événements en cours, un texte
      critique sur un coup de cœur et une courte introduction à un film qu’on
      est curieux de découvrir.
    </BodyCopy>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [how, setHow] = useState("");
  return (
    <form
      action="https://leretroprojecteur.us6.list-manage.com/subscribe/post?u=00a9245e71d3375ef4542a588&amp;id=3270cdb251&amp;f_id=00e804e3f0"
      method="post"
      target="_blank"
      className="flex flex-col gap-10px lg:gap-15px"
    >
      <RetroInput
        value={email}
        setValue={setEmail}
        name="EMAIL"
        placeholder="adresse@mail.com*"
      />
      <RetroInput
        value={how}
        setValue={setHow}
        name="MMERGE1"
        placeholder="comment nous connaissez-vous ?"
      />
      <input
        type="submit"
        value="s'inscrire"
        className="h-42px cursor-pointer border bg-retro-gray text-center text-15px font-medium uppercase text-white hover:bg-white hover:text-retro-gray lg:h-48px lg:text-20px"
      />
      <div className="font-medium leading-20px text-retro-gray">
        *champ obligatoire
      </div>
    </form>
  );
}
