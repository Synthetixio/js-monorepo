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
  collateral: 100,
  escrowBalance: 10,
  liquidationRewards: 1,
  snxBalance: 89,
  snxPrice: 3,
  transferable: 40,
  stakedSnx: 50,
  debtBalance: 100,
  dSNXBalance: 100,
  dSNXBalanceUsd: 99,
};
