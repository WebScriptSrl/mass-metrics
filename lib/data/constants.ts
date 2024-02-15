// From Massa
const defaultPublicPort = "33035";

const endorsementReward = 0.02;
const blockReward = 0.7;

const genesisTimestamp = 1705312800000;

const threads = 32;
const slot = 1;
const period = 1;
const periodTime = 16000;

const slotsPerPeriod = threads;

const cycles = 128 * period;
const cycleTime = cycles * periodTime;

const shiftedSlotsTime = periodTime / slotsPerPeriod;

const threadTime = shiftedSlotsTime;

const blocksPerSecond = 2;

const blocksPerCycle = (cycleTime / 1000) * blocksPerSecond;

export const constants = {
  defaultPublicPort,
  endorsementReward,
  blockReward,
  genesisTimestamp,
  threads,
  slot,
  period,
  periodTime,
  slotsPerPeriod,
  cycles,
  cycleTime,
  shiftedSlotsTime,
  blocksPerSecond,
  blocksPerCycle,
  threadTime,
};
