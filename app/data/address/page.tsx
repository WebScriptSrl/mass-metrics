import styles from "./search.module.css";

import { Suspense } from "react";
import { Metadata } from "next";

import { ThreeItemGrid } from "@/components/grid/three-items";
import { Header } from "@/components/layout/main/header";
import Footer from "@/components/layout/main/footer";
import { SmallBanner } from "@/components/layout/content/small-banner";
import Link from "next/link";
import Search from "@/components/layout/main/search";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<Metadata> {
  const { q: searchQuery } = searchParams || {};

  const title = searchQuery
    ? `Stats and metric results for "${searchQuery}"`
    : `Stats for a Massa blockchain address`;
  const description = searchQuery
    ? `Search results, statistics and metrics for "${searchQuery}" address on Massa blockchain explorer`
    : `Search for a Massa blockchain address`;

  return {
    title,
    description,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    ip?: string;
    port?: string;
  };
}) {
  const query = searchParams?.q || "";

  const ip = searchParams?.ip || "";

  const port = searchParams?.port || "";

  const massaAddress = query;

  if (!massaAddress) {
    return (
      <div className={styles.center}>
        <h1>Search for a Massa address</h1>
      </div>
    );
  }

  const validAddress =
    massaAddress.startsWith("AU") && massaAddress.length > 32;

  if (!validAddress) {
    return (
      <div className={styles.center}>
        <div className={styles.notValidBox}>
          <h2>Not a valid Massa address!</h2>
          <p>Search again!</p>
          <Search />
          <p>Or go home!</p>
          <button className={styles.homeBtn}>
            <Link href="/">Go Home!</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <SmallBanner />

      <div className={styles.center}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThreeItemGrid massaAddress={massaAddress} ip={ip} port={port} />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}
