import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BalanceBoxUi } from './BalanceBox';

export default {
  title: 'BalanceBoxUi',
  component: BalanceBoxUi,
} as ComponentMeta<typeof BalanceBoxUi>;

const Template: ComponentStory<typeof BalanceBoxUi> = (props) => <BalanceBoxUi {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  snxBalance: 2000,
  stakedSnx: 1800,
  transferable: 1700,
  snxPrice: 3,
};
