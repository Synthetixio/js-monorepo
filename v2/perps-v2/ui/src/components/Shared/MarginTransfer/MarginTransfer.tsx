import { Fade, Td, Text } from '@chakra-ui/react';
import { numberWithCommas } from '../../../utils';

interface DepositMarginProps {
  size: string;
}

export const MarginTransfer = ({ size }: DepositMarginProps) => {
  const calculatedSize = Math.abs(parseInt(size) / 1e18);

  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          {numberWithCommas(calculatedSize.toString(), 2)} sUSD
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          ${numberWithCommas(calculatedSize.toString(), 2)}
        </Text>
      </Fade>
    </Td>
  );
};
