import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { useContractRead } from 'wagmi';
import { useContract } from '../../../../hooks';
import { contracts } from '../../../../utils/constants';
import { prettyTx } from '../../../../utils/helpers';
import { chainIdState } from '../../../../utils/state';

interface Props {
  distributor: string;
}

export const RewardsDistributor: FC<Props> = ({ distributor }) => {
  const [localChainId] = useRecoilState(chainIdState);
  const rewardDistributer = useContract(contracts.SNX_REWARD);

  const { data } = useContractRead({
    addressOrName: distributor,
    contractInterface: rewardDistributer?.abi,
    chainId: localChainId,
    functionName: 'name',
  });

  return (
    <>
      <span>{data}</span>
      <Text fontSize="xs" opacity="0.66" mt="1">
        {prettyTx(distributor)}
      </Text>
    </>
  );
};
