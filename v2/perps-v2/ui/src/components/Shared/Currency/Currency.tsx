import { Fade, Td } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { stringToDecimal } from '../../../utils';

interface CurrencyProps {
  amount: string | null;
}

export const Currency = ({ amount }: CurrencyProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>{amount ? `${formatNumberToUsd(stringToDecimal(amount))}` : '-'}</Fade>
    </Td>
  );
};
