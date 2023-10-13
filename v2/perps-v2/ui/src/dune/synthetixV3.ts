import client from './index';
import { DuneListResponse } from './types';
import {MOCK_TVL_PROTOCOLS} from "./mockTvlProtocols";
import {MOCK_TVL_SNX} from "./mockTvlSNX";

const TVL_PROTOCOLS_QUERY_ID = 3051552;
const TVL_SNX_QUERY_ID = 3060865;

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