import { Fade, Td } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface NetValueProps {
  amount: number;
}

export const NetValue = ({ amount }: NetValueProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>{amount ? formatNumberToUsd(amount) : '-'}</Fade>
    </Td>
  );
};
