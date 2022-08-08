import React from 'react';
import { createRoot } from 'react-dom/client';
import { Synthetix } from './App';
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ChakraProvider } from '@chakra-ui/react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

export const supportedChains = [
  chain.goerli,
  {
    ...chain.hardhat,
    multicall: {
      address: '0x2017758D5341a319410f8DdD0a034d0170EE0444',
      blockCreated: 10228837,
    },
  },
];
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
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <Synthetix />
      </WagmiConfig>
    </ChakraProvider>
  </BrowserRouter>
);
