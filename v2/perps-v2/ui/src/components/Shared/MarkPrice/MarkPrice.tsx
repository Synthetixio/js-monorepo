import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { stringToDecimal } from '../../../utils';

interface MarkPriceProps {
  indexPrice: string;
  skew: string;
  skewScale: string;
}

export const MarkPrice = ({ indexPrice, skew, skewScale }: MarkPriceProps) => {
  const skewRatio = parseInt(skew) / parseInt(skewScale);
  const markPrice = (parseInt(indexPrice) / 1e18) * (1 + skewRatio);

  return (
    <Td border="none">
      <Fade in>
        <Text fontFamily="heading" fontWeight={500} fontSize="14px" lineHeight="20px">
          {formatNumberToUsd(markPrice)}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {formatNumberToUsd(stringToDecimal(indexPrice))}
        </Text>
      </Fade>
    </Td>
  );
};
