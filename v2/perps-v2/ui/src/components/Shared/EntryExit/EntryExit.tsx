import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';

interface EntryExitProps {
  entry: number;
  exit: number;
  decimals?: number;
}

export const EntryExit = ({ entry, exit, decimals = 2 }: EntryExitProps) => {
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
          {formatNumberToUsd(entry, {
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
          {formatNumberToUsd(exit, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </Text>
      </Fade>
    </Td>
  );
};
