"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useOfflineStore } from "@/lib/offline";

import styles from "./offline.module.css";

export default function Offline() {
  const offline = useOfflineStore((s) => s.offline);
  const backOnline = useOfflineStore((s) => s.backOnline);
  const router = useRouter();
  const refresh = useCallback(() => router.refresh(), [router]);

  return (
    <div
      className={styles.offlineContainer}
      style={{
        ...(backOnline ? { backgroundColor: "var(--green" } : {}),
        visibility: offline ? "visible" : "hidden",
      }}
    >
      <div className={styles.offlineBox}>
        <div>{backOnline ? "De retour en ligne" : "Hors-ligne"}</div>
        {backOnline ? (
          <div>
            <a
              className={styles.refreshLink}
              style={{ textDecoration: "underline" }}
              onClick={refresh}
            >
              Actualiser
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
