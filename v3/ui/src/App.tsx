import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import React from 'react';
import { chain, createClient, WagmiConfig, configureChains, useContractRead } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

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

export function Synthetix() {
  return (
    <WagmiConfig client={wagmiClient}>
      <TestWagmi />
    </WagmiConfig>
  );
}

const TestWagmi = () => {
  const file = require('../ts-deployments/goerli/synthetix.Proxy');
  const { isLoading, data } = useContractRead({
    addressOrName: file.address,
    contractInterface: file.abi,
    functionName: 'getCollateralTypes',
    args: [true],
  });

  return <div>Hello World</div>;
};
