import { Box, Divider, Flex, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { useVaultsData, VaultsDataType } from '@snx-v3/useVaultsData';
import React, { FC } from 'react';
import { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { useParams } from '@snx-v3/useParams';
import { BorderBox } from '@snx-v3/BorderBox';
import { InfoIcon } from '@chakra-ui/icons';
import { usePoolData } from '@snx-v3/usePoolData';
import { CollateralIcon } from '@snx-v3/icons';

export const calculateVaultTotals = (vaultsData: VaultsDataType) => {
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
  vaultsData: VaultsDataType;
  poolName?: string;
}> = ({ vaultsData, poolName }) => {
  const { collateral: totalCollateral, debt: totalDebt } = calculateVaultTotals(vaultsData);

  return (
    <BorderBox padding={4} flexDirection="column" data-testid="pool collateral types">
      <Text fontWeight={700} fontSize="xl">
        Collateral Types
      </Text>
      <Text color="gray.400" fontSize="sm">
        {poolName}
      </Text>
      <BorderBox padding={4} mt={4} flexDirection="column">
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
            Total TVL
            <Tooltip label="Total TVL for Pool">
              <InfoIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          {vaultsData === undefined ? (
            <Skeleton w={16} h={6} />
          ) : (
            <Text fontWeight={700} fontSize="xl" color="white" data-testid="pool tvl">
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
            Total Debt
            <Tooltip label="Total Debt for Pool">
              <InfoIcon w="10px" h="10px" />
            </Tooltip>
          </Text>
          {vaultsData === undefined ? (
            <Skeleton mt={1} w={16} h={6} />
          ) : (
            <Text fontWeight={700} fontSize="xl" color="white" data-testid="pool total debt">
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
          <>
            <Divider mt={6} mb={4} />
            {vaultsData.map((vaultCollateral) => {
              return (
                <React.Fragment key={vaultCollateral.collateralType.tokenAddress}>
                  <Box
                    display="flex"
                    px={4}
                    flexDirection="column"
                    borderBottom="1px"
                    borderColor="gray.900"
                    _last={{ borderBottom: 'none' }}
                    data-testid="pool collateral"
                    data-collateral={vaultCollateral.collateralType.symbol}
                  >
                    <Flex color="white" display="flex" gap={1} alignItems="center">
                      <CollateralIcon
                        width="30px"
                        height="30px"
                        fill="#0B0B22"
                        color="#00D1FF"
                        symbol={vaultCollateral.collateralType.symbol}
                      />
                      <Text fontWeight={700} fontSize="xl">
                        {vaultCollateral.collateralType.displaySymbol}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="400"
                        data-testid="collateral price"
                      >
                        {vaultCollateral.collateralType.price
                          ? formatNumberToUsd(vaultCollateral.collateralType.price.toNumber())
                          : '-'}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Flex flexBasis="50%" flexDirection="column">
                        <Text mt={2} fontSize="sm" color="gray.500" textTransform="uppercase">
                          Total Value Locked
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight={700}
                          color="white"
                          data-testid="collateral amount"
                        >
                          {formatNumber(vaultCollateral.collateral.amount.toNumber())}{' '}
                          {vaultCollateral.collateralType.displaySymbol}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          fontWeight="400"
                          data-testid="collateral value"
                        >
                          {formatNumberToUsd(vaultCollateral.collateral.value.toNumber())}
                        </Text>
                      </Flex>
                      <Flex flexBasis="30%" flexDirection="column">
                        <Text mt={2} fontSize="sm" color="gray.500" textTransform="uppercase">
                          Vault Debt
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight={700}
                          color="white"
                          data-testid="collateral debt"
                        >
                          {formatNumberToUsd(vaultCollateral.debt.toNumber())}
                        </Text>
                      </Flex>
                      <Flex flexBasis="20%" flexDirection="column">
                        <Text mt={2} fontSize="sm" color="gray.500" textTransform="uppercase">
                          C-Ratio
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight={700}
                          color="white"
                          data-testid="collateral cratio"
                        >
                          {vaultCollateral.debt.eq(0)
                            ? '-'
                            : formatPercent(
                                vaultCollateral.collateral.value
                                  .div(vaultCollateral.debt)
                                  .toNumber(),
                                { maximumFractionDigits: 0 }
                              )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Divider my={4} />
                </React.Fragment>
              );
            })}
          </>
        )}
      </Flex>
    </BorderBox>
  );
};
export const CollateralSection = () => {
  const params = useParams();

  const { data: vaultsData } = useVaultsData(params.poolId ? parseFloat(params.poolId) : undefined);
  const { data: poolData } = usePoolData(params.poolId);

  return <CollateralSectionUi vaultsData={vaultsData} poolName={poolData?.name} />;
};
