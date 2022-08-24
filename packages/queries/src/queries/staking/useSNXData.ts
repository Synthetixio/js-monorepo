import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import Wei, { wei } from '@synthetixio/wei';
import { BaseProvider } from '@ethersproject/providers';
import { formatBytes32String } from '@ethersproject/strings';
import { useGetSNXHolders } from '../../subgraph/mainSubgraphQueries';
import { DEFAULT_SUBGRAPH_ENDPOINTS } from '../../constants';
import { address, abi } from '@synthetixio/contracts/build/mainnet/deployment/Synthetix';
import { Contract } from '@ethersproject/contracts';

interface SNXData {
  lockedSupply: Wei;
  lockedValue: Wei;
  totalSNXSupply: Wei;
}
const ONE_HOUR_MS = 1000 * 60 * 60;

const useSNXData = (
  ctx: QueryContext,
  L1Provider?: BaseProvider,
  options?: UseQueryOptions<SNXData>
) => {
  const Synthetix = useMemo(() => new Contract(address, abi, L1Provider), []);
  const snxHoldersQueryL1 = useGetSNXHolders(
    DEFAULT_SUBGRAPH_ENDPOINTS[1].subgraph,
    {
      first: 8000,
      orderBy: 'collateral',
      orderDirection: 'desc',
      where: { initialDebtOwnership_not: '0' },
    },
    {
      collateral: true,
      transferable: true,
      initialDebtOwnership: true,
    },
    {
      queryKey: ['L1', 'SNXHoldersL1'],
      staleTime: ONE_HOUR_MS,
      cacheTime: ONE_HOUR_MS,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const snxHoldersQueryL2 = useGetSNXHolders(
    DEFAULT_SUBGRAPH_ENDPOINTS[10].subgraph,
    {
      first: 8000,
      orderBy: 'collateral',
      orderDirection: 'desc',
      where: { initialDebtOwnership_not: '0' },
    },
    {
      collateral: true,
      transferable: true,
      initialDebtOwnership: true,
    },
    {
      queryKey: ['L2', 'SNXHoldersL2'],
      staleTime: ONE_HOUR_MS,
      cacheTime: ONE_HOUR_MS,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const lockedSupplyL1 =
    snxHoldersQueryL1.data?.reduce(
      (acc, val) => acc.add(val.collateral?.sub(val.transferable || wei(0)) || wei(0)),
      wei(0)
    ) || wei(0);

  const lockedSupplyL2 =
    snxHoldersQueryL2.data?.reduce(
      (acc, val) => acc.add(val.collateral?.sub(val.transferable || wei(0)) || wei(0)),
      wei(0)
    ) || wei(0);

  return useQuery<SNXData>(
    [
      'staking',
      'snxLockedValue',
      ctx.networkId,
      lockedSupplyL1.toString(),
      lockedSupplyL2.toString(),
    ],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');

      const snxPriceP = ctx.snxjs.contracts.ExchangeRates.rateForCurrency(
        formatBytes32String('SNX')
      );

      const totalSNXSupplyP = Synthetix.totalSupply();

      const [snxPrice, totalSNXSupply] = await Promise.all([snxPriceP, totalSNXSupplyP]);
      if (
        snxHoldersQueryL1.isSuccess &&
        snxHoldersQueryL1.data.length > 100 &&
        snxHoldersQueryL2.isSuccess &&
        snxHoldersQueryL2.data.length > 100
      ) {
        const lockedSupply = lockedSupplyL1.add(lockedSupplyL2);
        return {
          totalSNXSupply: wei(totalSNXSupply),
          lockedSupply,
          lockedValue: lockedSupply.mul(snxPrice),
        };
      }
      return {
        totalSNXSupply: wei(0),
        lockedSupply: wei(0),
        lockedValue: wei(0),
      };
    },
    {
      enabled: ctx.snxjs != null,
      ...options,
    }
  );
};
export default useSNXData;
