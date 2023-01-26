import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';

import { currency } from '@snx-v3/format';
import { PoolBox } from '@snx-v3/PoolBox';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
export const ManageStatsUi: FC<{
  liquidityPosition: LiquidityPosition;
  collateralType: CollateralType;
}> = ({ liquidityPosition, collateralType }) => {
  return (
    <Flex direction="column" gap={2}>
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
        </Flex>
      </BorderBox>
      <BorderBox px={4} py={2} display="flex" gap={1} flexDirection="column">
        <Text color="gray.500" fontSize="sm">
          C-RATIO
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.50" fontSize="2xl" fontWeight="800">
            {currency(liquidityPosition.cRatio.div(100), { style: 'percent' })}
          </Text>
          <Text fontWeight="400" color="gray.500" fontSize="md">
            {currency(collateralType.liquidationRatioD18, { style: 'percent' })}
          </Text>
        </Flex>
      </BorderBox>
      <PoolBox />
    </Flex>
  );
};

export const ManageStats = () => {
  const params = useParams();
  const collateralType = useCollateralType(params.collateral);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });
  if (!liquidityPosition || !collateralType) return null; // TODO skeleton
  return <ManageStatsUi liquidityPosition={liquidityPosition} collateralType={collateralType} />;
};
