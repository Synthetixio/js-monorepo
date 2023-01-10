import { Text, Box, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from './NumberInput';

interface Props {
  collateral: CollateralType;
  onChange: (value: number) => void;
  value: number;
}

// TODO: This needs to change based on collateral type? At least heading

export const Deposit: FC<Props> = ({ collateral, value, onChange }) => {
  const balance = useTokenBalance(collateral.tokenAddress);

  return (
    <>
      <Heading fontSize="md" mb="1">
        Deposit {collateral.symbol.toUpperCase()}
      </Heading>
      <Text fontSize="sm" mb="2">
        Provide collateral to improve your C-Ratio. This decreases your risk of liquidation and
        increases the amount of snxUSD you can borrow.
      </Text>

      <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} max={balance.value.toNumber()} />
        </Flex>
        <Flex alignItems="center">
          <Balance
            onMax={(balance) => onChange(parseFloat(balance) || 0)}
            balance={balance.value}
            symbol={collateral.symbol === 'WETH' ? 'ETH' : collateral.symbol}
            address={collateral.tokenAddress}
          />
        </Flex>
      </Box>
    </>
  );
};
