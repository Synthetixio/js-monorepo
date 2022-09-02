import { useRecoilValue } from 'recoil';
import { useContractReads } from 'wagmi';
import { collateralTypesState, poolsState } from '../utils/state';
import { useSnxProxy } from './useContract';
import { poolsData } from '../utils/constants';
import { useSynthetixProxyEvent } from './useContractEvent';
import { BigNumber } from 'ethers';
import { StakingPositionType } from '../utils/types';

type ContractReadsParams = Parameters<typeof useContractReads>[0];

export const useStakingPositions = (accountId: string) => {
  const pools = useRecoilValue(poolsState);
  const supportedCollateralTypes = useRecoilValue(collateralTypesState);
  const snxProxy = useSnxProxy();

  const funcCalls: ContractReadsParams['contracts'] = [];
  const functionNames = [
    'getPositionCollateral',
    'getPositionDebt',
    'getPositionCollateralizationRatio',
  ];
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
            positions[key] = {
              id: key,
              poolId,
              poolName: poolsData[poolId.toString()].name,
              collateralType: ct,
              collateralAmount: data[idx].amount,
              cRatio: BigNumber.from(data[idx + functionNames.length * 2] || 0),
              debt: data[idx + functionNames.length] || BigNumber.from(0),
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
