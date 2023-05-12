import { Fade, Td } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface CurrencyProps {
  amount: number | null;
  decimals?: number;
}

export const Currency = ({ amount, decimals = 4 }: CurrencyProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>
        {amount ? formatNumberToUsd(amount, { minimumFractionDigits: decimals }) : '-'}
      </Fade>
    </Td>
  );
};
