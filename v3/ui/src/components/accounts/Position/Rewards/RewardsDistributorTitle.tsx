import { Button, Td, Text, Tr } from '@chakra-ui/react';
import { parseUnits, formatValue } from '@snx-v3/format';
import { FC, useCallback, useState } from 'react';
import { useContractRead, useContractWrite, useToken } from 'wagmi';
import { useContract, useSnxProxy } from '../../../../hooks/useContract';
import { contracts } from '../../../../utils/constants';
import { CollateralType } from '../../../../utils/types';
import { Amount } from '../../../shared/Amount/Amount';
import { RewardRate } from './RewardRate';
import { RewardsDistributor } from './RewardsDistributor';

export const RewardsDistributorTitle: FC<{
  accountId: string;
  poolId: string;
  collateral: CollateralType;
  distributor: string;
  value: string;
  refetch: () => void;
}> = ({ distributor, value, poolId, collateral, accountId, refetch }) => {
  const snxProxy = useSnxProxy();
  const snxReward = useContract(contracts.SNX_REWARD);
  const [isLoading, setIsLoading] = useState(false);

  const { data: rewardToken } = useContractRead({
    address: distributor,
    abi: snxReward?.abi,
    functionName: 'token',
    enabled: Boolean(snxReward),
  });

  const { data: token } = useToken({
    address: rewardToken?.toString(),
    enabled: !!rewardToken,
  });

  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: snxProxy?.address,
    abi: snxProxy?.abi,
    functionName: 'claimRewards',

    args: [poolId, collateral.tokenAddress, accountId, distributor],
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
        {token && <Amount value={formatValue(value)} suffix={` ${token.symbol}`} />} available
        <Text fontSize="xs" opacity="0.66" mt="1">
          <RewardRate
            poolId={poolId}
            collateral={collateral}
            distributor={distributor}
            symbol={token?.symbol}
          />
        </Text>
      </Td>
      <Td isNumeric>
        <Button
          disabled={parseUnits(value).eq(0)}
          isLoading={isLoading}
          onClick={() => claim()}
          size="sm"
          colorScheme="green"
        >
          <Text mr={1}>Claim</Text>
          {token && <Amount value={formatValue(value)} suffix={` ${token.symbol}`} />}
        </Button>
      </Td>
    </Tr>
  );
};
