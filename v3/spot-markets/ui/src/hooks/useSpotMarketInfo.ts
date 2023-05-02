import { useQuery } from '@tanstack/react-query';
import { useSpotMarketProxy, SpotMarketProxyType } from '@snx-v3/useSpotMarketProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';

const SpotMarketInfoSchema = z.object({
  synthAddress: z.string(),
  marketName: z.string(),
});
export type SpotMarketInfoType = z.infer<typeof SpotMarketInfoSchema>;

export async function loadSpotMarketInfo({
  SpotMarketProxy,
  marketId,
}: {
  SpotMarketProxy: SpotMarketProxyType;
  marketId: string | number;
}): Promise<SpotMarketInfoType> {
  const [synthAddress, marketName] = await Promise.all([
    SpotMarketProxy.getSynth(marketId),
    SpotMarketProxy.name(marketId),
  ]);
  return SpotMarketInfoSchema.parse({
    synthAddress,
    marketName,
  });
}

export const useSpotMarketInfo = (marketId: string | number) => {
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const network = useNetwork();
  return useQuery({
    queryKey: ['SpotMarkets', network.name, 'SpotMarketInfo', marketId],
    queryFn: async () => {
      if (!SpotMarketProxy || !marketId) throw 'OMG';
      return await loadSpotMarketInfo({ SpotMarketProxy, marketId });
    },
    enabled: Boolean(SpotMarketProxy && marketId),
  });
};

const SpotMarketStatSchema = z.object({
  reportedDebt: ZodBigNumber.transform((x) => wei(x)),
});
export type SpotMarketStatType = z.infer<typeof SpotMarketStatSchema>;

export async function loadSpotMarketStat({
  SpotMarketProxy,
  marketId,
}: {
  SpotMarketProxy: SpotMarketProxyType;
  marketId: string | number;
}): Promise<SpotMarketStatType> {
  const reportedDebt = await SpotMarketProxy.reportedDebt(marketId);
  return SpotMarketStatSchema.parse({
    reportedDebt,
  });
}

export const useSpotMarketStat = (marketId: string | number) => {
  const { data: SpotMarketProxy } = useSpotMarketProxy();
  const network = useNetwork();
  return useQuery({
    queryKey: ['SpotMarkets', network.name, 'SpotMarketStat', marketId],
    queryFn: async () => {
      if (!SpotMarketProxy || !marketId) throw 'OMG';
      return await loadSpotMarketStat({ SpotMarketProxy, marketId });
    },
    enabled: Boolean(SpotMarketProxy && marketId),
  });
};
