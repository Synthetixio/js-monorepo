import { Td, Text } from '@chakra-ui/react';
import { stringToDecimal, numberWithCommas } from '../../../utils';

interface MarkPriceProps {
  entryPrice: string;
  lastPrice: string;
}

export const MarkPrice = ({ entryPrice, lastPrice }: MarkPriceProps) => {
  return (
    <Td border="none">
      <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
        ${numberWithCommas(stringToDecimal(lastPrice).toFixed(2))}
      </Text>
      <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
        ${numberWithCommas(stringToDecimal(entryPrice).toFixed(2))}
      </Text>
    </Td>
  );
};
