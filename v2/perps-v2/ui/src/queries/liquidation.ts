import { useQuery } from 'react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { useGetMarkets } from './markets';

interface LiquidationResponse {
  data: {
    positionLiquidateds: PositionLiquidated[];
  };
}

export interface PositionLiquidated {
  id: string;
  liquidator: string;
  market: string;
  size: string;
  price: string;
  fee: string;
  block: string;
  timestamp: string;
  type: string;
  entity: string;
}

export function useGetLiquidations() {
  const { data: markets } = useGetMarkets();
  return useQuery(['liquidations', markets?.toString()], async () => {
    const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: `query PositionLiquidated {
                  positionLiquidateds(first: 100, oderBy: "timestamp", orderDirection: "desc") {
                        id
                        account
                        liquidator
                        market
                        size
                        price
                        fee
                        block
                        timestamp
                    }
                }`,
      }),
    });
    const { data }: LiquidationResponse = await response.json();

    return data.positionLiquidateds.map((position) => ({
      ...position,
      market: markets?.find(
        (d) => d.id.toLowerCase() === position.market.toLowerCase()
      )?.marketKey,
      entity: 'Position Liquidated',
    }));
  });
}
