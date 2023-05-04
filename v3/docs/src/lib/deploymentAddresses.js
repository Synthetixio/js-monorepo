import { default as CoreProxyMainnet } from '@synthetixio/v3-contracts/deployments/mainnet/CoreProxy.json';
import { default as AccountProxyMainnet } from '@synthetixio/v3-contracts/deployments/mainnet/AccountProxy.json';
import { default as USDProxyMainnet } from '@synthetixio/v3-contracts/deployments/mainnet/USDProxy.json';

import { default as CoreProxyGoerli } from '@synthetixio/v3-contracts/deployments/goerli/CoreProxy.json';
import { default as AccountProxyGoerli } from '@synthetixio/v3-contracts/deployments/goerli/AccountProxy.json';
import { default as USDProxyGoerli } from '@synthetixio/v3-contracts/deployments/goerli/USDProxy.json';

import { default as CoreProxyOptimismMainnet } from '@synthetixio/v3-contracts/deployments/optimism-mainnet/CoreProxy.json';
import { default as AccountProxyOptimismMainnet } from '@synthetixio/v3-contracts/deployments/optimism-mainnet/AccountProxy.json';
import { default as USDProxyOptimismMainnet } from '@synthetixio/v3-contracts/deployments/optimism-mainnet/USDProxy.json';

import { default as CoreProxyOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/CoreProxy.json';
import { default as AccountProxyOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/AccountProxy.json';
import { default as USDProxyOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/USDProxy.json';

export const deploymentAddresses = {
  mainnet: {
    CoreProxy: CoreProxyMainnet.address,
    AccountProxy: AccountProxyMainnet.address,
    USDProxy: USDProxyMainnet.address,
  },
  goerli: {
    CoreProxy: CoreProxyGoerli.address,
    AccountProxy: AccountProxyGoerli.address,
    USDProxy: USDProxyGoerli.address,
  },
  'optimism-mainnet': {
    CoreProxy: CoreProxyOptimismMainnet.address,
    AccountProxy: AccountProxyOptimismMainnet.address,
    USDProxy: USDProxyOptimismMainnet.address,
  },
  'optimism-goerli': {
    CoreProxy: CoreProxyOptimismGoerli.address,
    AccountProxy: AccountProxyOptimismGoerli.address,
    USDProxy: USDProxyOptimismGoerli.address,
  },
};
