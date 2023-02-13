import { FC, useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';

import { currency } from '@snx-v3/format';
import { PoolBox } from '@snx-v3/PoolBox';
import { LiquidityPosition, useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType, useCollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import Wei from '@synthetixio/wei';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ChangeStat: FC<{
  value: Wei;
  newValue: Wei;
  hasChanges: boolean;
  formatFn: (val: Wei) => string;
}> = ({ formatFn, value, newValue, hasChanges }) => {
  return (
    <Flex gap={1} color="gray.50" fontSize="2xl" fontWeight="800" alignItems="center">
      <Text>{formatFn(value)}</Text>
      {hasChanges && !value.eq(newValue) ? (
        <Text>
          <ArrowForwardIcon /> {formatFn(newValue)}
        </Text>
      ) : null}
    </Flex>
  );
};

export const ManageStatsUi: FC<{
  liquidityPosition: LiquidityPosition;
  collateralType: CollateralType;
  newCratio: Wei;
  newCollateralAmount: Wei;
  newDebt: Wei;
  hasChanges: boolean;
}> = ({
  liquidityPosition,
  collateralType,
  newCollateralAmount,
  newCratio,
  newDebt,
  hasChanges,
}) => {
  return (
    <Flex direction="column" gap={2}>
      <BorderBox px={4} py={2} display="flex" gap={1} flexDirection="column">
        <Text color="gray.500" fontSize="sm">
          Collateral
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          data-testid="manage stats collateral"
        >
          <ChangeStat
            value={liquidityPosition.collateralAmount}
            newValue={newCollateralAmount}
            formatFn={(val: Wei) => `${currency(val)} ${collateralType.displaySymbol}`}
            hasChanges={hasChanges}
          />
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
        <Flex justifyContent="space-between" alignItems="center" data-testid="manage stats debt">
          <ChangeStat
            value={liquidityPosition.debt}
            newValue={newDebt}
            formatFn={(val: Wei) => currency(val, { currency: 'USD', style: 'currency' })}
            hasChanges={hasChanges}
          />
        </Flex>
      </BorderBox>
      <BorderBox px={4} py={2} display="flex" gap={1} flexDirection="column">
        <Text color="gray.500" fontSize="sm" data-testid="manage stats c-ratio">
          C-RATIO
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <ChangeStat
            value={liquidityPosition.cRatio}
            newValue={newCratio}
            formatFn={(val: Wei) => currency(val, { style: 'percent' })}
            hasChanges={hasChanges}
          />
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
  const { debtChange, collateralChange } = useContext(ManagePositionContext);

  const collateralType = useCollateralType(params.collateralSymbol);
  const { data: liquidityPosition } = useLiquidityPosition({
    tokenAddress: collateralType?.tokenAddress,
    accountId: params.accountId,
    poolId: params.poolId,
  });
  const { newCRatio, newCollateralAmount, newDebt, hasChanges } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition?.collateralAmount,
    collateralValue: liquidityPosition?.collateralValue,
    debt: liquidityPosition?.debt,
    collateralChange: collateralChange,
    debtChange: debtChange,
  });
  if (!liquidityPosition || !collateralType) return null; // TODO skeleton
  return (
    <ManageStatsUi
      hasChanges={hasChanges}
      newCratio={newCRatio}
      newDebt={newDebt}
      newCollateralAmount={newCollateralAmount}
      liquidityPosition={liquidityPosition}
      collateralType={collateralType}
    />
  );
};
