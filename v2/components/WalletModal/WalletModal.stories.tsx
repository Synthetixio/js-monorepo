import { WalletModalUi } from './WalletModal';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'WalletModalUi',
  component: WalletModalUi,
} as ComponentMeta<typeof WalletModalUi>;

const Template: ComponentStory<typeof WalletModalUi> = (props) => <WalletModalUi {...props} />;

export const Primary = Template.bind({});

Primary.args = {
  onClose: () => {},
  isOpen: true,
  disconnectWallet: async () => {},
  walletAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  networkId: 1,
  AuthorisedWallets: () => <>List of authorized wallets</>,
  Balances: () => <>List of snx and synth balances</>,
};
