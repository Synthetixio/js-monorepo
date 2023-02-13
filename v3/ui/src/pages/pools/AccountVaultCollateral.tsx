import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { FC } from 'react';
import { Button, Skeleton, Text } from '@chakra-ui/react';
import { useNavigate, generatePath } from 'react-router-dom';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { useParams } from '@snx-v3/useParams';

const AccountVaultCollateralUi: FC<{
  collateralValue: number;
  collateralAmount: number;
  collateralSymbol: string;
  poolId: string;
  accountId: string;
  isLoading: boolean;
}> = ({ collateralValue, collateralAmount, collateralSymbol, isLoading, accountId, poolId }) => {
  const navigate = useNavigate();
  return (
    <>
      <Text mt={2} fontSize="sm" fontWeight="700" color="gray.500">
        MY TOTAL
      </Text>
      {isLoading ? (
        <Skeleton h={6} w="full" />
      ) : (
        <Text fontSize="xl" fontWeight={700} color="white">
          {formatNumber(collateralAmount)} {collateralSymbol}
        </Text>
      )}
      {isLoading ? (
        <Skeleton my={1} h={4} w="full" />
      ) : (
        <Text fontSize="sm" color="gray.500" fontWeight="400">
          {formatNumberToUsd(collateralValue)}
        </Text>
      )}
      <Button
        onClick={() => {
          navigate(
            generatePath('/accounts/:accountId/positions/:collateral/:poolId', {
              accountId,
              collateral: collateralSymbol,
              poolId,
            })
          );
        }}
        mt={1}
      >
        Deposit
      </Button>
    </>
  );
};

export const AccountVaultCollateral: FC<{ collateral: CollateralType }> = ({ collateral }) => {
  const params = useParams();
  const { data, isLoading } = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateral?.tokenAddress,
  });

  if (!params.poolId || !params.accountId) return null;
  return (
    <AccountVaultCollateralUi
      collateralAmount={data?.collateralAmount.toNumber() || 0}
      collateralValue={data?.collateralValue.toNumber() || 0}
      collateralSymbol={collateral.symbol}
      isLoading={isLoading}
      poolId={params.poolId}
      accountId={params.accountId}
    />
  );
};
