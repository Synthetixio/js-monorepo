import { keccak256, solidityPack } from 'ethers/lib/utils';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import {
  StakingPositionOnChainType,
  StakingPositionType,
} from '../components/accounts/StakingPositions/types';
import { useSynthetixProxyEvent, useSynthetixRead } from '../hooks';
import { fundsData } from '../utils/constants';
import { collateralTypesState } from '../utils/state';
import { CollateralType } from '../utils/types';

export const getCollateralType = (address: string, supportedCollateralTypes: CollateralType[]) =>
  supportedCollateralTypes.find((ct) => ct.address === address);

export const getLiquidityItemId = (
  accountId: string,
  fundId: string,
  collateralType: CollateralType | undefined
) =>
  keccak256(
    solidityPack(['uint', 'uint', 'address'], [accountId, fundId, collateralType?.address])
  );

export const useStakingPositions = (accountId: string) => {
  const [supportedCollateralTypes] = useRecoilState(collateralTypesState);
  const [stakingPositions, setStakingPositions] = useState<StakingPositionType[]>([]);

  useSynthetixRead({
    functionName: 'getAccountLiquidityItems',
    select: (data): StakingPositionType[] => {
      return data.map((item: StakingPositionOnChainType) => {
        const collateralType = getCollateralType(item.collateralType, supportedCollateralTypes);
        const id = getLiquidityItemId(accountId, item.fundId.toString(), collateralType);
        return {
          id,
          fundId: item.fundId,
          fundName: fundsData[item.fundId.toString()].name,
          collateralAmount: item.collateralAmount,
          collateralType: collateralType || supportedCollateralTypes[0],
        };
      });
    },
    args: [accountId],
    onSuccess: (data) => {
      setStakingPositions(data as StakingPositionType[]);
    },
  });

  useSynthetixProxyEvent({
    eventName: 'DelegationUpdated',
    listener: (event) => {
      const [, userAccountId, fundId, collateralTypeAddress, collateralAmount] = event;

      if (accountId === userAccountId.toString()) {
        // TODO: change StakingPositions to be an object for easy lookup
        const positionItemIdx = stakingPositions.findIndex((position) =>
          position.fundId.eq(fundId)
        );
        // create new copy to trigger re-render when setting positions
        if (positionItemIdx === -1) {
          const collateralType = getCollateralType(collateralTypeAddress, supportedCollateralTypes);
          const id = getLiquidityItemId(accountId, fundId.toString(), collateralType);

          setStakingPositions([
            ...stakingPositions,
            {
              id,
              fundId,
              fundName: fundsData[fundId.toString()].name,
              collateralAmount,
              collateralType: collateralType || supportedCollateralTypes[0],
            },
          ]);
        } else {
          stakingPositions[positionItemIdx] = {
            ...stakingPositions[positionItemIdx],
            collateralAmount,
          };
          setStakingPositions([...stakingPositions]);
        }
      }
    },
  });

  return {
    stakingPositions,
  };
};
