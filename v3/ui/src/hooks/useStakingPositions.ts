import { useRecoilValue } from 'recoil';
import { useContractReads } from 'wagmi';
import { collateralTypesState, poolsState } from '../utils/state';
import { useSnxProxy } from './useContract';
import { poolsData } from '../utils/constants';
import { useSynthetixProxyEvent } from './useContractEvent';
import { BigNumber } from 'ethers';
import { CollateralType, StakingPositionType } from '../utils/types';
import { formatValue } from '../utils/helpers';

interface StakingCall {
  poolId: string;
  coolateral: CollateralType;
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
      supportedCollateralTypes.forEach((coolateral) => {
        calls.push({
          poolId,
          coolateral,
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
      args: [accountId, call.poolId, call.coolateral.address],
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
        if (c.value.amount.eq(0)) {
          return;
        }
        const { poolId, coolateral } = calls[c.index];
        const key = `${poolId}-${coolateral.symbol}`;

        const debt = BigNumber.from(formatValue(debts[i].value || 0, 18) || 0);
        const collateralValue = formatValue(c.value.value || 0, coolateral.priceDecimals);

        const cRatio = !debt.isZero()
          ? BigNumber.from(collateralValue).mul(100).div(debt)
          : BigNumber.from(0);

        positions[key] = {
          id: key,
          poolId,
          poolName: poolsData[poolId.toString()]?.name,
          collateralType: coolateral,
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
