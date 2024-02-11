import {
  StakersResult,
  AddressesResult,
  StatusResult,
  NextDraws,
  NextEndorsementDraws,
  Slot,
  CycleInfos,
  ErrorResponse,
} from "./types";
import {
  addressesQuery,
  allStakersQuery,
  cycleQuery,
  nextDrawsQuery,
  statusQuery,
} from "./queries";

const { HOST, PUBLIC_PORT, PRIVATE_PORT } = process.env;

const { DEV_HOST, DEV_PUBLIC_PORT, DEV_PRIVATE_PORT } = process.env;

const { NODE_ENV } = process.env;

export const { RPC_VERSION } = process.env || "2.0";

export const PUBLIC_ENDPOINT =
  NODE_ENV === "development"
    ? `http://${DEV_HOST}:${DEV_PUBLIC_PORT}`
    : `http://${HOST}:${PUBLIC_PORT}`;

export const PRIVATE_ENDPOINT =
  NODE_ENV === "development"
    ? `http://${DEV_HOST}:${DEV_PRIVATE_PORT}`
    : `http://${HOST}:${PRIVATE_PORT}`;

export async function fetchData<T>({
  cache,
  headers,
  jsonrpc,
  method,
  params,
  id,
  revalidate,
  tags,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  jsonrpc: string;
  method: string;
  params?: Array<Record<string, unknown>> | Array<string[]>;
  id: number;
  revalidate?: number;
  tags?: string[];
  endpoint: string;
}): Promise<{ body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        jsonrpc,
        method,
        params,
        id,
      }),
      cache,
      next: {
        revalidate,
        ...tags,
      },
    });

    const body = await result.json();

    if (result.status === 200 && !body.error) {
      return { body };
    } else {
      throw new Error("Error fetching data", body.error.message);
    }
  } catch (error: any) {
    throw new Error("Error fetching data", error.message);
  }
}

export async function getStakers(): Promise<StakersResult> {
  const result = await fetchData<StakersResult>({
    jsonrpc: allStakersQuery.jsonrpc,
    method: allStakersQuery.method,
    id: allStakersQuery.id,
    revalidate: allStakersQuery.revalidate,
    tags: allStakersQuery.tags,
    endpoint: PUBLIC_ENDPOINT,
  });

  return result.body;
}

export async function getPagedStakers(
  limit: number,
  offset: number
): Promise<StakersResult> {
  const result = await fetchData<StakersResult>({
    jsonrpc: allStakersQuery.jsonrpc,
    method: allStakersQuery.method,
    params: [{ limit, offset }],
    id: allStakersQuery.id,
    revalidate: allStakersQuery.revalidate,
    endpoint: PUBLIC_ENDPOINT,
  });

  return result.body;
}

export async function getAddresses(
  addresses: Array<string[]>
): Promise<AddressesResult | ErrorResponse> {
  const result = await fetchData<AddressesResult>({
    jsonrpc: addressesQuery.jsonrpc,
    method: addressesQuery.method,
    params: [...addresses],
    id: addressesQuery.id,
    revalidate: addressesQuery.revalidate,
    tags: addressesQuery.tags,
    endpoint: PUBLIC_ENDPOINT,
  });

  return result.body;
}

// Next draws API response

export async function getNextBlockDraws(
  addresses: Array<string[]>
): Promise<Array<NextDraws[]>> {
  const result = await fetchData<AddressesResult>({
    jsonrpc: nextDrawsQuery.jsonrpc,
    method: nextDrawsQuery.method,
    params: [...addresses],
    id: nextDrawsQuery.id,
    revalidate: nextDrawsQuery.revalidate,
    tags: nextDrawsQuery.tags,
    endpoint: PUBLIC_ENDPOINT,
  });

  const nextBlocks = result.body.result.map((data) => {
    return data.next_block_draws;
  });

  return nextBlocks;
}

export async function getNextEndorsementsDraws(
  addresses: Array<string[]>
): Promise<Array<NextEndorsementDraws[]>> {
  const result = await fetchData<AddressesResult>({
    jsonrpc: nextDrawsQuery.jsonrpc,
    method: nextDrawsQuery.method,
    params: [...addresses],
    id: nextDrawsQuery.id,
    revalidate: nextDrawsQuery.revalidate,
    tags: nextDrawsQuery.tags,
    endpoint: PUBLIC_ENDPOINT,
  });

  const nextBlocks = result.body.result.map((data) => {
    return data.next_endorsement_draws;
  });

  return nextBlocks;
}

// Cycles info API response

export async function getCyclesInfo(
  addresses: Array<string[]>
): Promise<CycleInfos[]> {
  const result = await fetchData<AddressesResult>({
    jsonrpc: cycleQuery.jsonrpc,
    method: cycleQuery.method,
    params: [...addresses],
    id: cycleQuery.id,
    revalidate: cycleQuery.revalidate,
    tags: cycleQuery.tags,
    endpoint: PUBLIC_ENDPOINT,
  });

  const cycles = result.body.result.map((data) => {
    return data.cycle_infos;
  });

  return cycles[0];
}

// Status API response

export async function getStatus(): Promise<StatusResult> {
  const result = await fetchData<StatusResult>({
    ...statusQuery,
    endpoint: PUBLIC_ENDPOINT,
  });

  return result.body;
}

export async function statusActiveCursor(): Promise<Slot> {
  const result = await fetchData<StatusResult>({
    ...statusQuery,
    endpoint: PUBLIC_ENDPOINT,
  });

  const activeCursor = result.body.result.execution_stats.active_cursor;

  return activeCursor;
}
