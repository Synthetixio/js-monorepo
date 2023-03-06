import { BigNumber, utils } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { OPTIMISM_GRAPH_URL } from '../utils/constants';
import { useGetMarkets } from './markets';

interface FuturesMarginTransferGraphResponse {
  data: {
    futuresMarginTransfer: {
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
  query FuturesMarginTransfer {
    futuresMarginTransfer(first: 100) {
      id
      timestamp
      account
      market
      size
      txHash
    }
  }
`;
export const useGetFuturesMarginTransfer = () => {
  const { data: marketData } = useGetMarkets();
  return useQuery(['markets'], async () => {
    const response = await fetch(OPTIMISM_GRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const { data }: FuturesMarginTransferGraphResponse = await response.json();

    return data.futuresMarginTransfer.map((data) => ({
      ...data,
      size: utils.parseEther(data.size),
      market: marketData?.find((d) => d.id.toLowerCase() === data.market.toLowerCase())?.marketKey,
    })) as FuturesMarginTransfer[];
  });
};
