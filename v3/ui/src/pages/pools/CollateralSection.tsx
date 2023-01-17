import { Spinner, Text, Flex, Button } from '@chakra-ui/react';
import { useVaultCollaterals } from '@snx-v3/useVaultCollaterals';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { AccountVaultCollateral } from './AccountVaultCollateral';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';

const calculateTvl = (vaultCollaterals: ReturnType<typeof useVaultCollaterals>['data']) => {
  const zeroValues = { value: wei(0), amount: wei(0) };
  if (!vaultCollaterals) return zeroValues;
  return vaultCollaterals.reduce((acc, { value, amount }) => {
    acc.value = acc.value.add(value);
    acc.amount = acc.amount.add(amount);
    return acc;
  }, zeroValues);
};
export const CollateralSectionUi: FC<{
  vaultCollaterals: ReturnType<typeof useVaultCollaterals>['data'];
  accountId?: string;
  AccountVaultCollateral: FC<{ collateral: CollateralType }>;
}> = ({ vaultCollaterals, accountId, AccountVaultCollateral }) => {
  const navigate = useNavigate();
  if (!vaultCollaterals) return <Spinner />;
  const tvl = calculateTvl(vaultCollaterals);
  return (
    <BorderBox mt={4} padding={4}>
      <Text fontWeight={700} fontSize="xl">
        Collateral Types
      </Text>
      <BorderBox padding={4} mb={2}>
        <Text fontWeight={700} fontSize="xl" color="gray.500">
          TOTAL POOL TVL
        </Text>
        <Text fontWeight={700} fontSize="2xl" color="white">
          {formatNumberToUsd(tvl.value.toNumber())}
        </Text>
      </BorderBox>
      <Flex justifyContent="space-between">
        {vaultCollaterals.map((vaultCollateral) => (
          <BorderBox
            key={vaultCollateral.collateralType.tokenAddress}
            display="flex"
            bg="whiteAlpha.50"
            paddingX={4}
            paddingY={2}
            width="48%"
            flexDirection="column"
          >
            <Text fontWeight={800} color="white" fontSize="2xl">
              {vaultCollateral.collateralType.symbol}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="400">
              Price
            </Text>
            <Text fontSize="xs" color="gray.400" fontWeight="400">
              {vaultCollateral.collateralType.price
                ? formatNumberToUsd(vaultCollateral.collateralType.price.toNumber())
                : '-'}
            </Text>
            <Text mt={2} fontSize="sm" fontWeight="700" color="gray.500">
              TVL
            </Text>
            <Text fontSize="xl" fontWeight={700} color="white">
              {formatNumber(vaultCollateral.amount.toNumber())}{' '}
              {vaultCollateral.collateralType.symbol}
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              {formatNumberToUsd(vaultCollateral.value.toNumber())}
            </Text>
            {accountId ? (
              <AccountVaultCollateral collateral={vaultCollateral.collateralType} />
            ) : (
              <Button onClick={() => navigate('/')}>Deposit</Button>
            )}
          </BorderBox>
        ))}
      </Flex>
    </BorderBox>
  );
};
export const CollateralSection = () => {
  const params = useParams();

  const { data: vaultCollaterals } = useVaultCollaterals(
    params.poolId ? parseFloat(params.poolId) : undefined
  );

  return (
    <CollateralSectionUi
      vaultCollaterals={vaultCollaterals}
      accountId={params.accountId}
      AccountVaultCollateral={AccountVaultCollateral}
    />
  );
};
