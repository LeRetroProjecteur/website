"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useKey } from "react-use";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useBeta } from "./beta-context";
import { Feature } from "./beta-handler";
import { toggleBetaMode, toggleFeature } from "./toggle-beta";

const password = "betamax";

function useToggleBeta(onToggleBeta: () => void) {
  const step = useRef(0);

  useKey(
    () => true,
    ({ key }) => {
      const nextLetter = password.charAt(step.current);
      if (key === nextLetter) {
        if (step.current === password.length - 1) {
          step.current = 0;
          onToggleBeta();
        } else {
          step.current++;
        }
      } else {
        step.current = 0;
      }
    },
  );
}

export function BetaClientSideHandler() {
  const beta = useBeta();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (beta.showBetaUi) {
        await new Promise((resolve) => setTimeout(resolve));
        toast.message(
          () => (
            <span
              className="cursor-pointer"
              onClick={() => setDialogOpen(true)}
            >
              BETA
            </span>
          ),
          {
            id: "beta-toast",
            dismissible: false,
            duration: Infinity,
          },
        );
      } else {
        toast.dismiss("beta-toast");
      }
    })();
  }, [beta]);

  const router = useRouter();

  useToggleBeta(async () => {
    await toggleBetaMode();
    router.refresh();
  });

  return (
    <Dialog modal={false} open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>Features</DialogHeader>
        <div>
          {Object.entries(beta.features).map(([feature, isActivated]) => (
            <div key={feature} className="flex justify-between">
              <Label htmlFor={feature}>{feature}</Label>
              <Switch
                id={feature}
                checked={isActivated}
                onCheckedChange={async () => {
                  await toggleFeature(feature as Feature);
                  router.refresh();
                }}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
