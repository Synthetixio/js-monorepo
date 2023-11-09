import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';

interface OpenInterestProps {
  long: number;
  short: number;
  price: number;
  decimals?: number;
}

export const OpenInterest = ({ long, short, price, decimals = 2 }: OpenInterestProps) => {
  return (
    <Td border="none">
      <Fade in>
        <Text
          fontFamily="heading"
          fontWeight={500}
          fontSize="14px"
          lineHeight="20px"
          color="gray.50"
        >
          {formatNumberToUsd(long * price, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </Text>
        <Text
          fontFamily="heading"
          fontWeight={500}
          fontSize="14px"
          lineHeight="20px"
          color="gray.50"
        >
          {formatNumberToUsd(short * price, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </Text>
      </Fade>
    </Td>
  );
};
