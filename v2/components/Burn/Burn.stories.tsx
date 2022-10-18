import { BurnUi } from './Burn';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { wei } from '@synthetixio/wei';

export default {
  title: 'BurnUi',
  component: BurnUi,
} as ComponentMeta<typeof BurnUi>;

const Template: ComponentStory<typeof BurnUi> = (_args) => <BurnUi {..._args} />;

export const Primary = Template.bind({});

Primary.args = {
  snxBalance: 2000,
  susdBalance: 2000,
  debtBalance: 100,
  isLoading: false,
  onSubmit: () => {},
  onBurnAmountSusdChange: () => {},
  burnAmountSusd: '',
  snxUnstakingAmount: '',
  transactionFee: wei(0),
  isGasEnabledAndNotFetched: true,
  onBadgeClick: () => {},
  stakedSnx: 100,
};
