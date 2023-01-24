import { createRoot } from 'react-dom/client';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChakraProvider, extendTheme, ToastProvider } from '@chakra-ui/react';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RecoilRoot } from 'recoil';
import { ALCHEMY_KEY_MAPPING, INFURA_KEY, supportedChains } from '../utils/constants';
// We have to import into *VAR* and *USE* it so webpack does not remove unused library import
import * as rainbowkitStyles from '@rainbow-me/rainbowkit/styles.css';
import { App } from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from '../components/Header';
import { RegisteredNode } from './RegisteredNode';

const { chains, provider } = configureChains(supportedChains, [
  infuraProvider({ apiKey: INFURA_KEY, priority: 0 }),
  jsonRpcProvider({
    rpc: (chain) => {
      const alchemyKey = ALCHEMY_KEY_MAPPING[chain.id];
      return Boolean(alchemyKey)
        ? {
            http: `${chain.rpcUrls.alchemy}/${alchemyKey}`,
          }
        : null;
    },
    priority: 1,
  }),
  publicProvider({ priority: 2 }),
]);

const customTheme = extendTheme({
  ...theme,
  styles: {
    global: {
      body: {
        bg: 'navy.900',
      },
    },
  },
});

const { connectors } = getDefaultWallets({
  appName: 'Synthetix',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: 'node/:nodeId', element: <RegisteredNode /> },
]);
const container = document.querySelector('#app');

const root = createRoot(container!);

root.render(
  <RecoilRoot>
    <ChakraProvider theme={customTheme}>
      <ToastProvider>
        <Fonts />
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            /* @ts-ignore*/
            styles={rainbowkitStyles}
            theme={darkTheme({
              accentColor: 'rgb(49, 130, 206)',
              accentColorForeground: 'white',
              borderRadius: 'small',
              fontStack: 'system',
            })}
            chains={chains}
          >
            <Header />
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ToastProvider>
    </ChakraProvider>
  </RecoilRoot>
);
