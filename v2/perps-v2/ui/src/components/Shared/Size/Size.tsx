import { Td, Text } from '@chakra-ui/react';
import { numberWithCommas } from '../../../utils';

interface SizeProps {
  size: string;
  lastPrice: string;
}

export const Size = ({ size, lastPrice }: SizeProps) => {
  const calculatedSize = parseInt(size) / 1e18;
  const total = (calculatedSize * (parseInt(lastPrice) / 1e18)).toFixed(2);
  return (
    <Td border="none">
      <Text fontSize="14px" lineHeight="20px" fontFamily="heading" fontWeight={500}>
        {calculatedSize.toFixed(2)}
      </Text>
      <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
        ${numberWithCommas(total)}
      </Text>
    </Td>
  );
};
