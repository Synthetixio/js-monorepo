import { MintTransactionModal } from './MintTransactionModal';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'MintTransactionModal',
  component: MintTransactionModal,
} as ComponentMeta<typeof MintTransactionModal>;

const Template: ComponentStory<typeof MintTransactionModal> = (_args) => (
  <MintTransactionModal {..._args} />
);

export const Primary = Template.bind({});

Primary.args = {
  onClose: () => {},
  onSubmit: () => {},
  error: null,
  gasError: null,
  mintAmountsUSD: '200',
  settle: () => {},
  txnStatus: 'success',
  modalOpen: false,
  stakeAmountSNX: '200',
  txnHash: '0x36318d3353609d0840acd46ee0d7ef5ca5d83d2207a4075a0b73dabf3e5908ef',
};
