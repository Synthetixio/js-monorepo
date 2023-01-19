import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { Balance } from '@snx-v3/Balance';
import { NumberInput } from '@snx-v3/NumberInput';
import { Wei } from '@synthetixio/wei';

interface Props {
  collateral: CollateralType;
  onChange: (value: Wei) => void;
  value: Wei;
}

export const Deposit: FC<Props> = ({ collateral, value, onChange }) => {
  const balance = useTokenBalance(collateral.tokenAddress);
  const max = balance.data;

  return (
    <>
      <Heading fontSize="md" mb="1">
        Deposit {collateral.symbol}
      </Heading>
      <Text fontSize="sm" mb="2">
        Provide collateral to improve your C-Ratio. This decreases your risk of liquidation and
        increases the amount of snxUSD you can borrow.
      </Text>

      <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} max={max} />
        </Flex>
        <Flex alignItems="center">
          <Balance
            onMax={onChange}
            balance={balance.data}
            symbol={collateral.symbol}
            address={collateral.tokenAddress}
          />
        </Flex>
      </Box>
    </>
  );
};
