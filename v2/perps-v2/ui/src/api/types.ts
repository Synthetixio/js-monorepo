export interface DuneTvl {
  tvlByLayer: DuneTvlLayer[];
  tvlByProtocol: DuneTvlProtocol[];
}

export interface DuneTvlProtocol {
  day: string;
  blockchain: string;
  token: string;
  bal: number;
  bal_usd: number;
  total_token: number;
  total_token_usd: number;
  layer_usd: number;
  total_usd: number;
}

export interface DuneTvlLayer {
  day: string;
  eth_SNX: number;
  op_SNX: number;
}

export interface DuneMintBurn {
  day: string;
  token: string;
  eth_snxUSD_supply: number;
  eth_mints: number;
  eth_burns: number;
  op_snxUSD_supply: number;
  op_mints: number;
  op_burns: number;
}

export interface DuneDelegation {
  day: string;
  blockchain: string;
  token: string;
  tokenPrice: number;
  poolId: string;
  currentName: string;
  daily_delegations: number;
  daily_delegations_USD: number;
  cumDelegation: number;
  ID: string;
}
