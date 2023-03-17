import { Fade, Td, Text } from '@chakra-ui/react';
import { stringToDecimal, formatNumberToUsd } from '../../../utils';

interface MarkPriceProps {
  indexPrice: string;
  skew: string;
  skewScale: string;
}

export const MarkPrice = ({ indexPrice, skew, skewScale }: MarkPriceProps) => {
  const markPrice =
    (parseInt(indexPrice) / 1e18) * (1 + parseInt(skew) / 1e18 / parseInt(skewScale) / 1e18);

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
