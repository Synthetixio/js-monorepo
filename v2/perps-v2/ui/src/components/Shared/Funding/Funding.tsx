import { Fade, Td } from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';

interface FundingProps {
  amount: number;
  withDollar?: boolean;
}

export const Funding = ({ amount, withDollar = true }: FundingProps) => {
  const isPositive = amount >= 0;

  return (
    <Td
      border="none"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="heading"
      fontWeight={500}
      color={isPositive ? 'green.500' : 'red.500'}
    >
      <Fade in>{withDollar ? formatNumberToUsd(amount) : amount.toFixed(6)}</Fade>
    </Td>
  );
};
