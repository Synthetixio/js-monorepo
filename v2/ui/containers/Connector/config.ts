import { getChainIdHex, getInfuraRpcURL } from 'utils/infura';
import { NetworkIdByName } from '@synthetixio/contracts-interface';
import Onboard from '@web3-onboard/core';
import type { OnboardAPI } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import ledgerModule from '@web3-onboard/ledger';
import gnosisModule from './customGnosis';
import trezorModule from '@web3-onboard/trezor';
import portisModule from '@web3-onboard/portis';
import torusModule from '@web3-onboard/torus';
import trustModule from '@web3-onboard/trust';

import { SynthetixIcon, SynthetixLogo } from 'components/WalletComponents';
import { customBrave, customMetaMask, customDetected } from './customInjected';

const injected = injectedModule({ custom: [customMetaMask, customBrave, customDetected] });

const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

console.log('process.env.NEXT_PUBLIC_WC_PROJECT_ID', process.env.NEXT_PUBLIC_WC_PROJECT_ID);

const walletConnect = walletConnectModule({
  version: 2,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
});

const ledger = ledgerModule({
  walletConnectVersion: 2,
  projectId: `${process.env.NEXT_PUBLIC_WC_PROJECT_ID}`,
});

// The trezor module have a bug, we can enable it when this has been merged and released: https://github.com/blocknative/web3-onboard/pull/1165
const trezor = trezorModule({ email: 'info@synthetix.io', appUrl: 'https://www.synthetix.io' });
const gnosis = gnosisModule();
const portis = portisModule({ apiKey: `${process.env.NEXT_PUBLIC_PORTIS_APP_ID}` });
const torus = torusModule();
const brave = () => customBrave;
const trust = trustModule();

const isDev = process.env.NODE_ENV !== 'production';
const isTestnetEnabled = isDev || window?.localStorage?.TESTNET === 'true';

// Here we hardcode rpc urls... Not very good if infura is down. BUT I think these are just used as default before the wallets is connected.
// And our app is not using default from onboard, so it should be fine.
const supportedChains = [
  // Mainnet
  {
    id: getChainIdHex(NetworkIdByName.mainnet),
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: getInfuraRpcURL(NetworkIdByName.mainnet),
    publicRpcUrl: 'https://ethereum.publicnode.com',
  },
  // Mainnet Ovm
  {
    id: getChainIdHex(NetworkIdByName['mainnet-ovm']),
    token: 'ETH',
    label: 'Optimism Mainnet',
    rpcUrl: getInfuraRpcURL(NetworkIdByName['mainnet-ovm']),
    publicRpcUrl: 'https://mainnet.optimism.io',
  },
].concat(
  isTestnetEnabled
    ? [
        // goerli
        {
          id: getChainIdHex(NetworkIdByName.goerli),
          token: 'ETH',
          label: 'Goerli',
          rpcUrl: getInfuraRpcURL(NetworkIdByName.goerli),
          publicRpcUrl: 'https://ethereum-goerli.publicnode.com',
        },
        // goerli Ovm
        {
          id: getChainIdHex(NetworkIdByName['goerli-ovm']),
          token: 'ETH',
          label: 'Optimism Goerli',
          rpcUrl: getInfuraRpcURL(NetworkIdByName['goerli-ovm']),
          publicRpcUrl: 'https://goerli.optimism.io',
        },
      ]
    : []
);

export const isSupportedWalletChain = (networkId: number) => {
  return !!supportedChains.find((chain) => chain.id === `0x${networkId.toString(16)}`);
};

export const onboard: OnboardAPI = Onboard({
  appMetadata: {
    name: 'Synthetix',
    icon: SynthetixIcon,
    logo: SynthetixLogo,
    description: 'Synthetix | The derivatives liquidity protocol.',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Brave Wallet', url: 'https://brave.com/wallet/' },
    ],
    gettingStartedGuide: 'https://synthetix.io',
    explore: 'https://blog.synthetix.io/',
  },
  apiKey: process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY,
  wallets: [
    injected,
    brave,
    ledger,
    trezor,
    coinbaseWalletSdk,
    trust,
    walletConnect,
    gnosis,
    portis,
    torus,
  ],
  chains: [...supportedChains],
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
