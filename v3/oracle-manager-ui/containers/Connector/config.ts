import { NetworkIdByName } from '@synthetixio/contracts-interface';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import ledgerModule from '@web3-onboard/ledger';
import torusModule from '@web3-onboard/torus';
import { SynthetixIcon, SynthetixLogo } from '../../components/WalletComponents';
import { getInfuraRpcURL } from '../../utils/infura';

const injected = injectedModule();
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });
const walletConnect = walletConnectModule();
const ledger = ledgerModule();
const torus = torusModule();

export const onboard = Onboard({
  appMetadata: {
    name: 'Synthetix',
    icon: SynthetixIcon,
    logo: SynthetixLogo,
    description: 'Synthetix | The derivatives liquidity protocol.',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
    gettingStartedGuide: 'https://synthetix.io',
    explore: 'https://blog.synthetix.io/',
  },
  apiKey: process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY,
  wallets: [injected, ledger, coinbaseWalletSdk, walletConnect, torus],
  chains: [
    // {
    //   id: 10,
    //   token: 'ETH',
    //   label: 'Optimism Mainnet',
    //   rpcUrl: getInfuraRpcURL(NetworkIdByName['mainnet-ovm']),
    // },
    // {
    //   id: 1,
    //   token: 'ETH',
    //   label: 'Mainnet',
    //   rpcUrl: getInfuraRpcURL(NetworkIdByName['mainnet']),
    // },
    {
      id: 5,
      token: 'ETH',
      label: 'Optimism Mainnet',
      rpcUrl: getInfuraRpcURL(NetworkIdByName['goerli']),
    },
    {
      id: 420,
      token: 'ETH',
      label: 'Mainnet',
      rpcUrl: getInfuraRpcURL(NetworkIdByName['goerli-ovm']),
    },
  ],
  accountCenter: {
    desktop: {
      enabled: false,
      containerElement: 'body',
    },
    mobile: {
      enabled: false,
      containerElement: 'body',
    },
  },
  notify: {
    enabled: false,
  },
});
