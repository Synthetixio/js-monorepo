import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Grid, GridItem, Tooltip, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import { CollateralType } from '../../../utils/constants';
import { useStakingPositionStats } from '../../../hooks/useStakingPosition';

interface Props {
  accountId: string;
  fundId: string;
  collateral: CollateralType;
}

export const StakingStats: FC<Props> = ({ accountId, fundId, collateral }) => {
  const { collateralValue, debt, cRatio } = useStakingPositionStats(accountId, fundId, collateral);
  return (
    <Box>
      <Grid mb="1" textAlign="center" templateColumns="repeat(4, 1fr)">
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Collateral
          </Text>
          <Heading size="md">
            <Skeleton isLoaded={collateralValue !== undefined}>
              {collateralValue?.toString()} SNX
            </Skeleton>
          </Heading>
          <Text opacity="0.6" fontSize="sm">
            $4,200
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Debt
          </Text>
          <Heading size="md">
            <Skeleton isLoaded={debt !== undefined}>{debt?.toString()}</Skeleton>
          </Heading>
          <Text opacity="0.6" fontSize="sm">
            snxUSD minted {/* or burned */}
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            C-Ratio
          </Text>
          <Heading size="md">
            <Skeleton isLoaded={cRatio !== undefined}>{cRatio?.toString()}%</Skeleton>
          </Heading>
          <Text opacity="0.6" fontSize="sm">
            Minimum 150%
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Projected Fees
          </Text>
          <Heading size="md">25% APY</Heading>
          <Text opacity="0.6" fontSize="sm">
            $1,000 earned
            <Tooltip label="Your fees, earned when the synths in your staking position are exchanged, are automatically deducted from your debt. You can retrieve the earned fees by minting sUSD.">
              <InfoOutlineIcon ml="1" transform="translateY(-1.5px)" />
            </Tooltip>
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};
