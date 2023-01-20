import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Grid, GridItem, Heading, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { currency } from '@snx-v3/format';
import { Amount } from '@snx-v3/Amount';
import { useParams } from '@snx-v3/useParams';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { wei } from '@synthetixio/wei';

export function DepositingStats() {
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const liquidityPosition = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });
  return (
    <Box>
      <Grid mb="1" textAlign="center" templateColumns="repeat(4, 1fr)">
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Collateral
          </Text>
          <Heading size="md">
            <Skeleton isLoaded={liquidityPosition.isFetched}>
              <Amount
                value={liquidityPosition.data?.collateralAmount}
                suffix={` ${collateralType?.displaySymbol} `}
              />
            </Skeleton>
          </Heading>
          <Text opacity="0.6" fontSize="sm">
            <Amount value={liquidityPosition.data?.collateralValue} prefix="$" />
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Debt
          </Text>
          <Skeleton isLoaded={liquidityPosition.isFetched}>
            <Heading size="md">
              <Amount value={liquidityPosition.data?.debt} prefix="$" />
            </Heading>
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
          <Skeleton isLoaded={liquidityPosition.isFetched}>
            <Heading size="md">
              <Flex alignItems="center" justify="center">
                {Number(liquidityPosition.data?.debt.toString() || 0) === 0 ? (
                  <>
                    <Text>No Debt</Text>
                    <Tooltip label="You will have a C-Ratio once you’ve accrued some debt. You are not currently at risk of liquidation.">
                      <InfoIcon fontSize="sm" ml={2} transform="translateY(-1.5px)" />
                    </Tooltip>
                  </>
                ) : (
                  <Amount value={liquidityPosition.data?.cRatio} suffix="%" />
                )}
              </Flex>
            </Heading>
          </Skeleton>
          <Text opacity="0.6" fontSize="sm">
            Liquidation Ratio{' '}
            <Amount value={collateralType?.liquidationRatioD18.mul(100)} suffix="% " />
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Projected Fees
          </Text>
          {/* TODO: when subgraph is ready */}
          <Heading size="md">X% APY</Heading>
          <Text opacity="0.6" fontSize="sm">
            ${currency(wei(0))} earned
            <Tooltip label="Your yield is automatically deducted from your debt. You can retrieve the earned fees by minting snxUSD.">
              <InfoOutlineIcon ml="1" transform="translateY(-1.5px)" />
            </Tooltip>
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
}
