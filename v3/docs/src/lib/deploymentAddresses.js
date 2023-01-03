import { default as CoreProxyGoerli } from '@synthetixio/v3-contracts/deployments/goerli/CoreProxy.json';
import { default as AccountProxyGoerli } from '@synthetixio/v3-contracts/deployments/goerli/AccountProxy.json';
import { default as USDProxyGoerli } from '@synthetixio/v3-contracts/deployments/goerli/USDProxy.json';
import { default as CoreProxyOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/CoreProxy.json';
import { default as AccountProxyOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/AccountProxy.json';
import { default as USDProxyOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/USDProxy.json';

export const deploymentAddresses = {
  goerli: {
    CoreProxy: CoreProxyGoerli.address,
    AccountProxy: AccountProxyGoerli.address,
    USDProxy: USDProxyGoerli.address,
  },
  'optimism-goerli': {
    CoreProxy: CoreProxyOptimismGoerli.address,
    AccountProxy: AccountProxyOptimismGoerli.address,
    USDProxy: USDProxyOptimismGoerli.address,
  },
};
