import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface MarkPriceProps {
  indexPrice: number;
  markPrice: number;
  decimals?: number;
}

export const MarkPrice = ({ markPrice, indexPrice, decimals = 4 }: MarkPriceProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
          {formatNumberToUsd(markPrice, { minimumFractionDigits: decimals })}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {formatNumberToUsd(indexPrice, { minimumFractionDigits: decimals })}
        </Text>
      </Fade>
    </Td>
  );
};
