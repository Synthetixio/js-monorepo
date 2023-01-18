import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';
import { wei } from '@synthetixio/wei';

const WEEK_SECONDS = 604800;

export function RewardRate({
  distributor,
  poolId,
  symbol,
  tokenAddress,
}: {
  poolId?: string;
  distributor?: string;
  symbol?: string;
  tokenAddress?: string;
}) {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const { data: rewardRate, isLoading } = useQuery({
    queryKey: [
      'RewardRate',
      {
        poolId,
        tokenAddress,
        CoreProxy: CoreProxy?.address,
      },
      { distributor },
    ],
    queryFn: async () => {
      if (!(CoreProxy && poolId && tokenAddress && distributor)) throw new Error('OMG');
      const value = await CoreProxy.getRewardRate(poolId, tokenAddress, distributor);
      return wei(value);
    },
    placeholderData: wei(0),
    enabled: Boolean(CoreProxy && network.name && poolId && tokenAddress && distributor),
  });

  if (!rewardRate || isLoading) {
    return null;
  }
  if (rewardRate.eq(0)) {
    return (
      <>
        Non-continuous{' '}
        <Tooltip label="These rewards will be distributed at irregular intervals.">
          <InfoIcon fontSize="sm" ml={1} />
        </Tooltip>
      </>
    );
  }

  return (
    <>
      Earning <Amount value={rewardRate.mul(WEEK_SECONDS)} /> {symbol} per week
    </>
  );
}
