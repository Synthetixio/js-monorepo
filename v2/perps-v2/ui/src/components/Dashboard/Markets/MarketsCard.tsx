import { Flex, FlexProps, Spinner, Text } from '@chakra-ui/react';
import { formatNumberToUsd, formatPercent } from '@snx-v2/formatters';
import Wei, { wei } from '@synthetixio/wei';
import { utils } from 'ethers';
import { DailyMarketStat } from '../../../__generated__/graphql';
import { CurrencyIcon } from '../../CurrencyIcon';

interface MarketData extends Partial<DailyMarketStat> {
  percentageDifference: Wei;
}

interface MarketsCardProp extends FlexProps {
  loading: boolean;
  data: MarketData | undefined;
  number: number;
}

export const MarketsCard = ({ loading, data, number, ...props }: MarketsCardProp) => {
  let displayName;

  displayName = utils.parseBytes32String(
    data?.market?.asset || '0x7342544300000000000000000000000000000000000000000000000000000000'
  );

  if (displayName === 'sETH' || displayName === 'sBTC') {
    displayName = displayName.substring(1);
  }

  const percentageDifference = data?.percentageDifference.toNumber() || 0;
  const percentageDisplay =
    percentageDifference > 10000
      ? `${percentageDifference.toExponential(2)}%`
      : formatPercent(Math.abs(percentageDifference));

  return (
    <Flex
      minHeight={117}
      justifyContent="center"
      alignItems="center"
      bg="navy.700"
      borderWidth="1px"
      borderColor="gray.900"
      borderRadius="5px"
      p={4}
      {...props}
    >
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {data ? (
            <Flex width="100%" flexDirection="column" justifyContent="space-between">
              <Flex justifyContent="space-between" width="100%">
                <Flex alignItems="center">
                  <CurrencyIcon
                    width="30px"
                    height="30px"
                    currencyKey={utils.parseBytes32String(
                      data?.market?.asset ||
                        '0x7342544300000000000000000000000000000000000000000000000000000000'
                    )}
                  />
                  <Text
                    fontFamily="heading"
                    fontSize="18px"
                    fontWeight={700}
                    lineHeight="28px"
                    color="gray.50"
                    ml={2}
                  >{`${displayName.toUpperCase()}-PERP`}</Text>
                </Flex>
                <Text
                  fontFamily="heading"
                  fontWeight={700}
                  fontSize="18px"
                  lineHeight="28px"
                  color="gray.500"
                >
                  #{number}
                </Text>
              </Flex>
              <Flex mt={6} justifyContent="space-between">
                <Flex flexDirection="column">
                  <Text fontSize="12px" fontWeight={700} fontFamily="heading" color="gray.500">
                    Volume
                  </Text>
                  <Text color="gray.50" fontSize="14px" fontWeight={500} lineHeight="20px">
                    {formatNumberToUsd(wei(data?.volume || 0, 18, true).toNumber())}
                  </Text>
                </Flex>
                <Flex flexDirection="column" alignItems="flex-start">
                  <Text fontSize="12px" fontWeight={700} fontFamily="heading" color="gray.500">
                    24h Change
                  </Text>
                  <Text
                    color={percentageDifference >= 0 ? 'green.500' : 'red.500'}
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="20px"
                  >
                    {percentageDifference >= 0 ? '+' : '-'}
                    {percentageDisplay}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <Flex>
              <Text fontSize="12px" fontFamily="heading">
                No additional market data
              </Text>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};
