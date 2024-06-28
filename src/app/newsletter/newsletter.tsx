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
      className="flex flex-col gap-10px pb-10px lg:gap-15px lg:pb-0"
    >
      <RetroInput
        className="whitespace-break-spaces py-9px text-20px font-medium uppercase leading-21px"
        value={email}
        setValue={setEmail}
        name="EMAIL"
        placeholder="adresse@mail.com"
      />
      <RetroInput
        className="whitespace-break-spaces py-9px text-20px font-medium uppercase leading-21px"
        value={how}
        setValue={setHow}
        name="MMERGE1"
        placeholder="comment nous connaissez-vous ?"
      />
      <input
        type="submit"
        value="s'inscrire"
        className="cursor-pointer border bg-retro-gray py-9px text-center text-20px font-medium uppercase leading-21px text-white hover:bg-white hover:text-retro-gray"
      />
    </form>
  );
}
