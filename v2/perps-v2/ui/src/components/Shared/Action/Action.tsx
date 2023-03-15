import { Fade, Td } from '@chakra-ui/react';
import { stringToDecimal, numberWithCommas } from '../../../utils';

interface ActionProps {
  amount: string;
}

export const Action = ({ label, txHash, timeStamp }: ActionProps) => {
  return (
    <Td border="none" fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
      <Fade in>${numberWithCommas(stringToDecimal(amount).toFixed(2))}</Fade>
    </Td>
  );
};
