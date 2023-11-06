import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToCurrencyBasedOnSize } from '@synthetixio/formatters';

interface MarkPriceProps {
  indexPrice: number;
  markPrice: number;
}

export const MarkPrice = ({ markPrice, indexPrice }: MarkPriceProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
          {formatNumberToCurrencyBasedOnSize(markPrice)}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {formatNumberToCurrencyBasedOnSize(indexPrice)}
        </Text>
      </Fade>
    </Td>
  );
};
