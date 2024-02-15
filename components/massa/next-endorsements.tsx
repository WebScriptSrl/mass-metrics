"use client";

import clsx from "clsx";

import styles from "@/components/massa/massa.module.css";

import { NextEndorsementDraws } from "@/lib/data/types";
import { constants } from "@/lib/data/constants";

export function NextEndorsementDraws({
  response,
}: {
  response: NextEndorsementDraws[];
}) {
  const drawsNum = response.length;

  return (
    <>
      <h4>
        Next{" "}
        {response.length > 1 || response.length < 1
          ? "Endorsements"
          : "Endorsement"}
      </h4>
      <div className={styles.drawsInfo}>
        {drawsNum < 6 && drawsNum > 0 && (
          <p className={styles.textSmall}>
            Found: <span className={styles.infoSmall}>{drawsNum}</span>.
          </p>
        )}
        {drawsNum > 5 && (
          <p className={styles.textSmall}>
            Found: <span className={styles.infoSmall}>{drawsNum}</span>. Showing{" "}
            <span className={styles.infoSmall}>
              {drawsNum > 5 ? "the next 5" : drawsNum}
            </span>
            .
          </p>
        )}
        {drawsNum === 0 && <p className={styles.infoSmall}>Unlucky</p>}
        {drawsNum > 0 && (
          <p className={styles.textSmall}>
            Possible reward{" "}
            <span className={styles.infoSmall}>
              ~{(constants.endorsementReward * drawsNum).toFixed(2)} $MAS{" "}
            </span>
          </p>
        )}
      </div>
      <div className={styles.nextDrawsContainer}>
        {response.length > 0 &&
          response.slice(0, 5).map((data, i) => (
            <div
              key={i}
              className={clsx(
                styles.slotBox,
                response.length > 0 ? styles.pulse : undefined
              )}
            >
              <p>Period {data.slot.period}</p>
              <p>
                Thread <span>{data.slot.thread}</span>
              </p>
            </div>
          ))}
        {response.length === 0 && <p>No endorsements found</p>}
      </div>
    </>
  );
}
