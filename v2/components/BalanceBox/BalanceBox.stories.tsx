import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BalanceBox } from './BalanceBox';

export default {
  title: 'BalanceBox',
  component: BalanceBox,
} as ComponentMeta<typeof BalanceBox>;

const Template: ComponentStory<typeof BalanceBox> = (props) => <BalanceBox {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  snxBalance: 2000,
  stakedSnx: 1800,
  transferable: 1700,
  snxPrice: 3,
};
