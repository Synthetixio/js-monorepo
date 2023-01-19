import { Text, Flex, Image, Tooltip, Box, Skeleton } from '@chakra-ui/react';
import { useVaultsData } from '@snx-v3/useVaultsData';
import { FC } from 'react';
import { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';
import { InfoIcon } from '@chakra-ui/icons';
import { useGetPoolData } from '../../hooks/useGetPoolData';

export const calculateVaultTotals = (vaultsData: ReturnType<typeof useVaultsData>['data']) => {
  const zeroValues = { collateral: { value: wei(0), amount: wei(0) }, debt: wei(0) };
  if (!vaultsData) return zeroValues;
  return vaultsData.reduce((acc, { collateral, debt }) => {
    acc.collateral = {
      value: acc.collateral.value.add(collateral.value),
      amount: acc.collateral.amount.add(collateral.amount),
    };
    acc.debt = acc.debt.add(debt);
    return acc;
  }, zeroValues);
};
export const CollateralSectionUi: FC<{
  vaultsData: ReturnType<typeof useVaultsData>['data'];
  poolName?: string;
}> = ({ vaultsData, poolName }) => {
  const { collateral: totalCollateral, debt: totalDebt } = calculateVaultTotals(vaultsData);
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
          {vaultsData === undefined ? (
            <Skeleton w={16} h={6} />
          ) : (
            <Text fontWeight={700} fontSize="xl" color="white">
              {formatNumberToUsd(totalCollateral.value.toNumber())}
            </Text>
          )}
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
          {vaultsData === undefined ? (
            <Skeleton mt={1} w={16} h={6} />
          ) : (
            <Text fontWeight={700} fontSize="xl" color="white">
              {formatNumberToUsd(totalDebt.toNumber())}
            </Text>
          )}
        </Flex>
      </BorderBox>
      <Flex flexDirection="column" justifyContent="space-between">
        {!vaultsData ? (
          <Box>
            <Skeleton mt={4} w="full" height={24} />
            <Skeleton mt={2} w="full" height={24} />
          </Box>
        ) : (
          vaultsData.map((vaultCollateral) => {
            return (
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
                    {vaultCollateral.collateralType.displaySymbol}
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="400">
                    {vaultCollateral.collateralType.price
                      ? formatNumberToUsd(vaultCollateral.collateralType.price.toNumber())
                      : '-'}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Flex flexBasis="50%" flexDirection="column">
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Total Value Locked
                    </Text>
                    <Text fontSize="md" fontWeight={700} color="white">
                      {formatNumber(vaultCollateral.collateral.amount.toNumber())}{' '}
                      {vaultCollateral.collateralType.displaySymbol}
                    </Text>
                    <Text fontSize="sm" color="gray.500" fontWeight="400">
                      {formatNumberToUsd(vaultCollateral.collateral.value.toNumber())}
                    </Text>
                  </Flex>
                  <Flex flexBasis="30%" flexDirection="column">
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Vault Debt
                    </Text>
                    <Text fontSize="md" fontWeight={700} color="white">
                      {formatNumberToUsd(vaultCollateral.debt.toNumber())}
                    </Text>
                  </Flex>
                  <Flex flexBasis="20%" flexDirection="column">
                    <Text mt={2} fontSize="sm" color="gray.500">
                      C-Ratio
                    </Text>
                    <Text fontSize="md" fontWeight={700} color="white">
                      {vaultCollateral.debt.eq(0)
                        ? '-'
                        : formatPercent(
                            vaultCollateral.collateral.value.div(vaultCollateral.debt).toNumber(),
                            { maximumFractionDigits: 0 }
                          )}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            );
          })
        )}
      </Flex>
    </BorderBox>
  );
};
export const CollateralSection = () => {
  const params = useParams();

  const { data: vaultsData } = useVaultsData(params.poolId ? parseFloat(params.poolId) : undefined);
  const { data: pool } = useGetPoolData(params.poolId);

  return <CollateralSectionUi vaultsData={vaultsData} poolName={pool?.name} />;
};
