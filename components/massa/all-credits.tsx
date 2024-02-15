import styles from "@/components/massa/massa.module.css";

import { DeferredCredit } from "@/lib/data/types";
import { calculateRemainingTime } from "@/lib/utils";
import { Time } from "./time";
import NavButton from "../navButton";

export default function DeferredCredits({
  credits,
  address,
}: {
  credits: DeferredCredit[];
  address: string;
}) {
  const pastCredits = credits.filter((credit) => {
    const time = new Date();
    const date = calculateRemainingTime({
      period: credit.period,
      thread: credit.thread,
    }).date;

    return date < time;
  });

  const numberUnlocked = pastCredits.length;

  const futureCredits = credits.filter((credit) => {
    const time = new Date();
    const date = calculateRemainingTime({
      period: credit.period,
      thread: credit.thread,
    }).date;

    return date > time;
  });

  const futureCreditsAmount = futureCredits.reduce(
    (acc, credit) => acc + Number(credit.amount),
    0
  );

  const numberFuture = futureCredits.length;

  const pastCreditsAmount = pastCredits.reduce(
    (acc, credit) => acc + Number(credit.amount),
    0
  );

  return (
    <div className={styles.deferredInfo}>
      <NavButton
        href="/data/address"
        from="/data/all-credits"
        address={address}
        text="Back to staking info"
      />
      <div className={styles.infoContainer}>
        <div className={styles.infoBox}>
          <h3>
            Unlocks done: <span className={styles.ok}>{numberUnlocked}</span>
          </h3>
          <p>
            $MASSA unlocked:{" "}
            <span className={styles.ok}>{pastCreditsAmount}</span>
          </p>
        </div>

        <div className={styles.infoBox}>
          <h3>
            Future unlocks: <span className={styles.info}>{numberFuture}</span>
          </h3>
          <p>
            $MASSA locked:{" "}
            <span className={styles.info}>{futureCreditsAmount}</span>
          </p>
        </div>

        <div className={styles.infoBox}>
          <h3>
            Total:{" "}
            <span className={styles.ok}>{numberUnlocked + numberFuture}</span>
          </h3>
          <p>
            Total $MASSA:{" "}
            <span className={styles.ok}>
              {pastCreditsAmount + futureCreditsAmount}
            </span>
          </p>
        </div>
      </div>

      <div className={styles.deferredInfoContainer}>
        <ul>
          {futureCredits.map((credit, i) => (
            <li key={credit.deferredCreditId}>
              <p>Period {credit.period}</p>
              <p>Thread {credit.thread}</p>
              <p>
                Amount <span className={styles.info}>{credit.amount}</span>
              </p>
              <p className={styles.time}>
                Time remaining{" "}
                <Time period={credit.period} thread={credit.thread} />
              </p>
              <span className={styles.code}>{i + 1}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
