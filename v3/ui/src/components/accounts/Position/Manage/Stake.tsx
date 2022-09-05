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

export const Stake: FC<Props> = ({ collateral, value, onChange }) => {
  const balance = useTokenBalance(collateral.address);
  return (
    <Box mb="4">
      <Heading fontSize="md" mb="1">
        Stake SNX
      </Heading>
      <Text fontSize="sm" mb="1">
        Provide collateral to improve your C-ratio. This decreases your risk of liquidation and
        increases the amount of snxUSD you can borrow.
      </Text>

      <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
        <Flex mb="3">
          <NumberInput value={value} onChange={onChange} max={balance.formatedValue} />
        </Flex>
        <Flex alignItems="center">
          <Balance
            onMax={(balance) => onChange(parseFloat(balance) || 0)}
            balance={balance.value}
            decimals={collateral.decimals}
            symbol={collateral.symbol}
          />
        </Flex>
      </Box>
    </Box>
  );
};
