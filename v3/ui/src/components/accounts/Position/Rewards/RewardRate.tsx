import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { parseUnits } from '@snx-v3/format';
import { Amount } from '@snx-v3/Amount';
import { useQuery } from '@tanstack/react-query';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useNetwork } from '@snx-v3/useBlockchain';

const WEEK_SECONDS = 604800;

export const RewardRate: FC<{
  poolId: string;
  collateral: CollateralType;
  distributor: string;
  symbol?: string;
}> = ({ distributor, poolId, collateral, symbol }) => {
  const network = useNetwork();
  const { data: CoreProxy } = useCoreProxy();
  const { data: rewardRate, isLoading } = useQuery({
    queryKey: [
      network.name,
      'rewardRate',
      { poolId },
      { tokenAddress: collateral.tokenAddress },
      { distributor },
    ],
    queryFn: async () => {
      if (!CoreProxy) throw new Error('OMG');
      const value = await CoreProxy.getRewardRate(poolId, collateral.tokenAddress, distributor);
      return parseUnits(value);
    },
    placeholderData: parseUnits(0),
    enabled: Boolean(CoreProxy && network.name && poolId && collateral.tokenAddress && distributor),
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
      Earning <Amount value={rewardRate.mul(WEEK_SECONDS).toString()} /> {symbol} per week
    </>
  );
};
