import styles from "./page.module.css";

import React, { Suspense } from "react";

import { getStakers } from "@/lib/data";
import { StakersResult } from "@/lib/data/types";

import { Header } from "@/components/layout/main/header";
import Footer from "@/components/layout/main/footer";
import Hero from "@/components/layout/content/hero";
import Product from "@/components/layout/content/product";
import { SmallBanner } from "@/components/layout/content/small-banner";

const { MASSA_ADDRESS, MASSA_SPONSOR_MNS } = process.env;

async function getData() {
  try {
    const res: StakersResult = await getStakers();
    return res;
  } catch (error: any) {
    console.error("Get stakers - Home", error.message);
  }
}

export default async function Home() {
  const res = await getData();
  return (
    <>
      <main className={styles.main}>
        <Header />
        <SmallBanner />

        <div className={styles.center}>
          <Hero />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {MASSA_ADDRESS && MASSA_SPONSOR_MNS && res && (
            <Product
              res={res}
              MASSA_ADDRESS={MASSA_ADDRESS}
              MASSA_SPONSOR_MNS={MASSA_SPONSOR_MNS}
            />
          )}

          {!res && <div>Loading...</div>}
        </Suspense>
        <div className={styles.center}>
          <div className={styles.code}></div>
        </div>

        <Footer />
      </main>
    </>
  );
}
