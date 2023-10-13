import client from './index';
import { DuneListResponse } from './types';
import {MOCK_TVL_PROTOCOLS} from "./mockTvlProtocols";
import {MOCK_TVL_SNX} from "./mockTvlSNX";
import { MOCK_SNX_SUPPLY } from './mockSNXusdSupply';
import {MOCK_DAILY_DELEGATION} from "./mockDailyDelegation";

const TVL_PROTOCOLS_QUERY_ID = 3051552;
const TVL_SNX_QUERY_ID = 3060865;
const SNXusd_SUPPLY_MINT_QUERY_ID = 3059967;
const DAILY_DELEGATION_QUERY_ID = 3060540;

export async function getTvlProtocols() {
  return MOCK_TVL_PROTOCOLS as DuneListResponse<DuneTvlProtocol>;
  return client.refresh(TVL_PROTOCOLS_QUERY_ID).then((res: any) => {
    return res.result as DuneListResponse<DuneTvlProtocol>;
  });
}

export async function getTvlSNX() {
  return MOCK_TVL_SNX as DuneListResponse<DuneTvlSNX>;
  return client.refresh(TVL_SNX_QUERY_ID).then((res: any) => {
    return res.result as DuneListResponse<DuneTvlSNX>;
  });
}

export async function getSNXusdSupply() {
  return MOCK_SNX_SUPPLY as DuneListResponse<DuneSNXSupply>;
  return client.refresh(SNXusd_SUPPLY_MINT_QUERY_ID).then((res: any) => {
    return res.result as DuneListResponse<DuneSNXSupply>;
  });
}

export async function getDailyDelegations() {
  return MOCK_DAILY_DELEGATION as DuneListResponse<DuneDailyDelegation>;
  return client.refresh(DAILY_DELEGATION_QUERY_ID).then((res: any) => {
    return res.result as DuneListResponse<DuneDailyDelegation>;
  });
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

export interface DuneTvlSNX {
  day: string;
  eth_SNX: number;
  op_SNX: number;
}

export interface DuneSNXSupply {
  day: string;
  token: string;
  eth_snxUSD_supply: number;
  eth_mints: number;
  eth_burns: number;
  op_snxUSD_supply: number;
  op_mints: number;
  op_burns: number;
}

export interface DuneDailyDelegation {
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