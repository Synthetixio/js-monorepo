import { useSetRecoilState } from 'recoil';
import { useContractReads } from 'wagmi';
import { contracts } from '../utils/constants';
import { poolsState } from '../utils/state';
import { useContract } from './useContract';

export const usePools = () => {
  const setPools = useSetRecoilState(poolsState);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const { isLoading } = useContractReads({
    contracts: [
      {
        address: snxProxy?.address,
        abi: snxProxy?.abi,
        chainId: snxProxy?.chainId,
        functionName: 'getPreferredPool',
      },
      {
        address: snxProxy?.address,
        abi: snxProxy?.abi,
        chainId: snxProxy?.chainId,
        functionName: 'getApprovedPools',
      },
    ],
    enabled: Boolean(snxProxy),
    onSuccess: (data) => {
      const pools =
        data && Array.isArray(data) && data.length >= 2
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
