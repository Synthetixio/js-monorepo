import { useContractReads } from 'wagmi';
import { useSnxProxy } from './useContract';
import { CollateralType, fundsData } from '../utils/constants';
import { BigNumber } from 'ethers';
import { formatValue } from '../utils/helpers';

export const useStakingPosition = (
  accountId: string,
  fundId: string,
  collateral: CollateralType
) => {
  const snxProxy = useSnxProxy();

  const functionNames = ['accountVaultCollateral', 'accountVaultDebt'];
  const funcCalls = functionNames.map((fn) => ({
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: fn,
    args: [accountId, fundId, collateral.address],
  }));

  const { data, isLoading } = useContractReads({
    contracts: funcCalls,
    select: (data) => {
      const debt = formatValue(data[1] || 0);
      const collateralValue = formatValue(data[0]?.value || 0, collateral.priceDecimals);
      const cRatio = debt !== 0 ? BigNumber.from(collateralValue).mul(100).div(debt) : 0;
      return {
        collateralAmount: data[0]?.amount || 0,
        cRatio,
        debt,
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
