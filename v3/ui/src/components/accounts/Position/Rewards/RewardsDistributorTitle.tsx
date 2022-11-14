import { Text, Button, Tr, Td } from '@chakra-ui/react';
import Big from 'big.js';
import { formatUnits } from 'ethers/lib/utils';
import { FC, useCallback, useState } from 'react';
import { useContractRead, useContractWrite, useToken } from 'wagmi';
import { useContract, useSnxProxy } from '../../../../hooks';
import { contracts } from '../../../../utils/constants';
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

export const RewardsDistributorTitle: FC<Props> = ({
  distributor,
  value,
  poolId,
  collateral,
  accountId,
  refetch,
}) => {
  const snxProxy = useSnxProxy();
  const snxReward = useContract(contracts.SNX_REWARD);
  const [isLoading, setIsLoading] = useState(false);

  const { data: rewardToken } = useContractRead({
    addressOrName: distributor,
    contractInterface: snxReward?.abi,
    functionName: 'token',
  });

  const { data: token } = useToken({
    address: rewardToken?.toString(),
    enabled: !!rewardToken,
  });

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
        {token && <Amount value={formatUnits(value, token.decimals)} suffix={` ${token.symbol}`} />}{' '}
        available
        <Text fontSize="xs" opacity="0.66" mt="1">
          <RewardRate
            poolId={poolId}
            collateral={collateral}
            distributor={distributor}
            decimals={token?.decimals || 18}
            symbol={token?.symbol}
          />
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
          {token && (
            <Amount value={formatUnits(value, token.decimals)} suffix={` ${token.symbol}`} />
          )}
        </Button>
      </Td>
    </Tr>
  );
};
