import { useContractReads } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType, poolsData } from '../utils/constants';
import { formatValue } from '../utils/helpers';
import { BigNumber } from 'ethers';

export const useStakingPosition = (
  accountId: string,
  poolId: string,
  collateral: CollateralType
) => {
  const snxProxy = useSnxProxy();

  const functionNames = ['getPositionCollateral', 'getPositionDebt'];

  const funcCalls = functionNames.map((fn) => ({
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: fn,
    args: [accountId, poolId, collateral.address],
  }));

  const { data, isLoading, refetch } = useContractReads({
    contracts: funcCalls,
    select: (data) => {
      const debt = formatValue(data[1], 18) || 0;
      const collateralValue = formatValue(data[0]?.value || 0, collateral.priceDecimals);
      const cRatio = debt !== 0 ? BigNumber.from(collateralValue).mul(100).div(debt).toNumber() : 0;
      return {
        collateralAmount: data[0].amount || 0,
        cRatio,
        debt,
      };
    },
  });

  return {
    isLoading,
    poolId,
    collateralType: collateral,
    accountId,
    poolName: poolsData[poolId]?.name,
    collateralAmount: data?.collateralAmount || 0,
    cRatio: data?.cRatio || 0,
    debt: data?.debt || 0,
    refetch,
  };
};
