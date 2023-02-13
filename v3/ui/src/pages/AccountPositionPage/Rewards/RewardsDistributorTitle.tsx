import { Button, Td, Text, Tr } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useContractRead, useContractWrite, useToken } from 'wagmi';
import { getContract } from '../../../hooks/useContract';
import { contracts } from '../../../utils/constants';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { Amount } from '@snx-v3/Amount';
import { RewardRate } from './RewardRate';
import { RewardsDistributor } from './RewardsDistributor';
import { useNetwork } from '@snx-v3/useBlockchain';
import { Reward, useRewards } from './useRewards';
import { useParams } from '@snx-v3/useParams';
import { wei } from '@synthetixio/wei';

export function RewardsDistributorTitle({ reward }: { reward: Reward }) {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);

  const network = useNetwork();
  const SYNTHETIX_PROXY = getContract(contracts.SYNTHETIX_PROXY, network.name);
  const SNX_REWARD = getContract(contracts.SNX_REWARD, network.name);
  const [isLoading, setIsLoading] = useState(false);

  const { data: rewardToken } = useContractRead({
    address: reward.distributor,
    abi: SNX_REWARD?.abi,
    functionName: 'token',
    enabled: Boolean(SNX_REWARD),
  });

  const { data: token } = useToken({
    // @ts-ignore
    address: rewardToken?.toString(),
    enabled: !!rewardToken,
  });

  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: SYNTHETIX_PROXY?.address,
    abi: SYNTHETIX_PROXY?.abi,
    functionName: 'claimRewards',
    args: [params.poolId, collateralType?.tokenAddress, params.accountId, reward.distributor],
  });

  const { refetch: refetchRewards } = useRewards({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });
  const claim = useCallback(async () => {
    if (!writeAsync) return;
    try {
      setIsLoading(true);
      const txReceipt = await writeAsync();
      await txReceipt.wait();
      refetchRewards();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [refetchRewards, writeAsync]);

  return (
    <Tr>
      <Td py="4">
        <RewardsDistributor distributor={reward.distributor} />
      </Td>
      <Td py="4">
        {token && <Amount value={wei(reward.value)} suffix={` ${token.symbol}`} />} available
        <Text fontSize="xs" opacity="0.66" mt="1">
          <RewardRate
            poolId={params.poolId}
            tokenAddress={collateralType?.tokenAddress}
            distributor={reward.distributor}
            symbol={token?.symbol}
          />
        </Text>
      </Td>
      <Td isNumeric>
        <Button
          disabled={wei(reward.value).eq(0)}
          isLoading={isLoading}
          onClick={() => claim()}
          size="sm"
          colorScheme="green"
        >
          <Text mr={1}>Claim</Text>
          {token && <Amount value={wei(reward.value)} suffix={` ${token.symbol}`} />}
        </Button>
      </Td>
    </Tr>
  );
}
