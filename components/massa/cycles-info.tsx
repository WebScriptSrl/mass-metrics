import styles from "@/components/massa/massa.module.css";

import { CycleInfos } from "@/lib/data/types";

import { calculateBlocks, formatNumber } from "@/lib/utils";

export function CyclesInfo({ cycles }: { cycles: CycleInfos[] }) {
  // Order the cycles by cycle number
  cycles.sort((a, b) => b.cycle - a.cycle);

  return (
    <>
      <h4>Last 4 cycles info</h4>
      <div className={styles.cyclesContainer}>
        {cycles.splice(0, 4).map((cycle) => (
          <div key={cycle.cycle} className={styles.slotBox}>
            <h4>Cycle {formatNumber(cycle.cycle)}</h4>
            <p>
              <span
                className={
                  cycle.is_final === false ? styles.current : styles.infoSmall
                }
              >
                {cycle.is_final === false ? "Current cycle" : "Is final"}
              </span>{" "}
            </p>
            <p>
              Produced blocks:{" "}
              <span className={styles.info}>{cycle.ok_count}</span>
            </p>
            <p className={cycle.nok_count > 0 ? styles.warning : styles.ok}>
              Missed blocks: <span>{cycle.nok_count}</span>
            </p>
            <p>
              Active rolls:{" "}
              <span className={styles.infoSmall}>{cycle.active_rolls}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
