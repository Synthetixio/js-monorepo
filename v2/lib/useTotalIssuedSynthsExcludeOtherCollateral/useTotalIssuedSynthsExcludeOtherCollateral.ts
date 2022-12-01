import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useQuery } from '@tanstack/react-query';
import { formatBytes32String } from '@ethersproject/strings';
import { wei } from '@synthetixio/wei';

export const useTotalIssuedSynthsExcludeOtherCollateral = (currencyKey = 'sUSD') => {
  const { data: Synthetix } = useSynthetix();

  return useQuery(
    ['useTotalIssuedSynthsExcludeOtherCollateral', Synthetix?.address],
    async () => {
      if (!Synthetix) throw Error('Missing Synthetix contract');
      const currencyKeyBytes32 = formatBytes32String(currencyKey);
      const totalIssuedSynthsExcludeOtherCollateralBn =
        await Synthetix.totalIssuedSynthsExcludeOtherCollateral(currencyKeyBytes32);
      return wei(totalIssuedSynthsExcludeOtherCollateralBn);
    },
    {
      enabled: Boolean(Synthetix),
      staleTime: 10000,
    }
  );
};
