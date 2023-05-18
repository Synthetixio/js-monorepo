import { Fade, Td } from '@chakra-ui/react';
import { formatPercent } from '@snx-v2/formatters';
import { expo } from '../../../utils';

interface PercentageChangeProps {
  amount: number;
}

export const PercentageChange = ({ amount }: PercentageChangeProps) => {
  const isPositive = amount >= 0;
  const displayNumber =
    amount > 1000
      ? `${expo(`${amount * 100}`, 2)}%`
      : formatPercent(amount, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Td
      border="none"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="heading"
      fontWeight={500}
      color={isPositive ? 'green.500' : 'red.500'}
    >
      <Fade in>
        {isPositive ? '+' : ''}
        {displayNumber}
      </Fade>
    </Td>
  );
};
