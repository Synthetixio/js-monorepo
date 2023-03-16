import { Fade, Td, Text } from '@chakra-ui/react';
import { numberWithCommas } from '../../../utils';

interface DepositMarginProps {
  size: string;
}

export const MarginTransfer = ({ size }: DepositMarginProps) => {
  const calculatedSize = Math.abs(parseFloat(size) / 1e18);

  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          ${numberWithCommas(calculatedSize.toString(), 2)}
        </Text>
      </Fade>
    </Td>
  );
};
