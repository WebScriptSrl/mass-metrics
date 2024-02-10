// Purpose: Contains the query for fetching Massa blockchain data.

export const allStakersQuery = {
  jsonrpc: "2.0",
  method: "get_stakers",
  id: 0,
  revalidate: 10,
  tags: ["stakers"],
};

export const addressesQuery = {
  jsonrpc: "2.0",
  method: "get_addresses",
  id: 0,
  revalidate: 10,
  tags: ["addresses"],
};

export const nextDrawsQuery = {
  jsonrpc: "2.0",
  method: "get_addresses",
  id: 0,
  revalidate: 10,
  tags: ["nextDraws"],
};

export const nextEndorsementDrawsQuery = {
  jsonrpc: "2.0",
  method: "get_addresses",
  id: 0,
  revalidate: 10,
  tags: ["nextEndorsementDraws"],
};

export const cycleQuery = {
  jsonrpc: "2.0",
  method: "get_addresses",
  id: 0,
  revalidate: 60,
  tags: ["cycle"],
};

export const statusQuery = {
  jsonrpc: "2.0",
  method: "get_status",
  id: 0,
  revalidate: 60,
};
