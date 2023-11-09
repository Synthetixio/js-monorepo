import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';

interface DepositMarginProps {
  size: number;
}

export const MarginTransfer = ({ size }: DepositMarginProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          {formatNumberToUsd(size)}
        </Text>
      </Fade>
    </Td>
  );
};
