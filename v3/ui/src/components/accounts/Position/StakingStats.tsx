import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Grid, GridItem, Tooltip, Skeleton, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { formatValue } from '../../../utils/helpers';
import { BigNumber } from 'ethers';
import { currency } from '../../../utils/currency';
import { CollateralType } from '../../../utils/types';

interface Props {
  collateral: CollateralType;
  collateralAmount: number;
  collateralValue: number;
  debt: number;
  cRatio: number;
}

export const StakingStats: FC<Props> = ({
  collateral,
  debt,
  collateralAmount,
  collateralValue,
  cRatio,
}) => (
  <Box>
    <Grid mb="1" textAlign="center" templateColumns="repeat(4, 1fr)">
      <GridItem mb="3">
        <Text fontSize="sm" fontWeight="semibold">
          Collateral
        </Text>
        <Heading size="md">
          <Skeleton isLoaded={collateralAmount !== undefined}>
            {collateralAmount?.toString()} {collateral.symbol.toUpperCase()}
          </Skeleton>
        </Heading>
        <Text opacity="0.6" fontSize="sm">
          ${currency(collateralValue)}
        </Text>
      </GridItem>
      <GridItem mb="3">
        <Text fontSize="sm" fontWeight="semibold">
          Debt
        </Text>
        <Skeleton isLoaded={debt !== undefined}>
          <Heading size="md">${currency(debt.toString())}</Heading>
        </Skeleton>
        <Text opacity="0.6" fontSize="sm">
          $X net issuance
          <Tooltip label="This is the amount of snxUSD that you have minted minus the amount that you have burned.">
            <InfoOutlineIcon fontSize="sm" ml={1} transform="translateY(-1.5px)" />
          </Tooltip>
        </Text>
      </GridItem>
      <GridItem mb="3">
        <Text fontSize="sm" fontWeight="semibold">
          C-Ratio
        </Text>
        <Skeleton isLoaded={true}>
          <Heading size="md">
            <Flex alignItems="center" justify="center">
              {Number(debt?.toString() || 0) === 0 ? (
                <>
                  <Text>No Debt</Text>
                  <Tooltip label="You will have a C-Ratio once you’ve accrued some debt. You are not currently at risk of liquidation.">
                    <InfoIcon fontSize="sm" ml={2} transform="translateY(-1.5px)" />
                  </Tooltip>
                </>
              ) : (
                currency(cRatio?.toString()) + '%'
              )}
            </Flex>
          </Heading>
        </Skeleton>
        <Text opacity="0.6" fontSize="sm">
          Minimum {formatValue(collateral!.minimumCRatio!.mul(BigNumber.from(100)), 6).toFixed(0)}%
        </Text>
      </GridItem>
      <GridItem mb="3">
        <Text fontSize="sm" fontWeight="semibold">
          Projected Fees
        </Text>
        {/* TODO: when subgraph is ready */}
        <Heading size="md">X% APY</Heading>
        <Text opacity="0.6" fontSize="sm">
          ${currency(0)} earned
          <Tooltip label="Your yield is automatically deducted from your debt. You can retrieve the earned fees by minting snxUSD.">
            <InfoOutlineIcon ml="1" transform="translateY(-1.5px)" />
          </Tooltip>
        </Text>
      </GridItem>
    </Grid>
  </Box>
);
