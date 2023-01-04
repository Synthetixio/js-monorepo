import { ethers } from 'ethers';
import { useProvider } from 'wagmi';
import { contracts } from '../utils/constants';

import * as goerliCCIP from '@synthetixio/v3-contracts/build/goerli/_CCIP';
import * as goerliAccountProxy from '@synthetixio/v3-contracts/build/goerli/AccountProxy';
import * as goerliCoreProxy from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import * as goerliUSDProxy from '@synthetixio/v3-contracts/build/goerli/USDProxy';
import * as optimismGoerliCCIP from '@synthetixio/v3-contracts/build/optimism-goerli/_CCIP';
import * as optimismGoerliAccountProxy from '@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy';
import * as optimismGoerliCoreProxy from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';
import * as optimismGoerliUSDProxy from '@synthetixio/v3-contracts/build/optimism-goerli/USDProxy';
import * as RewardDistributor from '@synthetixio/v3-contracts/build/_RewardDistributor';

function getContract(name: string, chainName: string | undefined) {
  switch (chainName) {
    case 'goerli':
      switch (name) {
        case contracts.SYNTHETIX_PROXY:
          return goerliCoreProxy;
        case contracts.SNX_USD_PROXY:
          return goerliUSDProxy;
        case contracts.ACCOUNT_PROXY:
          return goerliAccountProxy;
        case contracts.SNX_REWARD:
          return RewardDistributor;
        case contracts.CCIP:
          return goerliCCIP;
        default:
          return null;
      }
    case 'optimism-goerli':
      switch (name) {
        case contracts.SYNTHETIX_PROXY:
          return optimismGoerliCoreProxy;
        case contracts.SNX_USD_PROXY:
          return optimismGoerliUSDProxy;
        case contracts.ACCOUNT_PROXY:
          return optimismGoerliAccountProxy;
        case contracts.SNX_REWARD:
          return RewardDistributor;
        case contracts.CCIP:
          return optimismGoerliCCIP;
        default:
          return null;
      }
    default:
      return null;
  }
}

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string) => {
  const provider = useProvider();
  const contractInfo = getContract(name, provider.network.name);
  if (!contractInfo) return null;
  // TODO: useQuery + await import()
  return {
    address: contractInfo.address,
    abi: contractInfo.abi,
    contract: new ethers.Contract(contractInfo.address, contractInfo.abi, provider),
    chainId: provider.network.chainId,
  };
};

export const useSnxProxy = () => useContract(contracts.SYNTHETIX_PROXY);
