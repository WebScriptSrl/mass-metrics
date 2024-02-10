import styles from "./main.module.css";

import Image from "next/image";
import Search from "@/components/layout/main/search";
import { Suspense } from "react";

export async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.description}>
        <Suspense>
          <Search />
        </Suspense>
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logo}>
            <h2>MassMetri</h2>
            <Image
              src="/mass_metri_X.svg"
              alt="Mass Metrix X Logo"
              className={styles.xSvg}
              width={48}
              height={48}
              priority
            />
          </a>
        </div>
      </div>
    </header>
  );
}
