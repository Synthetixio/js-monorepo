import { Fade, Td, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { stringToDecimal } from '../../../utils';

interface PnLProps {
  amount: string;
  entryPrice: string;
  marketPrice: number;
  funding: string;
  fees: string;
}

export const PnL = ({ amount, entryPrice, marketPrice, funding, fees = '0' }: PnLProps) => {
  const pnl = stringToDecimal(amount) + stringToDecimal(funding) - stringToDecimal(fees);

  const entry = parseInt(entryPrice) / 1e18;
  const last = marketPrice;

  const percentageDiff = (100 * (last - entry)) / entry;
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
          {pnl >= 0 ? '+' : ''}
          {percentageDiff.toFixed(2)}%
        </Text>
      </Fade>
    </Td>
  );
};
