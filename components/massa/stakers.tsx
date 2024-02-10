import styles from "@/components/massa/massa.module.css";

import { formatNumber } from "@/lib/utils";

export function Stakers({
  totalStakers,
  totalRolls,
  rollPrice,
}: {
  totalStakers: number;
  totalRolls: number;
  rollPrice: number;
}) {
  return (
    <div className={styles.stakersBox}>
      <p>
        Total stakers{" "}
        <span className={styles.info}>{formatNumber(totalStakers)}</span>
      </p>
      <p>
        Total rolls{" "}
        <span className={styles.info}>{formatNumber(totalRolls)}</span>
      </p>
      <p>
        Total staked <b>$MASSA</b>{" "}
        <span className={styles.info}>
          {formatNumber(totalRolls * rollPrice)}
        </span>
      </p>
    </div>
  );
}
