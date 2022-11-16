import { RewardsItem } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SNXIcon } from '@snx-v2/icons';

export default {
  title: 'RewardsItem',
  component: RewardsItem,
} as ComponentMeta<typeof RewardsItem>;

const Template: ComponentStory<typeof RewardsItem> = (_args) => <RewardsItem {..._args} />;

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  isLoading: false,
  title: 'Synthetix',
  description: 'Staking Rewards',
  apyReturn: '12%',
  stakedBalance: '5,000,000.00 SNX',
  Icon: () => <SNXIcon height="40px" width="40px" />,
  endDate: new Date(),
};
