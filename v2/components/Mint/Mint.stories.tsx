import { MintUi } from './Mint';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { wei } from '@synthetixio/wei';

export default {
  title: 'MintUi',
  component: MintUi,
} as ComponentMeta<typeof MintUi>;

const Template: ComponentStory<typeof MintUi> = (_args) => <MintUi {..._args} />;

export const Primary = Template.bind({});
Primary.args = {
  snxBalance: 2000,
  susdBalance: 2000,
  exchangeRate: 0.25,
  transactionFee: wei(0.01),
  isLoading: false,
};
