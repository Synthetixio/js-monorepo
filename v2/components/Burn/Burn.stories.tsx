import { Burn } from './Burn';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { wei } from '@synthetixio/wei';

export default {
  title: 'Burn',
  component: Burn,
} as ComponentMeta<typeof Burn>;

const Template: ComponentStory<typeof Burn> = (_args) => <Burn {..._args} />;

export const Primary = Template.bind({});

Primary.args = {
  snxBalance: wei(2000),
  susdBalance: wei(2000),
  exchangeRate: 0.25,
  gasPrice: wei(0.01),
  activeDebt: wei(0),
  isLoading: false,
  txnStatus: 'unsent',
};
