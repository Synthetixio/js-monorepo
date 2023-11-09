import { Box, Fade, Flex, Link, Td, Text } from '@chakra-ui/react';
import { formatNumber } from '@synthetixio/formatters';
import { utils } from 'ethers';
import { CurrencyIcon } from '../../CurrencyIcon';
import { KwentaIcon, PolynomialIcon, RightUpIcon } from '../../Icons';
import { optimisticEthercanTx } from '../../../utils';

interface MarketProps {
  asset: string;
  leverage: number | null;
  direction?: 'LONG' | 'SHORT';
  isPosition?: boolean;
  protocol?: string;
  txHash?: string;
}

const replace = ['sETH', 'sBTC'];

export const Market = ({
  asset,
  leverage,
  direction,
  isPosition = true,
  protocol,
  txHash,
}: MarketProps) => {
  const marketName = utils.parseBytes32String(asset);
  const assetDisplayName = replace.includes(marketName) ? marketName.substring(1) : marketName;

  const leverageString = leverage ? `${formatNumber(leverage, { minimumFractionDigits: 2 })}x` : '';
  const isLong = direction === 'LONG';

  return (
    <Td border="none">
      <Fade in>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Box style={{ position: 'relative', width: '30px' }} mr={2}>
              <CurrencyIcon currencyKey={marketName} />
              <Box style={{ position: 'absolute', bottom: '-15px', right: '-15px' }}>
                {protocol === 'kwenta' && <KwentaIcon />}
                {protocol === 'polynomial' && <PolynomialIcon />}
              </Box>
            </Box>

            <Box ml={3}>
              <Text
                fontFamily="heading"
                fontSize="14px"
                lineHeight="20px"
                fontWeight={500}
                color="gray.50"
              >{`${assetDisplayName.toUpperCase()}-PERP`}</Text>
              {Boolean(isPosition && direction) && (
                <Flex alignItems="center" gap={1}>
                  {leverageString && (
                    <Text fontSize="12px" lineHeight="16px" fontFamily="heading" color="gray.500">
                      {leverageString}
                    </Text>
                  )}
                  <Text
                    as="span"
                    fontSize="12px"
                    lineHeight="16px"
                    fontFamily="heading"
                    color={isLong ? 'green.500' : 'red.500'}
                  >
                    {direction}
                  </Text>
                  {txHash && (
                    <Link href={optimisticEthercanTx(txHash)} target="_blank" rel="noopener">
                      <RightUpIcon mb={0.5} />
                    </Link>
                  )}
                </Flex>
              )}
            </Box>
          </Flex>
        </Flex>
      </Fade>
    </Td>
  );
};
