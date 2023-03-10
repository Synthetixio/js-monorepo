import { Td } from '@chakra-ui/react';
import { stringToDecimal, numberWithCommas } from '../../../utils';

interface CurrencyProps {
  amount: string;
}

export const Currency = ({ amount }: CurrencyProps) => {
  return <Td border="none">${numberWithCommas(stringToDecimal(amount).toFixed(2))}</Td>;
};
