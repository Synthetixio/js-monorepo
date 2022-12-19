import { useContractReads } from 'wagmi';

const marketAbi = ['function name(uint128 marketId) external view returns (string memory)'];
// @TODO rewrite from wagmi
export const useGetMarketNamesById = (
  marketIdsAndAddresses?: { marketId: string; address: string }[]
) => {
  const contractCalls = marketIdsAndAddresses?.map(({ marketId, address }) => ({
    addressOrName: address,
    contractInterface: marketAbi,
    functionName: 'name',
    args: [marketId],
  }));

  const queryResult = useContractReads({
    contracts: contractCalls || [],
    enabled: Boolean(marketIdsAndAddresses && marketIdsAndAddresses.length > 0),
  });

  const formatData = (data?: string[]) => {
    if (!data) return data;
    return data.reduce((acc: Record<string, string | undefined>, marketName, index) => {
      const marketId = marketIdsAndAddresses?.[index].marketId;
      if (!marketId) return acc;
      acc[marketId] = marketName;
      return acc;
    }, {});
  };
  return { ...queryResult, data: formatData(queryResult.data as unknown as string[] | undefined) };
};
