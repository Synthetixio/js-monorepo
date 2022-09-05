import { useRecoilValue } from 'recoil';
import { useContractReads } from 'wagmi';
import { collateralTypesState, poolsState } from '../utils/state';
import { useSnxProxy } from './useContract';
import { poolsData } from '../utils/constants';
import { useSynthetixProxyEvent } from './useContractEvent';
import { BigNumber } from 'ethers';
import { StakingPositionType } from '../utils/types';
import { formatValue } from '../utils/helpers';

type ContractReadsParams = Parameters<typeof useContractReads>[0];

export const useStakingPositions = (accountId: string) => {
  const pools = useRecoilValue(poolsState);
  const supportedCollateralTypes = useRecoilValue(collateralTypesState);
  const snxProxy = useSnxProxy();

  const funcCalls: ContractReadsParams['contracts'] = [];
  const functionNames = ['getPositionCollateral', 'getPositionDebt'];
  functionNames.forEach((functionName) => {
    pools.forEach((p) => {
      supportedCollateralTypes.forEach((ct) => {
        funcCalls.push({
          addressOrName: snxProxy?.address,
          contractInterface: snxProxy?.abi,
          functionName,
          args: [accountId, p, ct.address],
        });
      });
    });
  });

  const getStakingPositions = useContractReads({
    enabled: true,
    contracts: funcCalls,
    select: (data) => {
      const positions: Record<string, StakingPositionType> = {};

      pools.forEach((poolId) => {
        supportedCollateralTypes.forEach((ct, idx) => {
          const key = `${poolId}-${ct.symbol}`;
          if (!data[idx].amount.eq(0)) {
            const debtIndex = idx + pools.length * supportedCollateralTypes.length;
            const debt = formatValue(data[debtIndex] || 0, 18) || 0;
            const collateralValue = formatValue(data[idx]?.value || 0, ct.priceDecimals);
            const cRatio = !!debt ? BigNumber.from(collateralValue).mul(100).div(debt) : 0;

            positions[key] = {
              id: key,
              poolId,
              poolName: poolsData[poolId.toString()].name,
              collateralType: ct,
              collateralAmount: data[idx].amount,
              cRatio,
              debt,
              accountId,
            };
          }
        });
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
