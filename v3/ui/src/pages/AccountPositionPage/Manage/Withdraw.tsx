import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from './NumberInput';
import { Wei, wei } from '@synthetixio/wei';

export function Withdraw({
  collateral,
  collateralAmount,
  value,
  onChange,
}: {
  collateral: CollateralType;
  onChange: (value: number) => void;
  value: number;
  collateralAmount: Wei;
}) {
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
        <form>
          <Flex mb="3">
            <NumberInput value={value} onChange={onChange} max={collateralAmount.toNumber()} />
          </Flex>
        </form>
        <Flex alignItems="center">
          <Balance
            onMax={(balance) => onChange(parseFloat(balance) || 0)}
            balance={wei(collateralAmount)}
            symbol={collateral.symbol}
            address={collateral.tokenAddress}
          />
        </Flex>
      </Box>
    </>
  );
}
