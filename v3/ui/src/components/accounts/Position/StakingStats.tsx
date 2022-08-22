import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Grid, GridItem, Tooltip, Skeleton, Spinner } from '@chakra-ui/react';
import { FC } from 'react';
import { CollateralType } from '../../../utils/constants';
import { useStakingPositionStats } from '../../../hooks/useStakingPosition';
import { formatValue } from '../../../utils/helpers';
import { BigNumber } from 'ethers';
import { PositionDebt } from './PositionDebt';

interface Props {
  accountId: string;
  fundId: string;
  collateral: CollateralType;
}

export const StakingStats: FC<Props> = ({ accountId, fundId, collateral }) => {
  const { debt, cRatio, stakingPosition } = useStakingPositionStats(accountId, fundId, collateral);

  if (!stakingPosition) return <Spinner />;

  const { collateralAmount: collateralAmountBN, collateralType } = stakingPosition;
  const { decimals, price: priceBN, priceDecimals } = collateralType;

  const collateralAmount = formatValue(collateralAmountBN, decimals);
  const price = formatValue(priceBN!, priceDecimals!);
  const collateralValue = collateralAmount * price;

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
            ${collateralValue.toFixed(2)}
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Debt
          </Text>
          <Skeleton isLoaded={debt !== undefined}>
            <PositionDebt debt={debt?.toString() || 0} />
          </Skeleton>
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
            Minimum
            {formatValue(
              collateralType!.minimumCRatio!.mul(BigNumber.from(100)),
              collateralType.decimals
            ).toFixed(0)}
            %
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
