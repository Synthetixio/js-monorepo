import { useContract } from './useContract';
import { useContractEvent as useWagmiContractEvent } from 'wagmi';

type ContractReadParams = Parameters<typeof useWagmiContractEvent>[0];
type ConfigType = Omit<ContractReadParams, 'addressOrName' | 'contractInterface'>;

export const useSynthetixProxyEvent = (config: ConfigType) => {
  return useContractEvent('synthetix.Proxy', config);
};

export const useContractEvent = (contractName: string, config: ConfigType) => {
  const contract = useContract(contractName);
  return useWagmiContractEvent({
    ...config,
    addressOrName: contract?.address,
    contractInterface: contract?.abi || '',
    chainId: contract?.chainId,
  });
};
