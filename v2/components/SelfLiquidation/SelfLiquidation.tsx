/* The designs for this disappeared, I still think we should have a page for this, so just committing this unstyled page displaying the data */

import { formatNumber, formatPercent } from '@snx-v2/formatters';
import { FC } from 'react';
import { Text, Box, SkeletonText, Heading, Flex } from '@chakra-ui/react';
import { InfoIcon } from '@snx-v2/icons';
import { useSelfLiquidationData } from '../../lib/useSelfLiquidationData';
import { useDebtData } from '@snx-v2/useDebtData';

export const SelfLiquidationUi: FC<{
  selfLiquidationPenalty?: number;
  selfLiquidationPenaltySNX?: number;
  selfLiquidationPenaltyDollar?: number;
  targetCRatioPercentage?: number;
}> = ({
  selfLiquidationPenalty,
  selfLiquidationPenaltySNX,
  targetCRatioPercentage,
  selfLiquidationPenaltyDollar,
}) => {
  return (
    <Box>
      <Heading>
        Unflag my Yes, I want to Self Liquidate and incur{' '}
        {selfLiquidationPenalty ? formatPercent(selfLiquidationPenalty) : '0%'}
      </Heading>
      <Text>
        Penalty Opting to Self Liquidate incurs a{' '}
        {selfLiquidationPenalty ? formatPercent(selfLiquidationPenalty) : '0%'}
        Penalty on your Staked SNX in order to bring your Ratio back to the Target Ratio of{' '}
        {targetCRatioPercentage ? formatPercent(targetCRatioPercentage) : '0%'}
      </Text>
      <Flex>
        <Flex flexDirection="column">
          <Text>
            20% SelfLiquidation penalty <InfoIcon />
          </Text>
          <Text>{selfLiquidationPenaltySNX ? formatNumber(selfLiquidationPenaltySNX) : 0}</Text>
        </Flex>
        <Flex flexDirection="column">
          <Text>
            Penalty Value in USD <InfoIcon />
          </Text>
          <Text>
            {selfLiquidationPenaltyDollar ? formatNumber(selfLiquidationPenaltyDollar) : 0}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
export const SelfLiquidation = () => {
  const { data: selfLiquidationData } = useSelfLiquidationData();
  const { data: debtData } = useDebtData();
  return (
    <SkeletonText isLoaded={Boolean(selfLiquidationData && debtData)}>
      <SelfLiquidationUi
        selfLiquidationPenaltyDollar={selfLiquidationData?.selfLiquidationPenaltyDollar.toNumber()}
        selfLiquidationPenalty={selfLiquidationData?.selfLiquidationPenalty.toNumber()}
        selfLiquidationPenaltySNX={selfLiquidationData?.selfLiquidationPenaltySNX.toNumber()}
        targetCRatioPercentage={debtData?.targetCRatioPercentage.toNumber()}
      />
    </SkeletonText>
  );
};
