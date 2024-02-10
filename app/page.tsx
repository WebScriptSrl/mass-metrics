import styles from "./page.module.css";

import React, { Suspense } from "react";

import { Header } from "@/components/layout/main/header";
import Footer from "@/components/layout/main/footer";
import Hero from "@/components/layout/content/hero";
import Product from "@/components/layout/content/product";
import { SmallBanner } from "@/components/layout/content/small-banner";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Header />

      <SmallBanner />

      <div className={styles.center}>
        <Hero />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
      <div className={styles.center}>
        <div className={styles.code}></div>
      </div>

      <Footer />
    </main>
  );
}
