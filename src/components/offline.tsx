"use client";

import { useOfflineStore } from "@/lib/offline";

import styles from "./offline.module.css";

export default function Offline() {
  const offline = useOfflineStore((s) => s.offline);

  return (
    <div
      className={styles.offlineContainer}
      style={{
        ...(offline ? {} : { visibility: "hidden" }),
      }}
    >
      Hors-ligne
    </div>
  );
}
