import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { formatUnits } from 'ethers/lib/utils';

interface DepositMarginProps {
  size: string;
}

export const MarginTransfer = ({ size }: DepositMarginProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          {formatNumberToUsd(formatUnits(size, 18))}
        </Text>
      </Fade>
    </Td>
  );
};
