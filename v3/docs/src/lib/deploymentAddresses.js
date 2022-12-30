import { address as CoreProxyAddressGoerli } from '@synthetixio/v3-contracts/deployments/goerli/CoreProxy.json';
import { address as AccountProxyAddressGoerli } from '@synthetixio/v3-contracts/deployments/goerli/AccountProxy.json';
import { address as USDProxyAddressGoerli } from '@synthetixio/v3-contracts/deployments/goerli/USDProxy.json';
import { address as CoreProxyAddressOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/CoreProxy.json';
import { address as AccountProxyAddressOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/AccountProxy.json';
import { address as USDProxyAddressOptimismGoerli } from '@synthetixio/v3-contracts/deployments/optimism-goerli/USDProxy.json';
export const deploymentAddresses = {
  goerli: {
    CoreProxy: CoreProxyAddressGoerli,
    AccountProxy: AccountProxyAddressGoerli,
    USDProxy: USDProxyAddressGoerli,
  },
  'optimism-goerli': {
    CoreProxy: CoreProxyAddressOptimismGoerli,
    AccountProxy: AccountProxyAddressOptimismGoerli,
    USDProxy: USDProxyAddressOptimismGoerli,
  },
};
