import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useContractWrite } from 'wagmi';
import Stake from '../../components/accounts/Stake';
import { StakingNav } from '../../components/accounts/StakingNav';
import StakingPositions from '../../components/accounts/StakingPositions';
import {
  StakingPositionOnChainType,
  StakingPositionType,
} from '../../components/accounts/StakingPositions/types';
import { useContract, useSynthetixProxyEvent, useSynthetixRead } from '../../hooks';
import { contracts, fundsData } from '../../utils/constants';
import { collateralTypesState } from '../../utils/state';
import { CollateralType } from '../../utils/types';
import { utils } from 'ethers';

const getCollateralType = (address: string, supportedCollateralTypes: CollateralType[]) =>
  supportedCollateralTypes.find((ct) => ct.address === address);

export function Account() {
  const { id } = useParams();
  const accountId = Array.isArray(id) ? id[0] : id;
  const [supportedCollateralTypes] = useRecoilState(collateralTypesState);
  const [stakingPositions, setStakingPositions] = useState<StakingPositionType[]>([]);

  useSynthetixRead({
    functionName: 'getAccountLiquidityItems',
    select: (data): StakingPositionType[] => {
      return data.map((item: StakingPositionOnChainType) => {
        const collateralType = getCollateralType(item.collateralType, supportedCollateralTypes);
        return {
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
          setStakingPositions([
            ...stakingPositions,
            {
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

  // const accountModule = useContract(contracts.SYNTHETIX_PROXY);

  // const { data, error, isLoading, write } = useContractWrite({
  //   mode: 'recklesslyUnprepared',
  //   addressOrName: accountModule?.address,
  //   contractInterface: accountModule?.abi,
  //   functionName: 'grantRole',
  //   args: [
  //     '6130245259',
  //     utils.formatBytes32String('stake'),
  //     '0x9b12d2A80fad64A5499e70bf74447C352c99fD46',
  //   ],
  //   chainId: accountModule?.chainId,
  // });

  // console.log(data, error);

  return (
    <Box>
      <StakingNav />
      <StakingPositions data={stakingPositions} />
      <Heading size="md" mb="3">
        Stake Collateral
      </Heading>
      <Stake accountId={accountId} stakingPositions={stakingPositions} />
    </Box>
  );
}
