import { Fade, Td } from '@chakra-ui/react';
import { stringToDecimal, numberWithCommas } from '../../../utils';

interface FundingProps {
  amount: string;
}

export const Funding = ({ amount }: FundingProps) => {
  const calculatedAmount = stringToDecimal(amount);
  const isPositive = calculatedAmount >= 0;
  const displayString = calculatedAmount.toFixed(2).replace('-', '');
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
        {`${isPositive ? '' : '-'}`}${numberWithCommas(displayString)}
      </Fade>
    </Td>
  );
};
