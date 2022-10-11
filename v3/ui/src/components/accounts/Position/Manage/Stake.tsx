import { Text, Box, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useTokenBalance } from '../../../../hooks/useTokenBalance';
import { CollateralType } from '../../../../utils/types';
import { Balance } from '../../Stake/Balance';
import { NumberInput } from './NumberInput';

interface Props {
  collateral: CollateralType;
  onChange: (value: number) => void;
  value: number;
}

// TODO: This needs to change based on collateral type? At least heading

export const Stake: FC<Props> = ({ collateral, value, onChange }) => {
  const balance = useTokenBalance(collateral.address);
  return (
    <>
      <Heading fontSize="md" mb="1">
        Deposit SNX
      </Heading>
      <Text fontSize="sm" mb="2">
        Provide collateral to improve your C-Ratio. This decreases your risk of liquidation and
        increases the amount of snxUSD you can borrow.
      </Text>

      <Box bg="whiteAlpha.200" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} max={balance.formatedValue} />
        </Flex>
        <Flex alignItems="center">
          <Balance
            onMax={(balance) => onChange(parseFloat(balance) || 0)}
            balance={balance.value}
            decimals={collateral.decimals}
            symbol={collateral.symbol}
            address={collateral.address}
          />
        </Flex>
      </Box>
    </>
  );
};
