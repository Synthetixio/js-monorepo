import { formatBytes32String } from '@ethersproject/strings';
import Wei, { wei } from '@synthetixio/wei';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QueryContext } from '../../context';

const useTotalIssuedSynthsExcludeOtherCollateralQuery = (
  ctx: QueryContext,
  currencyKey: string,
  block?: number | null,
  options?: UseQueryOptions<Wei>
) => {
  return useQuery<Wei>(
    ['synth', 'totalIssuedSynthsExcludeOtherCollateral', ctx.networkId, currencyKey],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const totalIssuedSynthsExcludeOtherCollateral = await ctx.snxjs.contracts.Synthetix[
        ctx.snxjs.contracts.Synthetix.totalIssuedSynthsExcludeOtherCollateral
          ? 'totalIssuedSynthsExcludeOtherCollateral'
          : 'totalIssuedSynths'
      ](formatBytes32String(currencyKey), {
        blockTag: block ? block : 'latest',
      });

      return wei(totalIssuedSynthsExcludeOtherCollateral);
    },
    {
      enabled: !!ctx.snxjs,
      ...options,
    }
  );
};

export default useTotalIssuedSynthsExcludeOtherCollateralQuery;
