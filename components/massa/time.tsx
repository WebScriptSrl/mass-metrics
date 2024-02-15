"use client";

import styles from "@/components/massa/massa.module.css";

import { useState, useEffect } from "react";

import { calculateRemainingTime, msToTime } from "@/lib/utils";

export function Time({ period, thread }: { period: number; thread: number }) {
  const [time, setTime] = useState(0);

  const date = calculateRemainingTime({ period, thread }).date;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateRemainingTime({ period, thread }).remainingTime);
    });

    return () => clearInterval(interval);
  }, [period, thread]);

  return (
    <>
      <span className={styles.info}>{msToTime(time)}</span>
      <span className={styles.ok}>{date?.toDateString()}</span>
    </>
  );
}
