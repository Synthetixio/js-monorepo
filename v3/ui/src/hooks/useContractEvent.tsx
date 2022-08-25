import { useContractEvent as useWagmiContractEvent } from 'wagmi';
import { contracts } from '../utils/constants';
import { useContract } from './useContract';

type ContractReadParams = Parameters<typeof useWagmiContractEvent>[0];
type ConfigType = Omit<ContractReadParams, 'addressOrName' | 'contractInterface'>;

export const useSynthetixProxyEvent = (config: ConfigType) => {
  return useContractEvent(contracts.SYNTHETIX_PROXY, config);
};

export const useContractEvent = (contractName: string, config: ConfigType) => {
  const contract = useContract(contractName);
  // const provider = useProvider();

  // useEffect(() => {
  //   const resetEvents = async () => {
  //     const blockNum = await provider.getBlockNumber();
  //     console.log(blockNum);
  //     provider.resetEventsBlock(20000);

  //     const name = config.eventName as string;
  //     const filter = contract!.contract.filters[name]();

  //     contract?.contract.on(filter, (...args) => {
  //       console.log('WHAT', args);
  //     });
  //   };

  //   resetEvents();
  // }, [config.eventName, contract, provider]);

  return useWagmiContractEvent({
    ...config,
    addressOrName: contract?.address,
    contractInterface: contract?.abi || '',
    chainId: contract?.chainId,
  });
};
