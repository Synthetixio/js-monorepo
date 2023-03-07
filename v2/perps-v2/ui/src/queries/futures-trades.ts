import { useQuery } from '@tanstack/react-query';
import { BigNumber, utils } from 'ethers';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/numbers';
import { useGetMarkets } from './markets';

interface FuturesTradesResponse {
  data: {
    futuresTrades: {
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
      txHash: string;
      futuresOrder: {
        status: string;
      };
    }[];
  };
}

export interface FuturesTrades {
  id: string;
  timestamp: string;
  account: string;
  margin: string;
  market: string;
  positionId: string;
  size: BigNumber;
  feesPaidToSynthetix: string;
  type: string;
  pnl: string;
  positionClosed: string;
  positionSize: BigNumber;
  price: string;
  entity: string;
  txHash: string;
  futuresOrder: {
    status: string;
  };
}
const gql = (data: TemplateStringsArray) => data[0];
const query = gql`
  query FuturesTrades($oneHourAgo: Int) {
    futuresTrades(
      first: 1000
      oderBy: "timestamp"
      orderDirection: "desc"
      where: { timestamp_gt: $oneHourAgo }
    ) {
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
      txHash
      futuresOrder {
        status
      }
    }
  }
`;

const oneHourAgo = Math.floor(new Date().getTime() / 1000 - 3600);

export const useGetFuturesTrades = () => {
  const { data: marketData } = useGetMarkets();
  return useQuery(
    ['futuresTrades', JSON.stringify(marketData)],
    async () => {
      const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            oneHourAgo,
          },
        }),
      });
      const { data }: FuturesTradesResponse = await response.json();
      return data.futuresTrades.map((data) => ({
        ...data,
        size: utils.parseEther(data.size),
        positionSize: utils.parseEther(data.positionSize),
        price: numberWithCommas((Number(data.price) / 1e18).toString(), 2),
        market: marketData?.find((d) => d.id.toLowerCase() === data.market.toLowerCase())
          ?.marketKey,
        entity: 'Futures Trade',
      })) as FuturesTrades[];
    },
    { refetchInterval: 30000 }
  );
};
