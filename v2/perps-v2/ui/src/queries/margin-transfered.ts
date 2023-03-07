import { BigNumber, utils } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { PERPS_V2_DASHBOARD_GRAPH_URL } from '../utils/constants';
import { useGetMarkets } from './markets';

interface FuturesMarginTransferGraphResponse {
  data: {
    futuresMarginTransfers: {
      id: string;
      timestamp: string;
      account: string;
      market: string;
      size: string;
      txHash: string;
    }[];
  };
}

export interface FuturesMarginTransfer {
  id: string;
  timestamp: string;
  account: string;
  market: string;
  size: BigNumber;
  txHash: string;
}

const gql = (data: TemplateStringsArray) => data[0];
const query = gql`
  query FuturesMarginTransfer($oneHourAgo: Int) {
    futuresMarginTransfers(
      first: 1000
      oderBy: "timestamp"
      orderDirection: "desc"
      where: { timestamp_gt: $oneHourAgo }
    ) {
      id
      timestamp
      account
      market
      size
      txHash
    }
  }
`;

const oneHourAgo = Math.floor(new Date().getTime() / 1000 - 3600);

export const useGetFuturesMarginTransfer = () => {
  const { data: marketData } = useGetMarkets();
  return useQuery(
    ['marginTransferred', JSON.stringify(marketData)],
    async () => {
      const response = await fetch(PERPS_V2_DASHBOARD_GRAPH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query, variables: { oneHourAgo } }),
      });
      const { data }: FuturesMarginTransferGraphResponse = await response.json();

      return data.futuresMarginTransfers.map((data) => ({
        ...data,
        size: utils.parseEther(data.size),
        market: marketData?.find((d) => d.id.toLowerCase() === data.market.toLowerCase())
          ?.marketKey,
        entity: 'Margin Transferred',
      })) as FuturesMarginTransfer[];
    },
    { refetchInterval: 30000 }
  );
};
