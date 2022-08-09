import React from 'react';
import { createRoot } from 'react-dom/client';
import { Synthetix } from './App';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import './app.css';
import './i18n';
import '@rainbow-me/rainbowkit/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { supportedChains } from './utils/constants';

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
      <ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
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
