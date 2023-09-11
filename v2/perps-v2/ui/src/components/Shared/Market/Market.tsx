import { Box, Fade, Flex, Td, Text } from '@chakra-ui/react';
import { formatNumber } from '@snx-v2/formatters';
import { utils } from 'ethers';
import { CurrencyIcon } from '../../CurrencyIcon';

interface MarketProps {
  asset: string;
  leverage: number | null;
  direction?: 'LONG' | 'SHORT';
  isPosition?: boolean;
}

const replace = ['sETH', 'sBTC'];

export const Market = ({ asset, leverage, direction, isPosition = true }: MarketProps) => {
  const marketName = utils.parseBytes32String(asset);
  const assetDisplayName = replace.includes(marketName) ? marketName.substring(1) : marketName;

  const leverageString = leverage ? `${formatNumber(leverage, { minimumFractionDigits: 2 })}x` : '';
  const isLong = direction === 'LONG';

  return (
    <Td border="none" py={6}>
      <Fade in>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <CurrencyIcon currencyKey={marketName} />
            <Box ml={3}>
              <Text
                fontFamily="heading"
                fontSize="14px"
                lineHeight="20px"
                fontWeight={500}
                color="gray.50"
              >{`${assetDisplayName.toUpperCase()}-PERP`}</Text>
              {Boolean(isPosition && direction) && (
                <Text fontSize="12px" lineHeight="16px" fontFamily="heading" color="gray.500">
                  {leverageString}
                  <Text ml={1} as="span" color={isLong ? 'green.500' : 'red.500'}>
                    {direction}
                  </Text>
                </Text>
              )}
            </Box>
          </Flex>
        </Flex>
      </Fade>
    </Td>
  );
};