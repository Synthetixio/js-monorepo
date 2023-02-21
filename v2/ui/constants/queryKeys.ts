import { WeiSource } from '@synthetixio/wei';

export const QUERY_KEYS = {
  Swaps: {
    quote1Inch: (walletAddress: string, networkId: number, amount: WeiSource) => [
      'quote',
      '1inch',
      walletAddress,
      networkId,
      amount,
    ],
    swap1Inch: (
      walletAddress: string,
      networkId: number,
      amount: WeiSource,
      fromAddress: string
    ) => ['swap', '1inch', walletAddress, networkId, amount, fromAddress],
  },
};

export default QUERY_KEYS;
