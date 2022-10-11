import { createRoot } from 'react-dom/client';
import { Synthetix } from './App';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { supportedChains } from './utils/constants';

import './i18n';

// We have to import into *VAR* and *USE* it so webpack does not remove unused library import
import * as rainbowkitStyles from '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(supportedChains, [publicProvider()]);

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
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </RecoilRoot>
  </BrowserRouter>
);
