"use client";

import { useState } from "react";
import { toast } from "sonner";

import RetroInput from "../forms/retro-input";
import { TextBox } from "../layout/text-boxes";
import { MetaCopy } from "../typography/typography";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

const ADD_ALERT_URL =
  "https://europe-west1-website-cine.cloudfunctions.net/trigger_add_email_alert_to_db";

export default function MovieAlertDialog({
  movie,
}: {
  movie: { id: string; title: string };
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  async function submit() {
    setPending(true);
    try {
      const response = await fetch(ADD_ALERT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie_id: movie.id, user_email: email }),
        mode: "cors",
        signal: AbortSignal.timeout(15000),
      });
      // The cloud function reports its own errors inside a 200 response.
      const body = await response.json();
      if (!response.ok || body.error != null) {
        throw new Error(body.error ?? response.status);
      }
      setOpen(false);
      setEmail("");
      toast.success("Alerte créée !");
    } catch (error) {
      console.error("Could not create the movie alert:", error);
      toast.error("Votre alerte n'a pas pu être créée.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <TextBox className="grow-0 px-20px" onClick={() => setOpen(true)}>
        Créez votre alerte
      </TextBox>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>Créez votre alerte</DialogHeader>
          <MetaCopy lowercase className="border-b pb-17px text-center">
            Nous vous écrirons dès que <i>{movie.title}</i> sera de nouveau à
            l&apos;affiche. Un seul email, promis.
          </MetaCopy>
          <div className="flex flex-col gap-y-10px pt-17px">
            <RetroInput
              value={email}
              setValue={setEmail}
              placeholder="votre email"
              leftAlignPlaceholder
              lowercase
              className="px-8px py-9px"
            />
            <TextBox
              className={
                email.includes("@") && !pending ? "" : "text-retro-gray"
              }
              onClick={() => {
                if (email.includes("@") && !pending) {
                  submit();
                }
              }}
            >
              {pending ? "Envoi..." : "Créer l'alerte"}
            </TextBox>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
