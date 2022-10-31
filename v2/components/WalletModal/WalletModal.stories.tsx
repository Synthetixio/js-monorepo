import { WalletModalUi } from './WalletModal';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SNXIcon } from '@snx-v2/icons';

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
  balances: [
    {
      currencyKey: 'SNX',
      balance: 100,
      usdBalance: 200,
      icon: <SNXIcon />,
      description: 'Synthetix Network Token',
    },
    {
      currencyKey: 'sUSD',
      balance: 100,
      usdBalance: 200,
      description: 'Synthetic US Dollars',
      icon: (
        <img
          width="24px"
          height="24px"
          src="https://raw.githubusercontent.com/Synthetixio/synthetix-assets/master/synths/sUSD.svg"
        ></img>
      ),
    },
  ],
};
