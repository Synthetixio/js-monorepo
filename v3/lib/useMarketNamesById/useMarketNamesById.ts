import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';
import { useMulticall3 } from '@snx-v3/useMulticall3';
import { z } from 'zod';
import { useNetwork } from '@snx-v3/useBlockchain';

const MarketNamesSchema = z.array(z.string());

const marketAbi = ['function name(uint128 marketId) external view returns (string memory)'];
const marketInterface = new utils.Interface(marketAbi);

export const useMarketNamesById = (
  marketIdsAndAddresses?: { marketId: string; address: string }[]
) => {
  const { data: MultiCall3 } = useMulticall3();
  const network = useNetwork();
  return useQuery({
    queryKey: [
      network.name,
      'MarketNamesById',
      {
        markets: marketIdsAndAddresses
          ? marketIdsAndAddresses.map((market) => market.marketId).sort()
          : [],
      },
    ],
    queryFn: async () => {
      if (!marketIdsAndAddresses || !MultiCall3) {
        throw Error('Query should not be enable when contract or marketIdsAndAddresses missing');
      }
      const calls = marketIdsAndAddresses.map((x) => ({
        target: x.address,
        callData: marketInterface.encodeFunctionData('name', [x.marketId]),
      }));
      const result = await MultiCall3.callStatic.aggregate(calls);
      const decoded = result.returnData.map(
        (bytes) => marketInterface.decodeFunctionResult('name', bytes)[0]
      );
      return MarketNamesSchema.parse(decoded);
    },
    select: (marketNames) =>
      marketNames.reduce((acc: Record<string, string | undefined>, marketName, index) => {
        const marketId = marketIdsAndAddresses?.[index].marketId;
        if (!marketId) return acc;
        acc[marketId] = marketName;
        return acc;
      }, {}),
    enabled: Boolean(MultiCall3 && marketIdsAndAddresses && marketIdsAndAddresses.length > 0),
  });
};
