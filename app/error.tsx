"use client";

import styles from "@/app/page.module.css";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <h2>Something went wrong</h2>
        <p>This could be a temporary issue, please try your action again.</p>
        <button
          className={styles.errorBtn}
          onClick={() => {
            reset();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
