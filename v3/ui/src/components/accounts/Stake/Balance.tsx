import { Badge, Link, Text } from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import { FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { chainIdState } from '../../../utils/state';

interface Props {
  balance: BigNumber;
  decimals: number;
  symbol: string;
  address: string;
  onMax?: (balance: string) => void;
}

export const Balance: FC<Props> = ({ balance, decimals, symbol, address, onMax }) => {
  const [localChainId] = useRecoilState(chainIdState);

  const buyAssetLink = useMemo(() => {
    if (localChainId === 10) {
      return `https://app.1inch.io/#/10/unified/swap/ETH/${symbol.toUpperCase()}`;
    } else if (localChainId === 420) {
      return `https://goerli.etherscan.io/address/${address}`;
    }
  }, [address, localChainId, symbol]);

  return (
    <Text fontSize="xs">
      Balance: {parseFloat(utils.formatUnits(balance, decimals)).toLocaleString()}{' '}
      {symbol.toUpperCase()}
      {balance.eq(0) && buyAssetLink && (
        <Badge as="button" ml="2" variant="outline">
          <Link href={buyAssetLink} target="_blank">
            Buy {symbol}
          </Link>
        </Badge>
      )}
      {onMax && !balance.eq(0) && (
        <Badge
          as="button"
          ml="2"
          variant="outline"
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
