import { Td, Text } from '@chakra-ui/react';
import { stringToDecimal, numberWithCommas } from '../../../utils';

interface PnLProps {
  amount: string;
}

export const PnL = ({ amount }: PnLProps) => {
  const pnl = stringToDecimal(amount);

  return (
    <Td border="none">
      <Text
        fontFamily="heading"
        fontWeight={500}
        fontSize="14px"
        lineHeight="20px"
        color={pnl >= 0 ? 'green.500' : 'red.500'}
      >
        ${numberWithCommas(stringToDecimal(amount).toFixed(2))}
      </Text>
      <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
        +23%
      </Text>
    </Td>
  );
};
