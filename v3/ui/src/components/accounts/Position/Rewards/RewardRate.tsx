import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react';
import Big from 'big.js';
import { FC } from 'react';
import { useContractRead } from 'wagmi';
import { useSnxProxy } from '../../../../hooks';
import { CollateralType } from '../../../../utils/types';

interface Props {
  poolId: string;
  collateral: CollateralType;
  distributor: string;
}

export const RewardRate: FC<Props> = ({ distributor, poolId, collateral }) => {
  const snxProxy = useSnxProxy();

  const { data: rate, isLoading } = useContractRead({
    addressOrName: snxProxy?.address,
    contractInterface: snxProxy?.abi,
    functionName: 'getRewardRate',
    args: [poolId, collateral.address, distributor],
  });
  if (isLoading) {
    return null;
  }
  if (new Big(rate?.toString() || 0).eq(0)) {
    return (
      <>
        Non-continuous{' '}
        <Tooltip label="These rewards will be distributed at irregular intervals.">
          <InfoIcon fontSize="sm" ml={1} />
        </Tooltip>
      </>
    );
  }

  return <>Earning X.XX TKN per week</>;
};
