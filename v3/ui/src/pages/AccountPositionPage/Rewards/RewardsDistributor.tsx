export {};
/*
import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useContractRead } from 'wagmi';
import { useNetwork } from '@snx-v3/useBlockchain';
import { useContract } from '../../../hooks/useContract';
import { contracts } from '../../../utils/constants';
import { Address } from '../../../components/shared/Address';

interface Props {
  distributor: string;
}

export const RewardsDistributor: FC<Props> = ({ distributor }) => {
  const network = useNetwork();
  const rewardDistributer = useContract(contracts.SNX_REWARD);

  const { data: name } = useContractRead({
    address: distributor,
    abi: rewardDistributer?.abi,
    chainId: network.id,
    functionName: 'name',
    enabled: Boolean(rewardDistributer),
  });

  return (
    <>
      {/!* @ts-ignore *!/}
      <span>{name}</span>
      <Text fontSize="xs" opacity="0.66" mt="1">
        <Address address={distributor} />
      </Text>
    </>
  );
};
*/
