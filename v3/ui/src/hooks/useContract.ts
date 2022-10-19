import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { useProvider } from 'wagmi';
import { contracts, getChainNameById } from '../utils/constants';
import { chainIdState } from '../utils/state';

export const getContract = (
  name: string,
  provider: ethers.providers.BaseProvider,
  localChainId: number
) => {
  const chainName = getChainNameById(localChainId);
  if (!chainName) return null;

  let contractInfo;
  try {
    contractInfo = require(`../../ts-deployments/${chainName}/${name}.ts`);
  } catch {
    return null;
  }

  return {
    address: contractInfo.address,
    abi: contractInfo.abi,
    contract: new ethers.Contract(contractInfo.address, contractInfo.abi, provider),
    chainId: localChainId,
  };
};

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const provider = useProvider();

  return getContract(name, provider, localChainId);
};

export const useSnxProxy = () => useContract(contracts.SYNTHETIX_PROXY);
