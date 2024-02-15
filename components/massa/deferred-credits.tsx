import styles from "@/components/massa/massa.module.css";

import { AddressesResult } from "@/lib/data/types";
import { formatNumber } from "@/lib/utils";
import { Time } from "./time";

export function DeferredCredits({
  active = false,
  response,
}: {
  active: boolean;
  response: AddressesResult;
}) {
  return (
    <div className={styles.deferredInfo}>
      {active &&
        response.result.map(
          (data) =>
            data.deferred_credits.length > 0 && (
              <ul key={data.address}>
                {data.deferred_credits.map((credit, i) => (
                  <li key={i}>
                    <h4>Period {credit.slot.period}</h4>
                    <h5>Thread {credit.slot.thread}</h5>
                    <p>
                      Amount{" "}
                      <span className={styles.info}>
                        {formatNumber(Number(credit.amount))}
                      </span>
                    </p>
                    <p className={styles.time}>
                      Time remaining{" "}
                      <Time
                        period={credit.slot.period}
                        thread={credit.slot.thread}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            )
        )}
    </div>
  );
}
