import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import Big from 'big.js';
import { formatUnits } from 'ethers/lib/utils';
import { FC } from 'react';
import { useContractRead } from 'wagmi';
import { useSnxProxy } from '../../../../hooks';
import { CollateralType } from '../../../../utils/types';
import { Amount } from '../../../shared/Amount/Amount';

interface Props {
  poolId: string;
  collateral: CollateralType;
  distributor: string;
  decimals: number;
  symbol?: string;
}

const WEEK_SECONDS = 604800;

export const RewardRate: FC<Props> = ({ distributor, poolId, collateral, decimals, symbol }) => {
  const snxProxy = useSnxProxy();

  const { data, isLoading } = useContractRead({
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: 'getRewardRate',
    args: [poolId, collateral.address, distributor],
  });

  const rate = new Big(formatUnits(data?.toString() || 0, decimals + 18));
  if (isLoading) {
    return null;
  }
  if (rate.eq(0)) {
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
      Earning <Amount value={rate.mul(WEEK_SECONDS).toString()} /> {symbol} per week
    </>
  );
};
