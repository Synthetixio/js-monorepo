import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { stringToDecimal } from '../../../utils';

interface MarkPriceProps {
  lastPrice: string;
  markPrice: number;
}

export const MarkPrice = ({ markPrice, lastPrice }: MarkPriceProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
          {formatNumberToUsd(markPrice)}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {formatNumberToUsd(stringToDecimal(lastPrice))}
        </Text>
      </Fade>
    </Td>
  );
};
