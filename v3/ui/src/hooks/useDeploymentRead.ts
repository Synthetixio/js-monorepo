import { useContract } from './useContract';
import { useContractRead } from 'wagmi';
import { contracts } from '../utils/constants';

type ContractReadParams = Parameters<typeof useContractRead>[0];
type ConfigType = Omit<ContractReadParams, 'addressOrName' | 'contractInterface'>;

// A convenience hook for reading from the main Synthetix proxy contract.
export const useSynthetixRead = (config: ConfigType) => {
  return useDeploymentRead(contracts.SYNTHETIX_PROXY, config);
};

export const useAccountRead = (config: ConfigType) => {
  return useDeploymentRead(contracts.ACCOUNT_PROXY, config);
};

// Similar to https://wagmi.sh/docs/hooks/useContractRead, but its aware of the currently selected network and the user specifies the contract name rather than address.
export const useDeploymentRead = (contractName: string, config: ConfigType) => {
  const contract = useContract(contractName);
  const { isLoading, data } = useContractRead({
    ...config,
    addressOrName: contract?.address,
    contractInterface: contract?.abi || '',
    chainId: contract?.chainId,
  });

  return { isLoading, data };
};
