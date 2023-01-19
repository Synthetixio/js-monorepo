import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from '@snx-v3/NumberInput';
import { Wei } from '@synthetixio/wei';

export function Withdraw({
  collateral,
  collateralAmount,
  value,
  onChange,
}: {
  collateral: CollateralType;
  onChange: (value: Wei) => void;
  value: Wei;
  collateralAmount: Wei;
}) {
  const max = collateralAmount;

  return (
    <>
      <Heading fontSize="md" mb="1">
        Withdraw {collateral.symbol}
      </Heading>
      <Text fontSize="sm" mb="2">
        Retrieve your collateral from the protocol. This decreases your C-Ratio and increases your
        risk of liquidation.
      </Text>

      <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} max={max} />
        </Flex>
        <Flex alignItems="center">
          <Balance
            onMax={onChange}
            balance={collateralAmount}
            symbol={collateral.symbol}
            address={collateral.tokenAddress}
          />
        </Flex>
      </Box>
    </>
  );
}
