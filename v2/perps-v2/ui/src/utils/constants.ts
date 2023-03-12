export const OPTIMISM_GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kwenta/optimism-perps';
export const PERPS_V2_DASHBOARD_GRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/synthetix-perps/perps';

export const optimisticEthercanLink = (address: string) =>
  `https://optimistic.etherscan.io/address/${address}`;

export enum FuturesMarketAsset {
  sBTC = 'sBTC',
  sETH = 'sETH',
  LINK = 'LINK',
  SOL = 'SOL',
  AVAX = 'AVAX',
  AAVE = 'AAVE',
  UNI = 'UNI',
  MATIC = 'MATIC',
  XAU = 'XAU',
  XAG = 'XAG',
  EUR = 'EUR',
  APE = 'APE',
  DYDX = 'DYDX',
  BNB = 'BNB',
  DOGE = 'DOGE',
  OP = 'OP',
  ATOM = 'ATOM',
  FTM = 'FTM',
  NEAR = 'NEAR',
  FLOW = 'FLOW',
  AXS = 'AXS',
  AUD = 'AUD',
  GBP = 'GBP',
}

export enum FuturesMarketKey {
  sBTCPERP = 'sBTCPERP',
  sETHPERP = 'sETHPERP',
  sLINKPERP = 'sLINKPERP',
  sSOLPERP = 'sSOLPERP',
  sAVAXPERP = 'sAVAXPERP',
  sAAVEPERP = 'sAAVEPERP',
  sUNIPERP = 'sUNIPERP',
  sMATICPERP = 'sMATICPERP',
  sXAUPERP = 'sXAUPERP',
  sXAGPERP = 'sXAGPERP',
  sEURPERP = 'sEURPERP',
  sAPEPERP = 'sAPEPERP',
  sDYDXPERP = 'sDYDXPERP',
  sBNBPERP = 'sBNBPERP',
  sDOGEPERP = 'sDOGEPERP',
  sOPPERP = 'sOPPERP',
  sATOMPERP = 'sATOMPERP',
  sFTMPERP = 'sFTMPERP',
  sNEARPERP = 'sNEARPERP',
  sFLOWPERP = 'sFLOWPERP',
  sAXSPERP = 'sAXSPERP',
  sAUDPERP = 'sAUDPERP',
  sGBPPERP = 'sGBPPERP',
}
