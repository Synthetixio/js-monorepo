import { Fade, Td } from '@chakra-ui/react';
import { formatNumberToCurrencyBasedOnSize } from '@snx-v2/formatters';

interface CurrencyProps {
  amount: number | null;
  decimals?: number;
}

export const Currency = ({ amount }: CurrencyProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>{amount ? formatNumberToCurrencyBasedOnSize(amount) : '-'}</Fade>
    </Td>
  );
};
