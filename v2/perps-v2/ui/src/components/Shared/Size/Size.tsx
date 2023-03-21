import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface SizeProps {
  size: string;
  marketPrice: number | null;
}

export const Size = ({ size, marketPrice }: SizeProps) => {
  const calculatedSize = Math.abs(parseInt(size) / 1e18);
  const total = marketPrice ? calculatedSize * marketPrice : 0;

  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          {formatNumberToUsd(total)}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {calculatedSize.toFixed(4)}
        </Text>
      </Fade>
    </Td>
  );
};
