import { Badge, Link, Text } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { FC, useMemo } from 'react';
import { useProvider } from 'wagmi';
import { Amount } from '../../shared/Amount/Amount';
import { formatValue } from '@snx-v3/format';

interface Props {
  balance: BigNumber;
  symbol: string;
  address: string;
  onMax?: (balance: string) => void;
}

export const Balance: FC<Props> = ({ balance, symbol, address, onMax }) => {
  const provider = useProvider();

  const buyAssetLink = useMemo(() => {
    if (provider.network.chainId === 1) {
      return `https://app.1inch.io/#/1/unified/swap/ETH/${symbol.toUpperCase()}`;
    } else if (provider.network.chainId === 10) {
      return `https://app.1inch.io/#/10/unified/swap/ETH/${symbol.toUpperCase()}`;
    } else if (provider.network.chainId === 5) {
      return `https://goerli.etherscan.io/address/${address}#writeContract`;
    } else if (provider.network.chainId === 420) {
      return `https://goerli-optimism.etherscan.io/address/${address}#writeContract`;
    }
  }, [address, provider.network.chainId, symbol]);

  const formattedBalance = formatValue(balance);
  return (
    <Text display="flex" gap={2} alignItems="center" fontSize="xs">
      Balance:
      <Amount value={formattedBalance} suffix={` ${symbol.toUpperCase()}`} />
      {balance.eq(0) && buyAssetLink && (
        <Link href={buyAssetLink} isExternal>
          <Badge ml="1" variant="outline" transform="translateY(-1px)">
            Buy {symbol}
          </Badge>
        </Link>
      )}
      {onMax && !balance.eq(0) && (
        <Badge
          as="button"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            onMax(formattedBalance);
          }}
        >
          Use Max
        </Badge>
      )}
    </Text>
  );
};
