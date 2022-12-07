import { useRecoilValue } from 'recoil';
import { useContractReads } from 'wagmi';
import { collateralTypesState, poolsState } from '../utils/state';
import { useSnxProxy } from './useContract';
import { poolsData } from '../utils/constants';
import { useSynthetixProxyEvent } from './useContractEvent';
import { CollateralType, LiquidityPositionType } from '../utils/types';
import { formatValue } from '../utils/helpers';
import { BigNumber } from 'ethers';

interface DepositingCall {
  poolId: string;
  collateral: CollateralType;
  functionName: string;
}

export const useLiquidityPositions = (accountId: string) => {
  const pools = useRecoilValue(poolsState);
  const supportedCollateralTypes = useRecoilValue(collateralTypesState);
  const snxProxy = useSnxProxy();

  const calls: DepositingCall[] = [];
  const functionNames = ['getPositionCollateral', 'getPositionDebt'];
  functionNames.forEach((functionName) => {
    pools.forEach((poolId) => {
      supportedCollateralTypes.forEach((collateral) => {
        calls.push({
          poolId,
          collateral,
          functionName,
        });
      });
    });
  });

  const liquidityPositionsQueryResult = useContractReads({
    enabled: true,
    contracts: calls.map((call) => ({
      addressOrName: snxProxy?.address,
      contractInterface: snxProxy?.abi,
      functionName: call.functionName,
      args: [accountId, call.poolId, call.collateral.address],
    })),
  });
  const formatData = () => {
    if (!liquidityPositionsQueryResult.data) return undefined;
    const results = liquidityPositionsQueryResult.data.map((value, index) => ({
      index,
      value,
      functionName: calls[index].functionName,
    }));

    const collaterals = results.filter((val) => val.functionName === 'getPositionCollateral');
    const debts = results.filter((val) => val.functionName === 'getPositionDebt');
    const positions: Record<string, LiquidityPositionType> = {};

    collaterals.forEach((c, i) => {
      if (!c.value || c.value.amount.eq(0)) {
        return;
      }
      const debt = debts[i].value;
      if (!BigNumber.isBigNumber(debt)) {
        return;
      }
      const { poolId, collateral } = calls[c.index];
      const key = `${poolId}-${collateral.symbol}`;

      const collateralValue = formatValue(c.value.value || 0, collateral.priceDecimals);
      const cRatio = !debt.eq(0)
        ? BigNumber.from(collateralValue).mul(100).div(debt)
        : BigNumber.from(0);

      positions[key] = {
        id: key,
        poolId,
        poolName: poolsData[poolId.toString()]?.name,
        collateralType: collateral,
        accountId,
        collateralAmount: c.value.amount,
        cRatio,
        debt,
      };
    });
    return positions;
  };

  useSynthetixProxyEvent({
    eventName: 'DelegationUpdated',
    listener: (event) => {
      const [userAccountId] = event;
      if (accountId === userAccountId.toString()) {
        liquidityPositionsQueryResult.refetch();
      }
    },
  });

  return { ...liquidityPositionsQueryResult, data: formatData() };
};
