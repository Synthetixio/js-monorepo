import { RewardsTransactionModal } from './RewardsTransactionModal';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'RewardsTransactionModal',
  component: RewardsTransactionModal,
} as ComponentMeta<typeof RewardsTransactionModal>;

const Template: ComponentStory<typeof RewardsTransactionModal> = (_args) => (
  <RewardsTransactionModal {..._args} />
);

export const StakingRewards = Template.bind({});

StakingRewards.args = {
  onClose: () => {},
  onSubmit: () => {},
  error: null,
  gasError: null,
  amountsUSD: '$200',
  settle: () => {},
  txnStatus: 'success',
  modalOpen: true,
  amountSNX: '200',
  txnHash: '0x36318d3353609d0840acd46ee0d7ef5ca5d83d2207a4075a0b73dabf3e5908ef',
};
export const LiquidationRewards = Template.bind({});

LiquidationRewards.args = {
  onClose: () => {},
  onSubmit: () => {},
  error: null,
  gasError: null,
  settle: () => {},
  txnStatus: 'success',
  modalOpen: true,
  amountSNX: '200',
  txnHash: '0x36318d3353609d0840acd46ee0d7ef5ca5d83d2207a4075a0b73dabf3e5908ef',
};
