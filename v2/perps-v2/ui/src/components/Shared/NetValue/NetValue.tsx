import { Fade, Td } from '@chakra-ui/react';
import { numberWithCommas } from '../../../utils';

interface NetValueProps {
  amount: string;
}

export const NetValue = ({ amount }: NetValueProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>{amount ? `$${numberWithCommas(amount)}` : '-'}</Fade>
    </Td>
  );
};
