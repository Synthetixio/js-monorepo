import { useQuery } from '@tanstack/react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { useGetMarkets } from './markets';

interface FuturesTradesResponse {
  data: {
    futuresTrades: FuturesTrades[];
  };
}

export interface FuturesTrades {
  id: string;
  timestamp: string;
  account: string;
  margin: string;
  market: string;
  positionId: string;
  size: string;
  feesPaidToSynthetix: string;
  type: string;
  pnl: string;
  positionClosed: string;
  positionSize: string;
  price: string;
  entity: string;
}

export const useGetFuturesTrades = () => {
  const { data: marketData } = useGetMarkets();
  return useQuery(['futuresTrades', marketData?.toString()], async () => {
    const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query FuturesTrades {
                        futuresTrades(first: 100, oderBy: "timestamp", orderDirection: "desc") {
                          id
                          timestamp
                          account
                          margin
                          market
                          positionId
                          size
                          feesPaidToSynthetix
                          type
                          pnl
                          positionClosed
                          positionSize
                          price
            }
          }`,
      }),
    });
    const { data }: FuturesTradesResponse = await response.json();
    // @TODO why is market still undefined?

    return data.futuresTrades.map((data) => ({
      ...data,
      market: marketData?.find((d) => d.id.toLowerCase() === data.market.toLowerCase())?.marketKey,
      entity: 'Futures Trade',
    }));
  });
};
