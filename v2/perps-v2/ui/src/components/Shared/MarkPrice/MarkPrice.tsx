import { Fade, Td, Text } from '@chakra-ui/react';
import { stringToDecimal, formatNumberToUsd } from '../../../utils';

interface MarkPriceProps {
  markPrice: string; // After skew premium is applied
  indexPrice: string;
}

export const MarkPrice = ({ markPrice, indexPrice }: MarkPriceProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
          {formatNumberToUsd(stringToDecimal(markPrice))}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {formatNumberToUsd(stringToDecimal(indexPrice))}
        </Text>
      </Fade>
    </Td>
  );
};
