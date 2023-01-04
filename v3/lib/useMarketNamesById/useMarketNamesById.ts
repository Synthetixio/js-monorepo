import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';
import { useExternalMulticall } from '@snx-v3/useExternalMulticall';
import { z } from 'zod';

const MarketNamesSchema = z.array(z.string());

const marketAbi = ['function name(uint128 marketId) external view returns (string memory)'];
const marketInterface = new utils.Interface(marketAbi);

export const useMarketNamesById = (
  marketIdsAndAddresses?: { marketId: string; address: string }[]
) => {
  const { data: MultiCall } = useExternalMulticall();
  return useQuery({
    queryKey: [{ marketIdsAndAddresses }, 'MarketNamesById'],
    queryFn: async () => {
      if (!marketIdsAndAddresses || !MultiCall) {
        throw Error('Query should not be enable when contract or marketIdsAndAddresses missing');
      }
      const calls = marketIdsAndAddresses.map((x) => ({
        target: x.address,
        callData: marketInterface.encodeFunctionData('name', [x.marketId]),
      }));
      const result = await MultiCall.callStatic.aggregate(calls);
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
    enabled: Boolean(MultiCall && marketIdsAndAddresses && marketIdsAndAddresses.length > 0),
  });
};
