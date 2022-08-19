import { useQuery, UseQueryOptions } from 'react-query';
import { QueryContext } from '../../context';
import { ShortRewardsData } from '../../types';
import { wei } from '@synthetixio/wei';
import { formatBytes32String } from '@ethersproject/strings';
import { loadSynthsByNameFromNetwork } from '../../utils';

const useSBTCShortsQuery = (
  ctx: QueryContext,
  currencyKey: string,
  walletAddress: string | null,
  options?: UseQueryOptions<ShortRewardsData>
) => {
  return useQuery<ShortRewardsData>(
    ['shorts', 'data', ctx.networkId, walletAddress],
    async () => {
      if (!ctx.snxjs || !ctx.networkId) throw Error('Expected snxjs and networkId to be defined');
      const { SynthsByName } = await loadSynthsByNameFromNetwork(ctx.networkId);
      const synth = SynthsByName[currencyKey];
      if (!synth) {
        throw Error(
          `Unsupported currency key ${currencyKey} in not available on network ${ctx.networkId}`
        );
      }
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
        CollateralManager.short(formatBytes32String(synth.name)),
        ExchangeRates.rateAndInvalid(formatBytes32String(synth.name)),
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
      enabled: ctx.snxjs != null && walletAddress != null && ctx.networkId != null,
      ...options,
    }
  );
};

export default useSBTCShortsQuery;
