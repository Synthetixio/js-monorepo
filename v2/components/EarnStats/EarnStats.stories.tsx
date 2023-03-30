import { EarnStatsUi } from './EarnStats';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'EarnStatsUi',
  component: EarnStatsUi,
} as ComponentMeta<typeof EarnStatsUi>;

const Template: ComponentStory<typeof EarnStatsUi> = (props) => <EarnStatsUi {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  lifetimeRewards: 1000,
  claimableRewards: 100,
  earning: 0.2,
};
