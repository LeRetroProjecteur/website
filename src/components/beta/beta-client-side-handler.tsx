"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useKey } from "react-use";
import { toast } from "sonner";

import { useIsBetaMode } from "./beta-context";
import { setBetaMode } from "./toggle-beta";

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
    { target: document },
  );
}

export function BetaClientSideHandler() {
  const isBeta = useIsBetaMode();

  useEffect(() => {
    if (isBeta) {
      toast.message("BETA", {
        id: "beta-toast",
        dismissible: true,
        duration: Infinity,
      });
    } else {
      toast.dismiss("beta-toast");
    }
  }, [isBeta]);

  const router = useRouter();

  useToggleBeta(async () => {
    await setBetaMode();
    router.refresh();
  });

  return null;
}
