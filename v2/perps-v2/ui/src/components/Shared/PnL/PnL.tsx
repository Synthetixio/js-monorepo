import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { stringToDecimal } from '../../../utils';

interface PnLProps {
  amount: string;
  funding: string;
  fees: string;
  netValue: number;
  entryValue: number;
}

export const PnL = ({ amount, funding, fees = '0', netValue, entryValue }: PnLProps) => {
  const pnl = stringToDecimal(amount) + stringToDecimal(funding) - stringToDecimal(fees);

  // 100 * (net value - entry value) / entry value
  const percentageDiff = Math.abs((100 * (netValue - entryValue)) / entryValue);

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
        <Text color="gray.500" fontSize="12px" lineHeight="16px" fontFamily="heading">
          {pnl >= 0 ? '+' : '-'}
          {percentageDiff.toFixed(2)}%
        </Text>
      </Fade>
    </Td>
  );
};
