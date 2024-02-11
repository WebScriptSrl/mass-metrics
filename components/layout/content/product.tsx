import styles from "@/components/layout/content/content.module.css";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { shortenAddress, formatNumber } from "@/lib/utils";
import CopyButton from "@/components/copyButton";
import { StakersResult } from "@/lib/data/types";

export default async function Product({
  res,
  MASSA_ADDRESS,
  MASSA_SPONSOR_ADDRESS,
}: {
  res: StakersResult;
  MASSA_ADDRESS: string;
  MASSA_SPONSOR_ADDRESS: string;
}) {
  const stakers = res.result.length;

  const totalRolls = res.result.reduce(
    (a: number, b: Array<number>) => a + b[1],
    0
  );

  const addressIndex = res.result
    .map(function (item: Array<string>) {
      return item.find((address) => address === MASSA_ADDRESS);
    })
    .indexOf(MASSA_ADDRESS);

  const addressRolls = res.result[addressIndex][1];

  const addressRank = addressIndex ? addressIndex + 1 : null;

  const rollPrice = 100;

  // Calculate share percentage based on total rolls
  const addressShare =
    addressRolls && totalRolls
      ? ((addressRolls / totalRolls) * 100).toFixed(5) + "%"
      : null;

  return (
    <main className={styles.productMain}>
      <section className={styles.howTo}>
        <div>
          <h2>How it works?</h2>
          <ul className={styles.code}>
            <li>Data is revalidated every 10s!</li>
            <li>Simply search your Massa staking address.</li>
            <li>Or, spy other validators addresses to get an idea!</li>
          </ul>

          <h2>What data?</h2>
          <ul className={styles.code}>
            <li>Address Rank</li>
            <li>Rolls Info</li>
            <li>Deferred (vested) credits - time left</li>
            <li>Rolls share percentage</li>
            <li>Next recoreded blocks for production</li>
            <li>Next recoreded endorsements</li>
            <li>Missed blocks</li>
            <li>Total stakers</li>
            <li>Last Cycles Info</li>
          </ul>
        </div>
        <div>
          <h2>Node Status</h2>
          <p>Still under development! But is going to come soon!</p>
          <p>Stay tuned and follow MassMetrix on social media</p>
          {MASSA_SPONSOR_ADDRESS && (
            <p className={styles.howToSupport}>
              We have a lot of ideas! And if you want to support our
              development:{" "}
              <span className={styles.code}>
                You can do that at the following $MASSA address:
              </span>{" "}
              <span className={styles.massaAddress}>
                {shortenAddress(MASSA_SPONSOR_ADDRESS)}
                <CopyButton text={MASSA_SPONSOR_ADDRESS} />
              </span>
            </p>
          )}
        </div>
      </section>
      <section className={styles.example}>
        <div className={styles.code}>
          <ul>
            <li>Not a Massa staker yet?</li>
            <li> You can check our address!</li>
            <li>Copy, paste and get the data.</li>
          </ul>
        </div>
        <div className={styles.center}>
          {MASSA_ADDRESS && (
            <div className={styles.code}>
              <p className={styles.massaAddress}>
                Massa Address: {shortenAddress(MASSA_ADDRESS)}
                <CopyButton text={MASSA_ADDRESS} />
              </p>
            </div>
          )}
        </div>

        <div className={styles.center}>
          <div className={styles.code}>
            {addressRank !== null &&
              addressRank > 0 &&
              stakers !== null &&
              addressRolls !== null && (
                <>
                  <p>
                    Rank: {formatNumber(addressRank)} with{" "}
                    {formatNumber(addressRolls)} rolls
                  </p>

                  <p>
                    Address is in the top{" "}
                    {Math.ceil((addressRank / stakers) * 100)}% stakers
                  </p>

                  <p>Rolls share percentage: {addressShare}</p>
                </>
              )}

            {addressRank === null && <p>This address is not amoung stakers</p>}
            {addressRolls === null ||
              (stakers === null && <p>Server might be down</p>)}
          </div>
        </div>

        <div className={styles.code}>
          {stakers !== null && totalRolls !== null && (
            <>
              <p>Total Stakers: {formatNumber(stakers)}</p>
              <p>Total Rolls: {formatNumber(totalRolls)}</p>
              <p>Total staked $MASSA: {formatNumber(totalRolls * rollPrice)}</p>
            </>
          )}

          {stakers === null ||
            (totalRolls === null && <p>Server might be down</p>)}
        </div>
      </section>
    </main>
  );
}
