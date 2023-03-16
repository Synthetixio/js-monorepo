import { Fade, Td, Text } from '@chakra-ui/react';
import { stringToDecimal, formatNumberToUsd } from '../../../utils';

interface MarkPriceProps {
  entryPrice: string;
  lastPrice: string;
}

export const MarkPrice = ({ entryPrice, lastPrice }: MarkPriceProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
          {formatNumberToUsd(stringToDecimal(lastPrice))}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {formatNumberToUsd(stringToDecimal(entryPrice))}
        </Text>
      </Fade>
    </Td>
  );
};
