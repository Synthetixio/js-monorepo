import { ethers } from 'ethers';
import React from 'react';
import { EthereumIcon, FailedIcon, OptimismIcon } from '@snx-v3/icons';
import { INFURA_KEY, ONBOARD_KEY } from '@snx-v3/constants';
import onboardInit, { AppState, WalletState } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import SynthetixIcon from './SynthetixIcon.svg';
import SynthetixLogo from './SynthetixLogo.svg';

export type Network = {
  id: number;
  hexId: string;
  token: string;
  name: string;
  rpcUrl: string;
  label: string;
  Icon: React.FC;
  isSupported: boolean;
};

export const UNSUPPORTED_NETWORK: Network = {
  id: 0,
  hexId: `0x${Number(0).toString(16)}`,
  token: 'ETH',
  name: 'unsupported',
  rpcUrl: '',
  label: 'Unsupported',
  Icon: () => <FailedIcon width="24px" height="24px" />,
  isSupported: false,
};

export const NETWORKS: Record<string, Network> = {
  mainnet: {
    id: 1,
    hexId: `0x${Number(1).toString(16)}`,
    token: 'ETH',
    name: 'mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    label: 'Ethereum',
    Icon: () => <EthereumIcon />,
    isSupported: true,
  },
  'optimism-mainnet': {
    id: 10,
    hexId: `0x${Number(10).toString(16)}`,
    token: 'ETH',
    name: 'optimism-mainnet',
    rpcUrl: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
    label: 'Optimism',
    Icon: () => <OptimismIcon />,
    isSupported: true,
  },
  goerli: {
    id: 5,
    hexId: `0x${Number(5).toString(16)}`,
    token: 'ETH',
    name: 'goerli',
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    label: 'Goerli Testnet',
    Icon: () => <EthereumIcon />,
    isSupported: true,
  },
  'optimism-goerli': {
    id: 420,
    hexId: `0x${Number(420).toString(16)}`,
    token: 'ETH',
    name: 'optimism-goerli',
    rpcUrl: `https://optimism-goerli.infura.io/v3/${INFURA_KEY}`,
    label: 'Optimistic Goerli',
    Icon: () => <OptimismIcon />,
    isSupported: true,
  },
};

const DEFAULT_NETWORK_NAME = window.localStorage.getItem('DEFAULT_NETWORK') || 'optimism-mainnet';
export const DEFAULT_NETWORK =
  DEFAULT_NETWORK_NAME in NETWORKS ? NETWORKS[DEFAULT_NETWORK_NAME] : NETWORKS['optimism-mainnet'];

const injected = injectedModule();
const walletConnect = walletConnectModule();

const wallets = [injected, walletConnect];

const chains = Object.values(NETWORKS).map((network) => ({
  id: network.hexId,
  token: network.token,
  label: network.label,
  rpcUrl: network.rpcUrl,
}));

const appMetadata = {
  name: 'Synthetix',
  icon: SynthetixIcon,
  logo: SynthetixLogo,
  description: 'Synthetix | The derivatives liquidity protocol.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Brave Wallet', url: 'https://brave.com/wallet' },
  ],
  gettingStartedGuide: 'https://synthetix.io',
  explore: 'https://blog.synthetix.io',
};
export const onboard = onboardInit({
  theme: 'dark',
  wallets,
  chains,
  appMetadata,
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

export const BlockchainContext = React.createContext<{
  onboardState: AppState;
  network: Network;
  setNetwork: React.Dispatch<React.SetStateAction<Network>>;
}>({
  onboardState: onboard.state.get(),
  network: DEFAULT_NETWORK,
  setNetwork: () => null,
});

export const BlockchainProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [onboardState, setOnboardState] = React.useState(onboard.state.get());
  const [network, setNetwork] = React.useState(DEFAULT_NETWORK);
  React.useEffect(() => {
    const { unsubscribe } = onboard.state.select().subscribe((nextState) => {
      setOnboardState(nextState);

      const [currentWallet] = nextState.wallets;
      if (currentWallet) {
        const [chain] = currentWallet.chains;
        if (chain) {
          const selectedNetwork = Object.values(NETWORKS).find(
            (network) => network.hexId === chain.id
          );
          if (selectedNetwork) {
            setNetwork(selectedNetwork);
            window.localStorage.setItem('DEFAULT_NETWORK', selectedNetwork.name);
          }
        }
      }
    });
    return unsubscribe;
  }, []);
  return (
    <BlockchainContext.Provider value={{ onboardState, network, setNetwork }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export function useOnboardWallet(): WalletState | undefined {
  const { onboardState } = React.useContext(BlockchainContext);
  const { wallets } = onboardState;
  if (wallets.length < 1) {
    return undefined;
  }
  const [wallet] = wallets;
  return wallet;
}

export function useNetwork() {
  const { network } = React.useContext(BlockchainContext);
  const wallet = useOnboardWallet();
  if (!wallet) {
    return network;
  }
  const connectedChain = Object.values(NETWORKS).find(
    // chainId does not exist on type, but it does exist on actual wallet
    // @ts-ignore
    (network) => network.hexId === wallet.provider.chainId
  );
  if (connectedChain) {
    return connectedChain;
  }
  return UNSUPPORTED_NETWORK;
}

export function useSetNetwork() {
  const { setNetwork } = React.useContext(BlockchainContext);
  const wallet = useOnboardWallet();
  const hasWallet = Boolean(wallet);
  return React.useCallback(
    async (network: Network) => {
      if (hasWallet) {
        await onboard.setChain({ chainId: network.hexId });
      } else {
        setNetwork(network);
        window.localStorage.setItem('DEFAULT_NETWORK', network.name);
      }
    },
    [setNetwork, hasWallet]
  );
}

export function useIsConnected(): boolean {
  const wallet = useOnboardWallet();
  return Boolean(wallet);
}

export function useProvider() {
  const wallet = useOnboardWallet();
  const network = useNetwork();
  if (wallet) {
    return new ethers.providers.Web3Provider(wallet.provider, 'any');
  }
  return new ethers.providers.JsonRpcProvider(network.rpcUrl);
}

export function useSigner() {
  const wallet = useOnboardWallet();
  if (!wallet) {
    return;
  }
  const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
  return provider.getSigner();
}

export function useWallet() {
  const wallet = useOnboardWallet();
  if (!wallet) {
    return undefined;
  }
  const [account] = wallet.accounts;
  return account;
}

export function preserveConnectedWallets() {
  const walletsSubscription = onboard.state.select('wallets');
  const { unsubscribe } = walletsSubscription.subscribe((wallets) => {
    const connectedWallets = wallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));
  });
  return unsubscribe;
}

export async function autoConnect() {
  const connectedWalletsRaw = window.localStorage.getItem('connectedWallets');
  if (!connectedWalletsRaw) {
    return;
  }
  try {
    const [connectedWallet] = JSON.parse(connectedWalletsRaw);
    await onboard.connectWallet({
      autoSelect: { label: connectedWallet, disableModals: true },
    });
  } catch (_e) {
    // whatever
    return;
  }
}

export async function disconnect() {
  window.localStorage.removeItem('connectedWallets');
  return await Promise.all(
    onboard.state.get().wallets.map(({ label }) => onboard.disconnectWallet({ label }))
  );
}
