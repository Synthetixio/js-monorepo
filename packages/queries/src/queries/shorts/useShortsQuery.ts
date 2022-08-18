import { useQuery, UseQueryOptions } from 'react-query';
import { CurrencyKey, Synths } from '@synthetixio/contracts-interface';
import { QueryContext } from '../../context';

import { ShortRewardsData } from '../../types';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';

const useSBTCShortsQuery = (
  ctx: QueryContext,
  currencyKey: CurrencyKey,
  walletAddress: string | null,
  options?: UseQueryOptions<ShortRewardsData>
) => {
  return useQuery<ShortRewardsData>(
    ['shorts', 'data', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs) throw Error('Expected snxjs to be defined');
      const {
        contracts: { CollateralManager, ExchangeRates },
      } = ctx.snxjs;

      const ShortingRewards = ctx.snxjs.contracts['ShortingRewards' + currencyKey];

      const getDuration = ShortingRewards.DURATION || ShortingRewards.rewardsDuration;

      const [
        duration,
        rate,
        periodFinish,
        sBtcSNXRewards,
        sBtcStaked,
        openInterestBN,
        [assetUSDPriceBN],
      ] = await Promise.all([
        getDuration(),
        ShortingRewards.rewardRate(),
        ShortingRewards.periodFinish(),
        ShortingRewards.earned(walletAddress),
        ShortingRewards.balanceOf(walletAddress),
        CollateralManager.short(formatBytes32String(Synths[currencyKey])),
        ExchangeRates.rateAndInvalid(formatBytes32String(Synths[currencyKey])),
      ]);

      const durationInWeeks = Number(duration) / 3600 / 24 / 7;
      const isPeriodFinished = new Date().getTime() > Number(periodFinish) * 1000;
      const distribution = isPeriodFinished ? 0 : rate.mul(duration).div(durationInWeeks);

      const [openInterest, assetUSDPrice, rewards, staked] = [
        openInterestBN,
        assetUSDPriceBN,
        sBtcSNXRewards,
        sBtcStaked,
      ].map((data) => wei(data));

      const openInterestUSD = openInterest.mul(assetUSDPrice);

      return {
        openInterestUSD: openInterestUSD,
        distribution: distribution,
        periodFinish: Number(periodFinish) * 1000,
        duration: Number(duration) * 1000,
        rewards,
        staked,
      };
    },
    {
      enabled: ctx.snxjs != null && walletAddress != null && currencyKey != null,
      ...options,
    }
  );
};

export default useSBTCShortsQuery;
