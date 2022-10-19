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
  unstakedSnx: 2000,
  susdBalance: 2000,
  transactionFee: wei(0.01),
  isLoading: false,
  onSubmit: () => {},
  mintAmountSNX: '',
  mintAmountsUSD: '',
  gasError: null,
  isGasEnabledAndNotFetched: false,
  onMintAmountSNXChange: (amount: string) => {
    console.log(amount);
  },
};
