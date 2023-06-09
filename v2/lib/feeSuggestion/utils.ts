import { Wei } from '@synthetixio/wei';

export const rewardsFilterOutliers = (
  blocksRewards: Wei[][],
  outlierBlocks: number[],
  rewardIndex: number
) =>
  blocksRewards
    .filter((_, index) => !outlierBlocks.includes(index))
    .map((reward) => reward[rewardIndex].toNumber());

export const getOutlierBlocksToRemove = (blocksRewards: Wei[][], index: number) => {
  const blocks: number[] = [];
  blocksRewards
    .map((reward) => reward[index])
    .forEach((gweiReward, i) => {
      if (gweiReward.gt(5)) {
        blocks.push(i);
      }
    });
  return blocks;
};
