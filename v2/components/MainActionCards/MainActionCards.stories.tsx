import { MainActionCardsUi } from './MainActionCards';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'MainActionCardsUi',
  component: MainActionCardsUi,
} as ComponentMeta<typeof MainActionCardsUi>;

const Template: ComponentStory<typeof MainActionCardsUi> = (props) => (
  <MainActionCardsUi {...props} />
);

const defaultProps = {
  isLoading: false,
  liquidationCratioPercentage: 150,
  targetCratioPercentage: 400,
  isFlagged: false,
  nextEpochStartDate: new Date(),
  connectWallet: async () => {},
  targetThreshold: 0.01,
  walletAddress: 'vitalik.eth',
};
export const HealthyUnclaimedRewards = Template.bind({});
HealthyUnclaimedRewards.args = {
  ...defaultProps,
  currentCRatioPercentage: 400,
  hasClaimed: false,
  rewardsDollarValue: 100,
};
export const UnhealthyUnclaimedRewards = Template.bind({});
UnhealthyUnclaimedRewards.args = {
  ...defaultProps,
  currentCRatioPercentage: 300,
  hasClaimed: false,
  rewardsDollarValue: 100,
};
export const UnhealthyClaimedRewards = Template.bind({});
UnhealthyClaimedRewards.args = {
  ...defaultProps,
  currentCRatioPercentage: 300,
  hasClaimed: true,
  rewardsDollarValue: 100,
};
export const HealthyClaimedRewards = Template.bind({});
HealthyClaimedRewards.args = {
  ...defaultProps,
  currentCRatioPercentage: 400,
  hasClaimed: true,
  rewardsDollarValue: 100,
};
export const Flagged = Template.bind({});
Flagged.args = {
  ...defaultProps,
  currentCRatioPercentage: 120,
  hasClaimed: true,
  isFlagged: true,
  rewardsDollarValue: 100,
};
export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
