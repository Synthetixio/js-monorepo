import { useQuery } from '@tanstack/react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { useGetMarkets } from './markets';

interface DelayedOrderResponse {
  data: {
    futuresOrders: DelayedOrder[];
  };
}

export interface DelayedOrder {
  id: string;
  size: string;
  market: string;
  account: string;
  orderId: string;
  targetRoundId: string;
  targetPrice: string;
  marginDelta: string;
  timestamp: string;
  fee: string;
  keeper: string;
  status: string;
  entity: string;
}

const gql = (data: TemplateStringsArray) => data[0];
const query = gql`
  query DelayedOrders {
    futuresOrders(first: 100, oderBy: "timestamp", orderDirection: "desc") {
      id
      size
      market
      account
      fee
      orderId
      targetRoundId
      targetPrice
      marginDelta
      timestamp
      keeper
      status
    }
  }
`;

export const useGetDelayedOrder = () => {
  const { data: marketData } = useGetMarkets();
  return useQuery(['delayedOrders', marketData?.toString()], async () => {
    const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const { data }: DelayedOrderResponse = await response.json();
    return data.futuresOrders.map((data) => ({
      ...data,
      market: marketData?.find((d) => d.id.toLowerCase() === data.market.toLowerCase())?.marketKey,
      entity: 'Futures Order',
    }));
  });
};
