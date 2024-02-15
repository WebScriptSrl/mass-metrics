import styles from "@/components/layout/content/content.module.css";

import Image from "next/image";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.code}>
        Welcome to
        <span className={styles.logo}>
          MassMetri
          <Image
            src="/mass_metri_X.svg"
            alt="Mass Metrix X Logo"
            className={styles.xSvg}
            width={48}
            height={48}
            priority
          />
        </span>
      </h1>
      <p className={styles.code}>Real time data for Massa Stakers!</p>
      <p className={styles.code}>Check all deferred (vested) credits</p>
      <p className={styles.code}>Check your Node Status simple and easy!</p>
      <p className={styles.code}>
        Spy other validators to get an idea of what you can achieve!
      </p>
    </div>
  );
}
