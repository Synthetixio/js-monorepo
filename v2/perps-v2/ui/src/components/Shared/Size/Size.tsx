import { Fade, Td, Text } from '@chakra-ui/react';
import { numberWithCommas } from '../../../utils';

interface SizeProps {
  size: string;
  lastPrice: string | null;
}

export const Size = ({ size, lastPrice }: SizeProps) => {
  const calculatedSize = Math.abs(parseInt(size) / 1e18);
  const total = lastPrice ? (calculatedSize * (parseInt(lastPrice) / 1e18)).toFixed(2) : '0';

  return (
    <Td border="none">
      <Fade in>
        <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
          ${numberWithCommas(total)}
        </Text>
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {calculatedSize.toFixed(4)}
        </Text>
      </Fade>
    </Td>
  );
};
