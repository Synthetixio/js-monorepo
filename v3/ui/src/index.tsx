import { createRoot } from 'react-dom/client';
import { Synthetix } from './App';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChakraProvider } from '@chakra-ui/react';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Fonts, theme } from '@synthetixio/v3-theme';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { DEFAULT_REQUEST_REFRESH_INTERVAL, INFURA_KEY } from './utils/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './i18n';

// We have to import into *VAR* and *USE* it so webpack does not remove unused library import
import * as rainbowkitStyles from '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: DEFAULT_REQUEST_REFRESH_INTERVAL,
      refetchOnWindowFocus: false,
    },
  },
});

import { goerli, optimismGoerli } from '@wagmi/chains';
const { chains, provider } = configureChains(
  [goerli, optimismGoerli],
  [
    // jsonRpcProvider({
    //   rpc: () => ({ http: `http://localhost:8545` }),
    //   priority: 0,
    // }),
    jsonRpcProvider({
      rpc: () => ({ http: `https://goerli.infura.io/v3/${INFURA_KEY}` }),
      priority: 1,
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Synthetix',
  chains,
});

const noop = () => null;
const wagmiClient = createClient({
  queryClient,
  autoConnect: true,
  persister: null,
  // @ts-ignore
  storage: {
    getItem: noop,
    setItem: noop,
    removeItem: noop,
  },
  provider,
  connectors,
});

const container = document.querySelector('#app');
// @ts-ignore
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
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
              <Synthetix />
              <ReactQueryDevtools />
            </RainbowKitProvider>
          </WagmiConfig>
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </BrowserRouter>
);
