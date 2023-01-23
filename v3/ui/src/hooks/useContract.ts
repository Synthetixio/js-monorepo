import { ethers } from 'ethers';
import { useNetwork, useProvider } from '@snx-v3/useBlockchain';
import { contracts } from '../utils/constants';

import * as goerliCCIP from '@synthetixio/v3-contracts/build/goerli/CCIP';
import * as goerliAccountProxy from '@synthetixio/v3-contracts/build/goerli/AccountProxy';
import * as goerliCoreProxy from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import * as goerliRewardDistributor from '@synthetixio/v3-contracts/build/goerli/RewardDistributor';
import * as goerliUSDProxy from '@synthetixio/v3-contracts/build/goerli/USDProxy';
import * as optimismGoerliCCIP from '@synthetixio/v3-contracts/build/optimism-goerli/CCIP';
import * as optimismGoerliAccountProxy from '@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy';
import * as optimismGoerliCoreProxy from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';
import * as optimismGoerliRewardDistributor from '@synthetixio/v3-contracts/build/optimism-goerli/RewardDistributor';
import * as optimismGoerliUSDProxy from '@synthetixio/v3-contracts/build/optimism-goerli/USDProxy';

export function getContract(name: string, chainName: string) {
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
          return goerliRewardDistributor;
        case contracts.CCIP:
          return goerliCCIP;
        default:
          throw new Error(`Unsupported contract name ${name}`);
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
          return optimismGoerliRewardDistributor;
        case contracts.CCIP:
          return optimismGoerliCCIP;
        default:
          throw new Error(`Unsupported contract name ${name}`);
      }
    default:
      throw new Error(`Unsupported network ${chainName}`);
  }
}

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export function useContract(name: string) {
  const network = useNetwork();
  const provider = useProvider();
  const contractInfo = getContract(name, network.name);
  if (!contractInfo) return null;
  return {
    address: contractInfo.address,
    abi: contractInfo.abi,
    contract: new ethers.Contract(contractInfo.address, contractInfo.abi, provider),
    chainId: network.id,
  };
}

export const useSnxProxy = () => useContract(contracts.SYNTHETIX_PROXY);
