import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useContractRead, useProvider } from 'wagmi';
import { useContract } from '../../../hooks/useContract';
import { contracts } from '../../../utils/constants';
import { Address } from '../../../components/shared/Address';

interface Props {
  distributor: string;
}

export const RewardsDistributor: FC<Props> = ({ distributor }) => {
  const provider = useProvider();
  const rewardDistributer = useContract(contracts.SNX_REWARD);

  const { data: name } = useContractRead({
    address: distributor,
    abi: rewardDistributer?.abi,
    chainId: provider.network.chainId,
    functionName: 'name',
    enabled: Boolean(rewardDistributer),
  });

  return (
    <>
      {/* @ts-ignore */}
      <span>{name}</span>
      <Text fontSize="xs" opacity="0.66" mt="1">
        <Address address={distributor} />
      </Text>
    </>
  );
};
