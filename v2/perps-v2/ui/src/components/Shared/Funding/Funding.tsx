import { Fade, Td } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface FundingProps {
  amount: number;
}

export const Funding = ({ amount }: FundingProps) => {
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
      <Fade in>{formatNumberToUsd(amount)}</Fade>
    </Td>
  );
};
