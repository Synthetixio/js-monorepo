import { useContractReads } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType, fundsData } from '../utils/constants';

export const useStakingPosition = (
  accountId: string,
  fundId: string,
  collateral: CollateralType
) => {
  const snxProxy = useSnxProxy();

  const functionNames = ['accountVaultCollateral', 'accountCollateralRatio', 'accountVaultDebt'];
  const funcCalls = functionNames.map((fn) => ({
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: fn,
    args: [accountId, fundId, collateral.address],
  }));

  const { data, isLoading } = useContractReads({
    contracts: funcCalls,
    select: (data) => {
      return {
        collateralAmount: data[0]?.amount || 0,
        cRatio: data[1] || 0,
        debt: data[2] || 0,
      };
    },
  });

  return {
    isLoading,
    fundId: fundId,
    collateralType: collateral,
    accountId,
    fundName: fundsData[fundId].name,
    collateralAmount: data?.collateralAmount || 0,
    cRatio: data?.cRatio || 0,
    debt: data?.debt || 0,
  };
};
