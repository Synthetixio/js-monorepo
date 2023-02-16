import { useQuery } from '@tanstack/react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { FuturePosition } from './positions';

export function useGetPosition(id: string) {
  return useQuery(
    ['position', id],
    async () => {
      const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
        method: 'POST',
        body: JSON.stringify({
          query: `query FuturesPosition{
                    futuresPosition(id: "${id}") {
                        id
                        account
                        isLiquidated
                        market
                        isOpen
                        openTimestamp
                        closeTimestamp
                        margin
                        initialMargin
                        entryPrice
                        lastPrice
                        pnl
                        exitPrice
                        leverage
                        size
                        long
                        trades
                        totalVolume
                        feesPaidToSynthetix
                    }
                }`,
        }),
      });
      const {
        data,
      }: {
        data: {
          futuresPosition: FuturePosition;
        };
      } = await response.json();
      return data;
    },
    { enabled: !!id }
  );
}
