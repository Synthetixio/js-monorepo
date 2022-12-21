import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { useContractRead } from 'wagmi';
import { useContract } from '../../../../hooks/useContract';
import { contracts } from '../../../../utils/constants';
import { chainIdState } from '../../../../utils/state';
import { Address } from '../../../shared/Address';

interface Props {
  distributor: string;
}

export const RewardsDistributor: FC<Props> = ({ distributor }) => {
  const [localChainId] = useRecoilState(chainIdState);
  const rewardDistributer = useContract(contracts.SNX_REWARD);

  const { data } = useContractRead({
    addressOrName: distributor,
    contractInterface: rewardDistributer?.abi || '',
    chainId: localChainId,
    functionName: 'name',
    enabled: Boolean(rewardDistributer),
  });

  return (
    <>
      <span>{data}</span>
      <Text fontSize="xs" opacity="0.66" mt="1">
        <Address address={distributor} />
      </Text>
    </>
  );
};
