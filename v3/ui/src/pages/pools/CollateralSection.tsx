import { Spinner, Text, Flex, Image, Tooltip, Box } from '@chakra-ui/react';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { FC } from 'react';
import { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';
import { InfoIcon } from '@chakra-ui/icons';
import { useGetPoolData } from '../../hooks/useGetPoolData';

export const calculateVaultTotals = (
  vaultCollaterals: ReturnType<typeof useVaultsData>['data']
) => {
  const zeroValues = { collateral: { value: wei(0), amount: wei(0) }, debt: wei(0) };
  if (!vaultCollaterals) return zeroValues;
  return vaultCollaterals.reduce((acc, { collateral, debt }) => {
    acc.collateral = {
      value: acc.collateral.value.add(collateral.value),
      amount: acc.collateral.amount.add(collateral.amount),
    };
    acc.debt = acc.debt.add(debt);
    return acc;
  }, zeroValues);
};
export const CollateralSectionUi: FC<{
  vaultCollaterals: ReturnType<typeof useVaultsData>['data'];
  poolName?: string;
}> = ({ vaultCollaterals, poolName }) => {
  if (!vaultCollaterals) return <Spinner />;
  const { collateral: totalCollateral, debt: totalDebt } = calculateVaultTotals(vaultCollaterals);
  return (
    <BorderBox padding={4}>
      <Text fontWeight={700} fontSize="xl">
        Collateral Types
      </Text>
      <Text color="gray.400" fontSize="sm">
        {poolName}
      </Text>
      <BorderBox padding={4} mt={4}>
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: 'row', md: 'column', lg: 'row' }}
        >
          <Text
            display="flex"
            alignItems="center"
            fontWeight={700}
            fontSize="md"
            gap={1}
            color="white"
          >
            TOTAL TVL
            <Tooltip label="Total TVL for Pool">
              <InfoIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          <Text fontWeight={700} fontSize="xl" color="white">
            {formatNumberToUsd(totalCollateral.value.toNumber())}
          </Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: 'row', md: 'column', lg: 'row' }}
        >
          <Text
            display="flex"
            alignItems="center"
            fontWeight={700}
            fontSize="md"
            gap={1}
            color="white"
          >
            TOTAL DEBT
            <Tooltip label="Total TVL for Pool">
              <InfoIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          <Text fontWeight={700} fontSize="xl" color="white">
            {formatNumberToUsd(totalDebt.toNumber())}
          </Text>
        </Flex>
      </BorderBox>
      <Flex flexDirection="column" justifyContent="space-between">
        {vaultCollaterals.map((vaultCollateral) => (
          <Box
            key={vaultCollateral.collateralType.tokenAddress}
            display="flex"
            paddingX={4}
            paddingY={2}
            flexDirection="column"
            borderBottom="1px"
            borderColor="gray.900"
            _last={{ borderBottom: 'none' }}
          >
            <Flex color="white" display="flex" gap={1} alignItems="center">
              <Image
                alt="collateral image"
                width="30px"
                height="30px"
                src={vaultCollateral.collateralType.logo}
              />
              <Text fontWeight={700} fontSize="xl">
                {vaultCollateral.collateralType.symbol}
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="400">
                {vaultCollateral.collateralType.price
                  ? formatNumberToUsd(vaultCollateral.collateralType.price.toNumber())
                  : '-'}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Flex flexDirection="column">
                <Text mt={2} fontSize="sm" color="gray.500">
                  Total Value Locked
                </Text>
                <Text fontSize="md" fontWeight={700} color="white">
                  {formatNumber(vaultCollateral.collateral.amount.toNumber())}{' '}
                  {vaultCollateral.collateralType.symbol}
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="400">
                  {formatNumberToUsd(vaultCollateral.collateral.value.toNumber())}
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Text mt={2} fontSize="sm" color="gray.500">
                  Vault Debt
                </Text>
                <Text fontSize="md" fontWeight={700} color="white">
                  {formatNumberToUsd(vaultCollateral.debt.toNumber())}
                </Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Flex>
    </BorderBox>
  );
};
export const CollateralSection = () => {
  const params = useParams();

  const { data: vaultCollaterals } = useVaultsData(
    params.poolId ? parseFloat(params.poolId) : undefined
  );
  const { data: pool } = useGetPoolData(params.poolId);

  return <CollateralSectionUi vaultCollaterals={vaultCollaterals} poolName={pool?.name} />;
};
