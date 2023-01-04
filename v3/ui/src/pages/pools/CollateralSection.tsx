import { Box, Spinner, Text, Flex, Button } from '@chakra-ui/react';
import { useVaultCollaterals } from '@snx-v3/useVaultCollaterals';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { wei } from '@synthetixio/wei';
import { formatNumber, formatNumberToUsd } from '@snx-v2/formatters';
import { formatValue } from '../../utils/helpers';

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
}> = ({ vaultCollaterals }) => {
  if (!vaultCollaterals) return <Spinner />;
  const tvl = calculateTvl(vaultCollaterals);
  return (
    <Box mt={4} borderColor="gray.900" borderWidth="1px" borderRadius="base" padding={4}>
      <Text fontWeight={700} fontSize="xl">
        Collateral Types
      </Text>
      <Box
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="base"
        padding={4}
        bg="whiteAlpha.50"
        mb={2}
      >
        <Text fontWeight={700} fontSize="xl" color="gray.500">
          TOTAL POOL TVL
        </Text>
        <Text fontWeight={700} fontSize="2xl" color="white">
          {formatNumberToUsd(tvl.value.toNumber())}
        </Text>
      </Box>
      <Flex>
        {vaultCollaterals.map((vaultCollateral) => (
          <Flex
            key={vaultCollateral.collateralType.tokenAddress}
            bg="whiteAlpha.50"
            borderColor="gray.900"
            borderWidth="1px"
            borderRadius="base"
            paddingX={4}
            paddingY={2}
            width="50%"
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
                ? formatNumberToUsd(formatValue(vaultCollateral.collateralType.price))
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
            <Text mt={2} fontSize="sm" fontWeight="700" color="gray.500">
              MY TOTAL
            </Text>
            <Text fontSize="xl" fontWeight={700} color="white">
              TODO
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              TODO
            </Text>
            <Button mt={1}>Deposit</Button>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
export const CollateralSection = () => {
  const { id } = useParams();
  const { data: vaultCollaterals } = useVaultCollaterals(id ? parseFloat(id) : undefined);
  return <CollateralSectionUi vaultCollaterals={vaultCollaterals} />;
};
