import { useContractReads } from 'wagmi';
import { useSnxProxy } from './useContract';
import { poolsData } from '../utils/constants';
import { formatValue } from '../utils/helpers';
import Big from 'big.js';
import { CollateralType } from '../utils/types';
import { BigNumber } from 'ethers';

export const useLiquidityPosition = (
  accountId: string,
  poolId: string,
  collateral: CollateralType
) => {
  const snxProxy = useSnxProxy();

  const functionNames = ['getPositionCollateral', 'getPositionDebt'];

  const funcCalls = functionNames.map((fn) => ({
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi || '',
    functionName: fn,
    args: [accountId, poolId, collateral.tokenAddress],
  }));

  const {
    data: queryData,
    isLoading,
    refetch,
  } = useContractReads({ contracts: funcCalls, enabled: Boolean(snxProxy) });

  const formatQueryData = () => {
    if (!queryData) return undefined;
    const collateralReturn = queryData[0];
    const debtReturn = queryData[1];
    if (
      !BigNumber.isBigNumber(collateralReturn.value) ||
      !BigNumber.isBigNumber(collateralReturn.amount)
    ) {
      throw Error(
        'Expected getPositionCollateral to return {amount: BigNumber, amount: BigNumber}'
      );
    }
    if (!BigNumber.isBigNumber(debtReturn)) {
      throw Error('Expected getPositionDebt to return a bignumber');
    }
    const debt = formatValue(debtReturn, 18);
    const collateralValue = formatValue(collateralReturn.value, collateral.decimals);
    const cRatio = debt !== 0 ? Big(collateralValue).mul(100).div(debt).toNumber() : 0;
    const collateralAmount = formatValue(collateralReturn.amount, collateral.decimals);
    return {
      collateralAmount,
      cRatio,
      debt,
    };
  };
  const data = formatQueryData();
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
