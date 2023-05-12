import { useQuery } from '@tanstack/react-query';
import { useSynthTokenModule, SynthTokenModuleType } from '@snx-v3/useSynthTokenModule';
import { useNetwork } from '@snx-v3/useBlockchain';
import { z } from 'zod';
import { ZodBigNumber } from '@snx-v3/zod';
import { wei } from '@synthetixio/wei';

const TokenInfoSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  decimals: ZodBigNumber.transform((x) => wei(x)),
});
export type TokenInfoType = z.infer<typeof TokenInfoSchema>;

export async function loadTokenInfo({
  SynthTokenModule,
}: {
  SynthTokenModule: SynthTokenModuleType;
}): Promise<TokenInfoType> {
  const [symbol, name, decimals] = await Promise.all([
    SynthTokenModule.symbol(),
    SynthTokenModule.name(),
    SynthTokenModule.decimals(),
  ]);
  return TokenInfoSchema.parse({
    symbol,
    name,
    decimals,
  });
}

export function useTokenInfo(address?: string) {
  const { data: SynthTokenModule } = useSynthTokenModule(address);
  const network = useNetwork();

  return useQuery({
    queryKey: ['SpotMarkets', network.name, 'TokenInfo', address],
    queryFn: async () => {
      if (!SynthTokenModule) throw 'OMG';
      return await loadTokenInfo({ SynthTokenModule });
    },
    enabled: Boolean(SynthTokenModule && address),
  });
}
