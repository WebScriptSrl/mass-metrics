// From Massa Docs
const defaultPublicPort = "33035";

const fullBlockReward = 0.4;
const endorsementsNumber = 16; // 16 endorsements per block
const equalParts = 1 + endorsementsNumber;

// Best case scenario: 1 block + 16 endorsements
// Validators can miss blocks and endorsements
// but we assume they are always present for reward calculation
// so we can calculate the maximum reward per block
// This is the maximum reward for a block with 16 endorsements

const blockCreationReward = fullBlockReward / equalParts;
const endorsementCreationReward = blockCreationReward / 3;

const blockReward =
  blockCreationReward +
  endorsementCreationReward * endorsementsNumber +
  endorsementCreationReward * endorsementsNumber;

const endorsementReward = endorsementCreationReward;

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
