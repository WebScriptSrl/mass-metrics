import styles from "./credits.module.css";

import { Suspense } from "react";

export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}
