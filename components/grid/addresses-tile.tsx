import styles from "@/components/grid/grid.module.css";

import { AddressesResult, ErrorResponse } from "@/lib/data/types";

import { formatNumber, shortenAddress } from "@/lib/utils";
import CopyButton from "../copyButton";
import { DeferredCredits } from "../massa/deferred-credits";
import { NextBlockDraws } from "../massa/next-blocks";
import { CyclesInfo } from "../massa/cycles-info";
import { NextEndorsementDraws } from "../massa/next-endorsements";
import Link from "next/link";
import NavButton from "../navButton";

export function AddressesTile({
  active,
  response,
}: {
  active: boolean;
  response: AddressesResult | ErrorResponse;
}) {
  const resError = response as ErrorResponse;
  const addressesRes = response as AddressesResult;

  return (
    <>
      {active &&
        !resError.error &&
        addressesRes.result.length > 0 &&
        addressesRes.result.map((data) => (
          <div key={data.address} className={styles.fullGridItem}>
            <h2>
              {shortenAddress(data.address)}
              <CopyButton text={data.address} />
            </h2>
            <div className={styles.addressInfo}>
              <p className={styles.codeBox}>
                Final balance{" "}
                <span className={styles.info}>
                  {formatNumber(Number(data.final_balance))}
                </span>
              </p>
              <p className={styles.codeBox}>
                Candidate balance{" "}
                <span className={styles.info}>
                  {formatNumber(Number(data.candidate_balance))}
                </span>
              </p>
              <p className={styles.codeBox}>
                Final rolls{" "}
                <span className={styles.info}>
                  {formatNumber(data.final_roll_count)}
                </span>
              </p>
              <p className={styles.codeBox}>
                Candidate rolls{" "}
                <span className={styles.info}>
                  {formatNumber(data.candidate_roll_count)}
                </span>
              </p>
            </div>

            <a
              href="https://github.com/calyn05/next-auto-rolls.git"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>
                Auto roll buy <span>-&gt;</span>
              </p>
            </a>

            <span className={styles.separator} />

            {data.deferred_credits.length > 0 && (
              <div className={styles.creditsBox}>
                <h3>Deferred credits</h3>
                <DeferredCredits active={active} response={addressesRes} />
                <NavButton
                  href="/data/all-credits"
                  from="/data/address"
                  address={data.address}
                  text="View all"
                />
              </div>
            )}
            <span className={styles.separator} />
            <NextBlockDraws response={data.next_block_draws} />
            <span className={styles.separator} />
            <NextEndorsementDraws response={data.next_endorsement_draws} />
            <span className={styles.separator} />
            <CyclesInfo cycles={data.cycle_infos} />
          </div>
        ))}

      {resError.error && (
        <div className={styles.fullGridItem}>
          <h2 className={styles.warning}>Error</h2>
          <p className={styles.info}>{resError.error.message}</p>
          <p>Not a Massa blockchain address, or just a typo! Search again!</p>
        </div>
      )}
    </>
  );
}
