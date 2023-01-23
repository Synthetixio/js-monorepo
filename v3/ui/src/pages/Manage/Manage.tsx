import { Box, Divider, Flex, Text, Heading, Spinner } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { useLiquidityPosition, LiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { FC } from 'react';
import { CollateralIcon } from '@snx-v3/icons';
import { currency } from '@snx-v3/format';
import { PoolBox } from '@snx-v3/PoolBox';

export const ManageUi: FC<{
  liquidityPosition: LiquidityPosition;
  collateralType: CollateralType;
}> = ({ liquidityPosition, collateralType }) => {
  return (
    <Box>
      <Link
        width="fit-content"
        display="flex"
        alignItems="center"
        color="cyan.500"
        as={ReactRouterLink}
        to="/"
        fontSize="sm"
        fontWeight={700}
        ml={2}
        mb={2}
      >
        <ArrowBackIcon mr={1} /> Account Overview
      </Link>
      <Heading fontWeight={700} fontSize="xl" display="flex" alignItems="center" gap={2}>
        <CollateralIcon symbol={collateralType.symbol} />
        {collateralType.displaySymbol} Vault
      </Heading>

      <Text color="gray.400" fontSize="sm">
        Deposit your collateral SNX to borrow snxUSD and contribute to the network collateral. If
        you’ve never staked on Synthetix V3 before, please read through this quick introduction
        first.
      </Text>
      <Divider my={8} bg="gray.900" />
      <Flex gap={4}>
        <BorderBox p={4}>
          <Text fontWeight="700" fontSize="xl">
            Manage C-Ratio
          </Text>
          <Text color="gray.400" fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna.
          </Text>
        </BorderBox>
        <Flex minW="450px" direction="column" gap={2}>
          <BorderBox px={4} py={2} display="flex" gap={1} flexDirection="column">
            <Text color="gray.500" fontSize="sm">
              Collateral
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="gray.50" fontSize="2xl" fontWeight="800">
                {currency(liquidityPosition.collateralAmount)}
              </Text>
              <Text fontWeight="400" color="gray.500" fontSize="md">
                {currency(liquidityPosition.collateralValue, {
                  currency: 'USD',
                  style: 'currency',
                })}
              </Text>
            </Flex>
          </BorderBox>
          <BorderBox px={4} py={2} display="flex" gap={1} flexDirection="column">
            <Text color="gray.500" fontSize="sm">
              Debt
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="gray.50" fontSize="2xl" fontWeight="800">
                {currency(liquidityPosition.debt)}
              </Text>
              <Text fontWeight="400" color="gray.500" fontSize="md">
                TODO Net Issuance (do we want this?)
              </Text>
            </Flex>
          </BorderBox>
          <BorderBox px={4} py={2} display="flex" gap={1} flexDirection="column">
            <Text color="gray.500" fontSize="sm">
              C-RATIO
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Text color="gray.50" fontSize="2xl" fontWeight="800">
                {currency(liquidityPosition.cRatio, { style: 'percent' })}
              </Text>
              <Text fontWeight="400" color="gray.500" fontSize="md">
                {currency(collateralType.liquidationRatioD18, { style: 'percent' })}
              </Text>
            </Flex>
          </BorderBox>
          <PoolBox />
        </Flex>
      </Flex>
    </Box>
  );
};

export const Manage = () => {
  const params = useParams();
  const collateralType = useCollateralType(params.collateral);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });
  if (!collateralType || !liquidityPosition) {
    return <Spinner />; // TODO skeleton
  }
  return <ManageUi liquidityPosition={liquidityPosition} collateralType={collateralType} />;
};
