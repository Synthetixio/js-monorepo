import { useSetRecoilState } from 'recoil';
import { useContractReads } from 'wagmi';
import { contracts } from '../utils/constants';
import { poolsState } from '../utils/state';
import { useContract } from './useContract';

export const usePools = () => {
  const setPools = useSetRecoilState(poolsState);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const snxContractData = {
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    chainId: snxProxy?.chainId,
  };
  const { isLoading } = useContractReads({
    contracts: [
      {
        ...snxContractData,
        functionName: 'getPreferredPool',
      },
      {
        ...snxContractData,
        functionName: 'getApprovedPools',
      },
    ],
    onSuccess: (data) => {
      const pools = data
        ? [
            data[0].toString(),
            ...data[1].filter((id) => !id.eq(data[0])).map((poolId) => poolId.toString()),
          ]
        : [];
      setPools(pools);
    },
  });

  return {
    isLoading,
  };
};
