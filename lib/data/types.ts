export type StakersResult = {
  jsonrpc: string;
  result: Array<Array<string & number>>;
  id: number;
};

// Addresses API response

export type AddressesResult = {
  jsonrpc: string;
  result: Array<AddressesResponse>;
  id: number;
};

export type ErrorResponse = {
  jsonrpc: string;
  error: ErrorResult;
  id: number;
};

export type ErrorResult = {
  code: number;
  message: string;
  data: string;
};

export type AddressesResponse = {
  address: string;
  thread: number;
  final_balance: string;
  final_roll_count: number;
  final_datastore_keys: Array<string>;
  candidate_balance: string;
  candidate_roll_count: number;
  candidate_datastore_keys: Array<string>;
  deferred_credits: DeferredCreditsResponse[];
  next_block_draws: NextDraws[];
  next_endorsement_draws: NextEndorsementDraws[];
  created_blocks: Array<string>;
  created_operations: Array<string>;
  created_endorsements: Array<string>;
  cycle_infos: CycleInfos[];
};

export type Slot = {
  period: number;
  thread: number;
};

export type DeferredCreditsResponse = {
  slot: Slot;
  amount: string;
};

export type NextDraws = {
  period: number;
  thread: number;
  index: number;
};

export type NextEndorsementDraws = {
  slot: Slot;
  index: number;
};

export type CycleInfos = {
  cycle: number;
  is_final: boolean;
  ok_count: number;
  nok_count: number;
  active_rolls: number;
};

// Status API response

export type StatusResult = {
  jsonrpc: string;
  result: StatusResponse;
  id: number;
};

export type StatusResponse = {
  node_id: string;
  node_ip: string;
  version: string;
  curent_time: number;
  current_cycle: number;
  current_cycle_time: number;
  connected_nodes: ConnectedNodes;
  last_slot: Slot;
  next_slot: Slot;
  consensus_stats: ConsensusStats;
  pool_stats: Array<number & number>;
  network_stats: NetworkStats;
  execution_stats: ExecutionStats;
  config: Config;
  chain_id: number;
};

export type Config = {
  genesis_timestamp: number;
  end_timestamp: number | null;
  thread_count: number;
  t0: number;
  delta_f0: number;
  operation_validity_periods: number;
  periods_per_cycle: number;
  block_reward: string;
  roll_price: string;
  max_block_size: number;
};

export type ExecutionStats = {
  time_window_start: number;
  time_window_end: number;
  final_block_count: number;
  final_executed_operations_count: number;
  active_cursor: Slot;
  final_cursor: Slot;
};

export type NetworkStats = {
  in_connection_count: number;
  out_connection_count: number;
  known_peer_count: number;
  banned_peer_count: number;
  active_node_count: number;
};

export type ConsensusStats = {
  start_timestamp: number;
  end_timestamp: number;
  final_block_count: number;
  stale_block_count: number;
  clique_count: number;
};

export type ConnectedNodes = {
  node_id: Array<string & boolean>;
};
