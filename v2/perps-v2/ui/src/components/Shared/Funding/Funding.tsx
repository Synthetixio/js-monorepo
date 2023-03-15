import { Fade, Td } from '@chakra-ui/react';
import { stringToDecimal, numberWithCommas } from '../../../utils';

interface FundingProps {
  amount: string;
}

export const Funding = ({ amount }: FundingProps) => {
  const calculatedAmount = stringToDecimal(amount);
  return (
    <Td
      border="none"
      fontSize="14px"
      lineHeight="20px"
      fontFamily="heading"
      fontWeight={500}
      color={calculatedAmount >= 0 ? 'green.500' : 'red.500'}
    >
      <Fade in>${numberWithCommas(calculatedAmount.toFixed(2))}</Fade>
    </Td>
  );
};
