import { Badge, Link, Text } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';
import { useNetwork } from '@snx-v3/useBlockchain';
import { Amount } from '@snx-v3/Amount';
import { formatValue } from '@snx-v3/format';

export function Balance({
  balance,
  symbol,
  address,
  onMax,
}: {
  balance: BigNumber;
  symbol: string;
  address: string;
  onMax?: (balance: string) => void;
}) {
  const network = useNetwork();
  const buyAssetLink = useMemo(() => {
    switch (network.name) {
      case 'goerli':
        return `https://goerli.etherscan.io/address/${address}#writeContract`;
      case 'optimism-goerli':
        return `https://goerli-optimism.etherscan.io/address/${address}#writeContract`;
      case 'optimism':
        return `https://app.1inch.io/#/10/unified/swap/ETH/${symbol.toUpperCase()}`;
      default:
        return `https://app.1inch.io/#/1/unified/swap/ETH/${symbol.toUpperCase()}`;
    }
  }, [address, network.name, symbol]);

  return (
    <Text display="flex" gap={2} alignItems="center" fontSize="xs">
      Balance:
      <Amount value={balance} suffix={` ${symbol.toUpperCase()}`} />
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
            onMax(formatValue(balance).toString());
          }}
        >
          Use Max
        </Badge>
      )}
    </Text>
  );
}
