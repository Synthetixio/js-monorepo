import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useContractReads } from 'wagmi';
import { contracts } from '../utils/constants';
import { fundsState } from '../utils/state';
import { useContract } from './useContract';

export const useFunds = () => {
  const setFunds = useSetRecoilState(fundsState);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const snxContractData = {
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    chainId: snxProxy?.chainId,
  };
  const { isLoading, data } = useContractReads({
    contracts: [
      {
        ...snxContractData,
        functionName: 'getPreferredFund',
      },
      {
        ...snxContractData,
        functionName: 'getApprovedFunds',
      },
    ],
  });

  useEffect(() => {
    if (!isLoading && data) {
      const funds = data
        ? [
            data[0].toString(),
            ...data[1].filter((id) => !id.eq(data[0])).map((fundId) => fundId.toString()),
          ]
        : [];
      setFunds(funds);
    }
  });

  return {
    isLoading,
  };
};
