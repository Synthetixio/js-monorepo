import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { useProvider } from 'wagmi';
import { contracts, getChainNameById } from '../utils/constants';
import { chainIdState } from '../utils/state';

import * as goerliCCIP from '@synthetixio/v3-contracts/build/goerli/_CCIP';
import * as goerliMulticall3 from '@synthetixio/v3-contracts/build/goerli/_Multicall3';
import * as goerliAccountProxy from '@synthetixio/v3-contracts/build/goerli/AccountProxy';
import * as goerliCoreProxy from '@synthetixio/v3-contracts/build/goerli/CoreProxy';
import * as goerliUSDProxy from '@synthetixio/v3-contracts/build/goerli/USDProxy';
import * as optimismGoerliCCIP from '@synthetixio/v3-contracts/build/optimism-goerli/_CCIP';
import * as optimismGoerliMulticall3 from '@synthetixio/v3-contracts/build/optimism-goerli/_Multicall3';
import * as optimismGoerliAccountProxy from '@synthetixio/v3-contracts/build/optimism-goerli/AccountProxy';
import * as optimismGoerliCoreProxy from '@synthetixio/v3-contracts/build/optimism-goerli/CoreProxy';
import * as optimismGoerliUSDProxy from '@synthetixio/v3-contracts/build/optimism-goerli/USDProxy';
import * as ERC20 from '@synthetixio/v3-contracts/build/_ERC20';
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
        case contracts.MULTICALL:
          return goerliMulticall3;
        case contracts.SNX_TOKEN:
          return ERC20;
        case contracts.SNX_REWARD:
          return RewardDistributor;
        case contracts.WETH:
          return ERC20;
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
        case contracts.MULTICALL:
          return optimismGoerliMulticall3;
        case contracts.SNX_TOKEN:
          return ERC20;
        case contracts.SNX_REWARD:
          return RewardDistributor;
        case contracts.WETH:
          return ERC20;
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
export const useContract = (name: string, chainId?: number) => {
  const [localChainId] = useRecoilState(chainIdState);
  const provider = useProvider();
  const chainName = getChainNameById(chainId || localChainId);
  const contractInfo = getContract(name, chainName);
  if (!contractInfo) return null;
  // TODO: useQuery + await import()
  return {
    address: contractInfo.address,
    abi: contractInfo.abi,
    contract: new ethers.Contract(contractInfo.address, contractInfo.abi, provider),
    chainId: localChainId,
  };
};

export const useSnxProxy = () => useContract(contracts.SYNTHETIX_PROXY);
