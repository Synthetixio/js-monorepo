import { createRoot } from 'react-dom/client';
import { Synthetix } from './App';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChakraProvider } from '@chakra-ui/react';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Fonts, theme } from '@synthetixio/v3-theme';
import { BrowserRouter } from 'react-router-dom';
import {
  DEFAULT_QUERY_REFRESH_INTERVAL,
  DEFAULT_QUERY_STALE_TIME,
  INFURA_KEY,
} from '@snx-v3/Constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './i18n';

// We have to import into *VAR* and *USE* it so webpack does not remove unused library import
import * as rainbowkitStyles from '@rainbow-me/rainbowkit/styles.css';
import { goerli, optimismGoerli } from '@wagmi/chains';
import { GasSpeedProvider } from '@snx-v3/useGasSpeed';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: DEFAULT_QUERY_REFRESH_INTERVAL,
      staleTime: DEFAULT_QUERY_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

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
            <GasSpeedProvider>
              <Synthetix />
            </GasSpeedProvider>
            <ReactQueryDevtools />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
