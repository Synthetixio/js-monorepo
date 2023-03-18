import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface DepositMarginProps {
  size: string;
}

export const MarginTransfer = ({ size }: DepositMarginProps) => {
  const calculatedSize = Math.abs(parseFloat(size) / 1e18);
  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          {formatNumberToUsd(calculatedSize)}
        </Text>
      </Fade>
    </Td>
  );
};
