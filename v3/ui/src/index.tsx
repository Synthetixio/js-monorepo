import { createRoot } from 'react-dom/client';
import { Synthetix } from './App';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChakraProvider } from '@chakra-ui/react';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  ALCHEMY_KEY_MAPPING,
  DEFAULT_REQUEST_REFRESH_INTERVAL,
  INFURA_KEY,
  supportedChains,
} from './utils/constants';
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

const { connectors } = getDefaultWallets({
  appName: 'Synthetix',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors,
});

const container = document.querySelector('#app');
// @ts-ignore
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient} contextSharing={true}>
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
