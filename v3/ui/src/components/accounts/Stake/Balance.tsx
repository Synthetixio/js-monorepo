import { Badge, Link, Text } from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { FC } from 'react';

interface Props {
  balance: BigNumber;
  decimals: number;
  symbol: string;
  onMax?: (balance: string) => void;
}

export const Balance: FC<Props> = ({ balance, decimals, symbol, onMax }) => {
  return (
    <Text fontSize="xs">
      Balance: {parseFloat(utils.formatUnits(balance, decimals)).toLocaleString()}{' '}
      {symbol.toUpperCase()}
      {balance.eq(0) && (
        <Link>
          <Badge
            as="button"
            ml="2"
            variant="outline"
            colorScheme="blue"
            transform="translateY(-2px)"
          >
            Buy {symbol}
          </Badge>
        </Link>
      )}
      {onMax && !balance.eq(0) && (
        <Badge
          as="button"
          ml="2"
          variant="outline"
          colorScheme="blue"
          transform="translateY(-2px)"
          onClick={(e) => {
            e.preventDefault();
            const balanceValue = utils.formatUnits(balance, decimals);
            onMax(balanceValue);
          }}
        >
          Use Max
        </Badge>
      )}
    </Text>
  );
};
