import styles from "@/app/data/all-credits/credits.module.css";

import { Suspense } from "react";
import { Metadata } from "next";

import prisma from "@/lib/prisma/prisma";

import { SmallBanner } from "@/components/layout/content/small-banner";
import Footer from "@/components/layout/main/footer";
import { Header } from "@/components/layout/main/header";
import { shortenAddress } from "@/lib/utils";
import { DeferredCredit } from "@/lib/data/types";
import DeferredCredits from "@/components/massa/all-credits";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<Metadata> {
  const { q: searchQuery } = searchParams || {};

  const title = searchQuery
    ? `Deferred credits for "${searchQuery}"`
    : `Deferred credits on Massa blockchain`;
  const description = searchQuery
    ? `Deferred credits, vested coins and unlocked time left for "${searchQuery}" address on Massa blockchain explorer`
    : `Deferred credits, vested coins, unlocked time left, release date of $MASSA`;

  return {
    title,
    description,
  };
}

const handleSearch = async (address: string): Promise<DeferredCredit[]> => {
  const deferredCredits = prisma.$queryRaw`
    SELECT amount, period, thread, "deferredCreditId"
    FROM  "CreditData"
    FULL JOIN "DeferredCredit" ON "CreditData"."deferredCreditId" = "DeferredCredit".id
    WHERE "DeferredCredit".address = ${address};
  `;

  return deferredCredits as unknown as DeferredCredit[];
};

export default async function AllCredits({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const query = searchParams?.q || "";

  const massaAddress = query;

  try {
    const credits = await handleSearch(massaAddress);

    return (
      <>
        <Header />
        <SmallBanner />
        <div className={styles.center}>
          <h1 className={styles.code}>
            Deferred credits for {shortenAddress(massaAddress)}
          </h1>
        </div>
        <div className={styles.center}>
          <Suspense fallback={<div>Loading...</div>}>
            <DeferredCredits credits={credits} address={massaAddress} />
          </Suspense>
        </div>
        <div className={styles.center}>
          <div className={styles.releaseInfo}>
            <h2 className={styles.code}>Deferred credits $MASSA</h2>

            <p className={styles.code}>
              Deferred credits are the $MASSA coins that are locked for a
              certain period of time (24 months).
            </p>
            <p className={styles.code}>
              The coins are locked in a slot and will be released after a
              certain period of time.
            </p>

            <p className={styles.code}>
              The coins are released at random intervals, but all holders have
              24 fixed slots.
            </p>
            <p className={styles.code}>
              Therefore, in a month you can have 1 or 2 amounts released, and in
              another month you can have none released.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  } catch (e) {
    console.error(e);
    return (
      <>
        <Header />
        <SmallBanner />
        <div className={styles.center}>
          <h1 className={styles.code}>Small Database issues</h1>
        </div>
        <div className={styles.center}>
          <p>Please check the address and try again.</p>
        </div>
        <div className={styles.center}>
          <p>If the address is correct our database might have some issues.</p>
        </div>
        <div className={styles.center}>
          <p>Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }
}
