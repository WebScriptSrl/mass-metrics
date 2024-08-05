import styles from "@/components/grid/grid.module.css";

import { ErrorResponse, StakersResult } from "@/lib/data/types";
import { calculateBlocks, formatNumber } from "@/lib/utils";
import { Stakers } from "../massa/stakers";
import { getCyclesInfo } from "@/lib/data";

export async function StakersTile({
  active,
  address,
  response,
}: {
  active: boolean;
  address: string;
  response: StakersResult | ErrorResponse;
}) {
  const resError = response as ErrorResponse;
  const stakersRes = response as StakersResult;

  const rollPrice = 100;

  const totalStakers = stakersRes?.result.length;

  const totalRolls = stakersRes?.result.reduce(
    (a: number, b: number[]) => a + b[1],
    0
  );

  // Check if address is in the stakers list

  if (
    !stakersRes?.result.some((item: Array<string>) => item.includes(address))
  ) {
    return (
      <div className={styles.stakersContainer}>
        <div>
          <h3>Staking details</h3>
          <p className={styles.info}>Address not found in stakers list</p>
        </div>
        <Stakers
          totalStakers={totalStakers}
          totalRolls={totalRolls}
          rollPrice={rollPrice}
        />
      </div>
    );
  }

  const addressIndex = stakersRes?.result
    .map(function (item: Array<string>) {
      return item.find((address) => address === address);
    })
    .indexOf(address);

  const addressRank = addressIndex + 1;

  const addressRolls = stakersRes?.result[addressIndex][1];

  const addressShare = ((addressRolls / totalRolls) * 100).toFixed(5) + "%";

  const cyclesInfo = await getCyclesInfo([[address]]);
  const { producedBlocks, missedBlocks, cyclesNum } =
    calculateBlocks(cyclesInfo);

  return (
    <div className={styles.stakersContainer}>
      {active && addressRank > 0 && !resError.error && (
        <>
          <div className={styles.stakingInfo}>
            <h2>Staking details</h2>
            <p className={styles.rank}>
              Address rank{" "}
              <span className={styles.info}>{formatNumber(addressRank)}</span>
            </p>
            <p className={styles.codeBox}>
              Active rolls
              <span className={styles.info}>
                {formatNumber(addressRolls)}{" "}
              </span>{" "}
            </p>
            <p>
              Address is in the top{" "}
              <span className={styles.info}>
                {Math.ceil((addressRank / totalStakers) * 100)}%
              </span>{" "}
              stakers
            </p>
            <p>
              Rolls share percentage:{" "}
              <span className={styles.info}>{addressShare} </span>
            </p>
            <div className={styles.lastCyclesInfo}>
              <p>
                In the last{" "}
                <span className={styles.info}>{cyclesNum} cycles</span>
              </p>
              <ul className={styles.flexCenter}>
                <li>
                  Produced blocks:{" "}
                  <span className={styles.info}>{producedBlocks}</span>
                </li>
                <li className={missedBlocks > 0 ? styles.warning : styles.ok}>
                  Missed blocks: <span>{missedBlocks}</span>
                </li>
              </ul>
            </div>
          </div>

          <Stakers
            totalStakers={totalStakers}
            totalRolls={totalRolls}
            rollPrice={rollPrice}
          />
        </>
      )}

      {!addressRank && !resError && (
        <>
          <div>
            <h3>Staking details</h3>
            <p>Address not found in stakers list</p>
          </div>
          <Stakers
            totalStakers={totalStakers}
            totalRolls={totalRolls}
            rollPrice={rollPrice}
          />
        </>
      )}

      {resError.error && (
        <div>
          <h3>Staking details</h3>
          <p className={styles.info}>
            Server responded with {resError.error.message}
          </p>
        </div>
      )}
    </div>
  );
}
