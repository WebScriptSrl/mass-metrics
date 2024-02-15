"use client";

import clsx from "clsx";

import styles from "@/components/massa/massa.module.css";

import { useEffect } from "react";

import { NextDraws } from "@/lib/data/types";
import { revalidateData } from "@/lib/data/actions";
import { constants } from "@/lib/data/constants";

export function NextBlockDraws({ response }: { response: NextDraws[] }) {
  useEffect(() => {
    const interval = setInterval(() => {
      revalidateData("addresses");
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const drawsNum = response.length;

  return (
    <>
      <h4>
        Next {response.length > 1 || response.length < 1 ? "Blocks" : "Block"}
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
              ~{(constants.blockReward * drawsNum).toFixed(2)} $MAS{" "}
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
              <p>Period {data.period}</p>
              <p>
                Thread <span>{data.thread}</span>
              </p>
            </div>
          ))}
        {response.length === 0 && <p>No blocks found</p>}
      </div>
    </>
  );
}
