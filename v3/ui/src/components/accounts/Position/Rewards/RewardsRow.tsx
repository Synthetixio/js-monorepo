import { Text, Button, Tr, Td } from '@chakra-ui/react';
import Big from 'big.js';
import { FC, useCallback, useState } from 'react';
import { useContractWrite } from 'wagmi';
import { useSnxProxy } from '../../../../hooks';
import { CollateralType } from '../../../../utils/types';
import { Amount } from '../../../shared/Amount/Amount';
import { RewardRate } from './RewardRate';
import { RewardsDistributor } from './RewardsDistributor';

interface Props {
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  distributor: string;
  value: string;
  refetch: () => void;
}

export const RewardsRow: FC<Props> = ({
  distributor,
  value,
  poolId,
  collateral,
  accountId,
  refetch,
}) => {
  const snxProxy = useSnxProxy();
  const [isLoading, setIsLoading] = useState(false);

  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: 'claimRewards',
    args: [poolId, collateral.address, accountId, distributor],
  });

  const claim = useCallback(async () => {
    try {
      setIsLoading(true);
      const txReceipt = await writeAsync();
      await txReceipt.wait();
      refetch();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [refetch, writeAsync]);

  return (
    <Tr>
      <Td py="4">
        <RewardsDistributor distributor={distributor} />
      </Td>
      <Td py="4">
        <Amount value={value} /> available
        <Text fontSize="xs" opacity="0.66" mt="1">
          <RewardRate poolId={poolId} collateral={collateral} distributor={distributor} />
        </Text>
      </Td>
      <Td isNumeric>
        <Button
          disabled={new Big(value).eq(0)}
          isLoading={isLoading}
          onClick={() => claim()}
          size="sm"
          colorScheme="green"
        >
          <Text mr={1}>Claim</Text>
          <Amount value={value} />
        </Button>
      </Td>
    </Tr>
  );
};
