import { ReadonlyURLSearchParams } from "next/navigation";

import { constants } from "./data/constants";
import { CycleInfos } from "./data/types";

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const shortenAddress = (address: string, length = 6) => {
  const start = address.slice(0, length);
  const end = address.slice(-length);
  return `${start}...${end}`;
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const parmasString = params.toString();
  const queryString = `${parmasString.length ? "?" : ""}${parmasString}`;

  return `${pathname}${queryString}`;
};

export const formatNumber = (number: number) =>
  new Intl.NumberFormat("en-US").format(number);

// Copy text to clipboard - new Clipboard API
export const copyToClipboard = async (text: string) => {
  navigator.clipboard.writeText(text);

  // check if the text was copied to the clipboard
  if ((await navigator.clipboard.readText()) === text) {
    console.log("Text copied to clipboard");
  } else {
    console.error("Text not copied to clipboard");
  }
};

// Paste text from clipboard - new Clipboard API
export const pasteFromClipboard = async () => {
  const text = await navigator.clipboard.readText();

  console.log("Text pasted from clipboard", text);

  return text;
};

// Scroll into view
export const scrollToElement = (element: string) => {
  const el = document.getElementById(element);
  el?.scrollIntoView({ behavior: "smooth" });
};

// Metadata

const metadata = (target: string) => {
  return () => import(`./metadata/${target}.json`).then((m) => m.default);
};

export const getMetadata = async (target: string) => {
  const metadataFile = await metadata(target)();
  return metadataFile;
};

// Calculate time from current period and thread

export const calculateRemainingTime = ({
  period,
  thread,
}: {
  period: number;
  thread: number;
}) => {
  const currentTime = Date.now();

  const periodTime = period * constants.periodTime + constants.genesisTimestamp;

  const threadTime = thread * constants.threadTime;

  const nextUnlockedTime = periodTime + threadTime;

  const remainingTime = nextUnlockedTime - currentTime;

  const date = new Date(nextUnlockedTime);

  return {
    remainingTime,
    date,
  };
};

// Convert miliseconds to days, hours, minutes and seconds

export const msToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  const daysString = days > 0 ? `${days}d ` : "";
  const hoursString = hours > 0 ? `${hours}h ` : "";
  const minutesString = minutes > 0 ? `${minutes}m ` : "";
  const secondsString = seconds > 0 ? `${seconds}s` : "";

  return `${daysString}${hoursString}${minutesString}${secondsString}`;
};

// Calculate date from timestamp

export const calculateDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Tick function

export const tick = (callback: () => void, interval: number) => {
  const tick = () => {
    callback();
    setTimeout(tick, interval);
  };

  tick();
};

// Calculate number of produced blocks

export const calculateBlocks = (cycles: Array<CycleInfos>) => {
  const producedBlocks = cycles.reduce((a, b) => a + b.ok_count, 0);
  const missedBlocks = cycles.reduce((a, b) => a + b.nok_count, 0);
  const cyclesNum = cycles.length;

  return {
    producedBlocks,
    missedBlocks,
    cyclesNum,
  };
};

// Ip address validation

export const isIpV4 = (ip: string) => {
  const ipV4Arr = ip.split(".");
  if (ipV4Arr.length !== 4) return false;
  return ipV4Arr.every(
    (segment) => parseInt(segment) >= 0 && parseInt(segment) <= 255
  );
};

export const isIpV6 = (ip: string) => {
  const ipV6Arr = ip.split(":");
  if (ipV6Arr.length !== 8) return false;
  return ipV6Arr.every((segment) => segment.length <= 4);
};
