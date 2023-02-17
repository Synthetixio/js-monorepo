import { ethers } from 'ethers';
import React from 'react';
import { EthereumIcon, FailedIcon, OptimismIcon } from '@snx-v3/icons';
import { INFURA_KEY, ONBOARD_KEY } from '@snx-v3/constants';
import onboardInit, { AppState, WalletState } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';

export type Network = {
  id: number;
  token: string;
  name: string;
  displayName: string;
  Icon: React.FC;
  isSupported: boolean;
};

export const UNSUPPORTED_NETWORK = {
  id: 0,
  token: 'ETH',
  name: 'unsupported',
  displayName: 'Unsupported',
  Icon: () => <FailedIcon width="24px" height="24px" />,
  isSupported: false,
};

export const NETWORKS = {
  mainnet: {
    id: 1,
    token: 'ETH',
    name: 'mainnet',
    displayName: 'Ethereum',
    Icon: () => <EthereumIcon />,
    isSupported: false,
  },
  goerli: {
    id: 5,
    token: 'ETH',
    name: 'goerli',
    displayName: 'Goerli Testnet',
    Icon: () => <EthereumIcon />,
    isSupported: true,
  },
  optimism: {
    id: 10,
    token: 'ETH',
    name: 'optimism',
    displayName: 'Optimism',
    Icon: () => <OptimismIcon />,
    isSupported: false,
  },
  'optimism-goerli': {
    id: 420,
    token: 'ETH',
    name: 'optimism-goerli',
    displayName: 'Optimistic Goerli',
    Icon: () => <OptimismIcon />,
    isSupported: true,
  },
};

const injected = injectedModule();
const walletConnect = walletConnectModule();

const wallets = [injected, walletConnect];

const chains = Object.values(NETWORKS)
  .filter(({ isSupported }) => isSupported)
  .map((network) => ({
    id: `0x${network.id.toString(16)}`,
    token: network.token,
    label: network.displayName,
    rpcUrl: `https://${network.name}.infura.io/v3/${INFURA_KEY}`,
  }));

export const SynthetixIcon = `<svg width="340" height="240" viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M82.1483 55.9193C79.7711 53.1998 76.8443 51.8369 73.3615 51.8369H2.13439C1.50174 51.8369 0.984118 51.6367 0.594305 51.2362C0.198102 50.8421 0 50.3964 0 49.9184V1.91845C0 1.44045 0.198102 1.00121 0.594305 0.600727C0.984118 0.200242 1.50174 0 2.13439 0H77.4003C96.3925 0 112.777 7.76423 126.549 23.2798L144.832 45.5971L109.218 89.0367L82.1483 55.9193ZM213.688 23.0408C227.459 7.68026 243.921 0 263.073 0H338.102C338.735 0 339.208 0.161486 339.527 0.477998C339.84 0.800969 340 1.27897 340 1.91845V49.9184C340 50.3964 339.84 50.8421 339.527 51.2362C339.208 51.6367 338.735 51.8369 338.102 51.8369H266.875C263.392 51.8369 260.465 53.1998 258.088 55.9193L205.617 119.758L258.325 184.074C260.702 186.639 263.546 187.918 266.875 187.918H338.102C338.735 187.918 339.208 188.118 339.527 188.518C339.84 188.919 340 189.442 340 190.075V238.075C340 238.553 339.84 238.999 339.527 239.393C339.208 239.793 338.735 239.994 338.102 239.994H263.073C243.921 239.994 227.536 232.236 213.924 216.714L170.24 163.436L126.549 216.714C112.777 232.236 96.3158 239.994 77.1638 239.994H2.13439C1.50174 239.994 1.02246 239.793 0.709332 239.393C0.389813 238.992 0.236444 238.476 0.236444 237.83V189.83C0.236444 189.352 0.389813 188.912 0.709332 188.512C1.02246 188.111 1.50174 187.911 2.13439 187.911H73.3615C76.6845 187.911 79.6113 186.555 82.1483 183.829L133.668 120.953L213.688 23.0408Z" fill="#00D1FF"/>
</svg>
`;

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: SynthetixIcon,
  description: 'Synthetix | The derivatives liquidity protocol.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Brave Wallet', url: 'https://brave.com/wallet/' },
  ],
  gettingStartedGuide: 'https://synthetix.io',
  explore: 'https://blog.synthetix.io/',
};
export const onboard = onboardInit({
  wallets,
  chains,
  appMetadata,
  connect: {
    // disableClose: true,
    // autoConnectLastWallet: true,
  },
  apiKey: ONBOARD_KEY,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  notify: {
    enabled: false,
  },
});

export const DEFAULT_NETWORK = NETWORKS.goerli;
export const DEFAULT_PROVIDER = new ethers.providers.InfuraProvider(
  NETWORKS.goerli.name,
  process.env.INFURA_KEY
);

export const BlockchainContext = React.createContext<{ state: AppState }>({
  state: onboard.state.get(),
});

export const BlockchainProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState(onboard.state.get());
  React.useEffect(() => {
    const { unsubscribe } = onboard.state.select().subscribe(setState);
    return unsubscribe;
  }, []);
  return <BlockchainContext.Provider value={{ state }}>{children}</BlockchainContext.Provider>;
};

export function useNetwork() {
  // const { network } = React.useContext(BlockchainContext);
  return DEFAULT_NETWORK;
}

export function useWallet(): WalletState | undefined {
  const { state } = React.useContext(BlockchainContext);
  // console.log(`state`, state);
  const { wallets } = state;
  if (wallets.length < 1) {
    return undefined;
  }
  const [wallet] = wallets;
  return wallet;
}

export function useIsConnected(): boolean {
  const wallet = useWallet();
  return Boolean(wallet);
}

export function useProvider() {
  const wallet = useWallet();
  return wallet ? new ethers.providers.Web3Provider(wallet.provider, 'any') : DEFAULT_PROVIDER;
}

export function useSigner() {
  const isConnected = useIsConnected();
  const provider = useProvider();
  return isConnected ? provider.getSigner() : provider;
}

export function useAccount() {
  const wallet = useWallet();
  if (!wallet) {
    return undefined;
  }
  const [account] = wallet.accounts;
  return account;
}
