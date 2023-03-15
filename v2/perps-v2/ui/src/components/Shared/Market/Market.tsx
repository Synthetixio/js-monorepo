import { Box, Fade, Flex, Td, Text } from '@chakra-ui/react';
import { utils } from 'ethers';
import { CurrencyIcon } from '../../CurrencyIcon';

interface MarketProps {
  asset: string;
  leverage: string;
  long: boolean;
}

const replace = ['sETH', 'sBTC'];

export const Market = ({ asset, leverage, long }: MarketProps) => {
  const marketName = utils.parseBytes32String(asset);
  const assetDisplayName = replace.includes(marketName) ? marketName.substring(1) : marketName;

  return (
    <Fade in>
      <Flex as={Td} border="none" alignItems="center">
        <Flex alignItems="center">
          <CurrencyIcon width="30px" height="30px" currencyKey={marketName} />
          <Box ml={3}>
            <Text
              fontFamily="heading"
              fontSize="14px"
              lineHeight="20px"
              fontWeight={500}
              color="gray.50"
            >{`${assetDisplayName.toUpperCase()}-PERP`}</Text>
            <Text fontSize="12px" lineHeight="16px" fontFamily="heading" color="gray.500">
              {`${(parseInt(leverage) / 1e18).toFixed(2)}x `}
              <Text as="span" color={long ? 'green.500' : 'red.500'}>
                {long ? 'LONG' : 'SHORT'}
              </Text>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Fade>
  );
};
