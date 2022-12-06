import { useRecoilValue } from 'recoil';
import { useContractReads } from 'wagmi';
import { collateralTypesState, poolsState } from '../utils/state';
import { useSnxProxy } from './useContract';
import { poolsData } from '../utils/constants';
import { useSynthetixProxyEvent } from './useContractEvent';
import { CollateralType, StakingPositionType } from '../utils/types';
import { formatValue } from '../utils/helpers';
import Big from 'big.js';

interface StakingCall {
  poolId: string;
  collateral: CollateralType;
  functionName: string;
}

export const useStakingPositions = (accountId: string) => {
  const pools = useRecoilValue(poolsState);
  const supportedCollateralTypes = useRecoilValue(collateralTypesState);
  const snxProxy = useSnxProxy();

  const calls: StakingCall[] = [];
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

  const getStakingPositions = useContractReads({
    enabled: true,
    contracts: calls.map((call) => ({
      addressOrName: snxProxy?.address,
      contractInterface: snxProxy?.abi,
      functionName: call.functionName,
      args: [accountId, call.poolId, call.collateral.address],
    })),
    select: (data) => {
      const results = data.map((value, index) => ({
        index,
        value,
        functionName: calls[index].functionName,
      }));

      const collaterals = results.filter((val) => val.functionName === 'getPositionCollateral');
      const debts = results.filter((val) => val.functionName === 'getPositionDebt');
      const positions: Record<string, StakingPositionType> = {};

      collaterals.forEach((c, i) => {
        if (!c.value || c.value.amount.eq(0)) {
          return;
        }
        const { poolId, collateral } = calls[c.index];
        const key = `${poolId}-${collateral.symbol}`;

        const debt = Big(formatValue(debts[i].value || 0, 18) || 0);
        const collateralValue = formatValue(c.value.value || 0, collateral.priceDecimals);

        const cRatio = !debt.eq(0) ? Big(collateralValue).mul(100).div(debt) : Big(0);

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
    },
  });

  useSynthetixProxyEvent({
    eventName: 'DelegationUpdated',
    listener: (event) => {
      const [userAccountId] = event;
      if (accountId === userAccountId.toString()) {
        getStakingPositions.refetch();
      }
    },
  });

  return getStakingPositions;
};
