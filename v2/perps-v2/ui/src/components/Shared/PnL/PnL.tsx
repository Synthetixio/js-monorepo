import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

interface PnLProps {
  pnl: number;
}

export const PnL = ({ pnl }: PnLProps) => {
  // 100 * (net value - entry value) / entry value
  // const percentageDiff = Math.abs((100 * (Math.abs(netValue) - Math.abs(entryValue))) / entryValue);
  //TODO figure out pnl percentage

  return (
    <Td border="none">
      <Fade in>
        <Text
          fontFamily="heading"
          fontWeight={500}
          fontSize="14px"
          lineHeight="20px"
          color={pnl >= 0 ? 'green.500' : 'red.500'}
        >
          {`${pnl >= 0 ? '+' : ''}${formatNumberToUsd(pnl)}`}
        </Text>
        {/* <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {pnl >= 0 ? '+' : '-'}
          {percentageDiff.toFixed(2)}%
        </Text> */}
      </Fade>
    </Td>
  );
};
