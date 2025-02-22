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
  );
}

export function BetaClientSideHandler() {
  const isBeta = useIsBetaMode();

  useEffect(() => {
    (async () => {
      console.log({ isBeta });
      if (isBeta) {
        await new Promise((resolve) => setTimeout(resolve));
        toast.message("BETA", {
          id: "beta-toast",
          dismissible: false,
          duration: Infinity,
        });
      } else {
        console.log("dismissing");
        toast.dismiss("beta-toast");
      }
    })();
  }, [isBeta]);

  const router = useRouter();

  useToggleBeta(async () => {
    await setBetaMode();
    router.refresh();
  });

  return null;
}
