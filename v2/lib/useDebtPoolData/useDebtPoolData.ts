import { useQuery } from '@tanstack/react-query';

export type ApiResp = {
  cap: string;
  currencyKey: string;
  debt_in_percent: string;
  debt_in_usd: string;
  eth_wrapper_ccy_legacy: string;
  futures_debt_usd: string;
  futures_skew_ccy: string;
  loans_ccy: string;
  position_in_ccy: string;
  position_in_usd: string;
  position_type: string;
  price: string;
  shorts_ccy: string;
  supply: string;
  timestamp: string;
  user_debt_hedge_in_ccy: string;
  user_debt_hedge_in_usd: string;
  user_debt_hedge_with_correlation_in_usd: string;
  wrappers_ccy: string;
}[];
const formatDebtPoolData = (spreadsheetData: ApiResp) => {
  return spreadsheetData.map((x) => ({
    name: x.currencyKey,
    totalSupply: parseFloat(x.supply),
    poolProportion: parseFloat(x.debt_in_percent) / 100,
    value: parseFloat(x.price),
    positionInUsd: parseFloat(x.position_in_usd),
    userDebtHedgeWithCorrelationInUsd: parseFloat(x.user_debt_hedge_with_correlation_in_usd),
  }));
};

const DEBT_DATA_URL = 'https://api.synthetix.io/debt-pool-comp';

export const useDebtPoolData = () =>
  useQuery({
    queryKey: ['debt-pool-data'],
    queryFn: async () => {
      const resp = await fetch(DEBT_DATA_URL);
      const spreadsheetData = await resp.json();
      const formattedData = await formatDebtPoolData(spreadsheetData);
      return formattedData
        .filter(({ name }) => name !== 'total_excluding_sUSD')
        .sort((a, b) => (a.poolProportion < b.poolProportion ? 1 : -1));
    },
    staleTime: 100000,
  });
