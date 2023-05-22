import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import { expo } from '../../../utils';

interface DailyVolumeChange {
  volume: number;
  percentage: number;
  decimals?: number;
}

export const DailyVolumeChange = ({ volume, percentage, decimals = 2 }: DailyVolumeChange) => {
  const isPositive = percentage >= 0;
  const displayNumber =
    percentage > 1000
      ? `${expo(`${percentage * 100}`, 2)}%`
      : formatPercent(percentage, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
          {formatNumberToUsd(volume, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
        </Text>
        <Text
          fontFamily="heading"
          fontWeight={400}
          fontSize="12px"
          lineHeight="26px"
          color="gray.500"
        >
          {isPositive ? '+' : ''}
          {displayNumber}
        </Text>
      </Fade>
    </Td>
  );
};
