import { useRecoilValue } from 'recoil';
import { useContractReads } from 'wagmi';
import { collateralTypesState, fundsState } from '../utils/state';
import { useSnxProxy } from './useContract';
import { fundsData } from '../utils/constants';
import { useSynthetixProxyEvent } from './useContractEvent';
import { BigNumber } from 'ethers';
import { StakingPositionType } from '../components/accounts/StakingPositions/types';

type ContractReadsParams = Parameters<typeof useContractReads>[0];

export const useStakingPositions = (accountId: string) => {
  const funds = useRecoilValue(fundsState);
  const supportedCollateralTypes = useRecoilValue(collateralTypesState);
  const snxProxy = useSnxProxy();

  const funcCalls: ContractReadsParams['contracts'] = [];
  const functionNames = ['accountVaultCollateral', 'accountCollateralRatio', 'accountVaultDebt'];
  functionNames.forEach((functionName) => {
    funds.forEach((f) => {
      supportedCollateralTypes.forEach((ct) => {
        funcCalls.push({
          addressOrName: snxProxy?.address,
          contractInterface: snxProxy?.abi,
          functionName,
          args: [accountId, f, ct.address],
        });
      });
    });
  });

  const getStakingPositions = useContractReads({
    enabled: true,
    contracts: funcCalls,
    select: (data) => {
      const positions: Record<string, StakingPositionType> = {};

      funds.forEach((f) => {
        supportedCollateralTypes.forEach((ct, idx) => {
          const key = `${f}-${ct.symbol}`;
          if (!data[idx].amount.eq(0)) {
            positions[key] = {
              id: key,
              fundId: f,
              fundName: fundsData[f.toString()].name,
              collateralType: ct,
              collateralAmount: data[idx].amount,
              cRatio: BigNumber.from(data[idx + functionNames.length] || 0),
              debt: data[idx + functionNames.length * 2] || BigNumber.from(0),
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
