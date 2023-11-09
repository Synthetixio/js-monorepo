import { Fade, Flex, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';
import { WreckedIcon } from '../../Icons';

interface EntryLiquidatedProps {
  entry: number;
  exit: number;
  isLiquidated: boolean;
  decimals?: number;
}

export const EntryLiquidated = ({
  entry,
  exit,
  isLiquidated,
  decimals = 2,
}: EntryLiquidatedProps) => {
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
        <Flex flexDirection="row" alignItems="center" mt={isLiquidated ? -2 : 0}>
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
          {isLiquidated && <WreckedIcon ml={2} width="16px" />}
        </Flex>
      </Fade>
    </Td>
  );
};
