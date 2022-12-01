import Wei from '@synthetixio/wei';

export const calculateWeeklyRewardsInUsd = (
  SNXRate?: Wei,
  feesToDistribute?: Wei,
  rewardsToDistribute?: Wei
) => {
  if (!feesToDistribute || !rewardsToDistribute || !SNXRate) return undefined;
  return feesToDistribute.add(SNXRate.mul(rewardsToDistribute));
};
