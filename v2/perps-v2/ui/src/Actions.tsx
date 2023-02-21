import { ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Spinner, Text, useToast } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Position } from './components/Position';
import { Liquidation } from './components/Liquidation';
import { DelayedOrder, useGetDelayedOrder } from './queries/delayed-orders';
import { FuturesTrades, useGetFuturesTrades } from './queries/futures-trades';
import { PositionLiquidated, useGetLiquidations } from './queries/liquidation';
import { numberWithCommas } from './utils/numbers';

export interface EventType extends FuturesTrades, DelayedOrder, PositionLiquidated {}

export const Actions: FC = () => {
  const toast = useToast();
  const { data: orders, isLoading: ordersIsLoading } = useGetDelayedOrder();
  const { data: futuresTrades, isLoading: futuresTradesIsLoading } = useGetFuturesTrades();
  const { data: positionLiquidated, isLoading: positionLiquidatedIsLoading } = useGetLiquidations();

  const allEvents = useMemo(() => {
    if (orders?.length && futuresTrades?.length) {
      return orders
        .concat(futuresTrades as any)
        .concat(positionLiquidated as any)
        .sort((a, b) => {
          if (Number(a.timestamp) < Number(b.timestamp)) {
            return 1;
          }
          if (Number(a.timestamp) > Number(b.timestamp)) {
            return -1;
          }
          return 0;
        }) as EventType[];
    }
    return [];
  }, [orders, futuresTrades, positionLiquidated]);

  return (
    <Flex flexDir="column" p="2" justifyContent="center" alignItems="center">
      <Link to="/" style={{ marginBottom: '20px' }}>
        <Flex gap="2" alignItems="center">
          <ArrowBackIcon />
          <Heading size="md">Back</Heading>
        </Flex>
      </Link>
      {ordersIsLoading || futuresTradesIsLoading || positionLiquidatedIsLoading ? (
        <Spinner color="cyan.500"></Spinner>
      ) : (
        <Flex flexDir="column" gap="2">
          {allEvents?.map((event, i) => {
            return (
              <Flex
                key={event.timestamp.concat(i.toString())}
                borderColor={
                  event.entity === 'Position Liquidated'
                    ? 'red.500'
                    : event.entity === 'Futures Orders'
                    ? 'cyan.500'
                    : 'green.500'
                }
                borderWidth="2px"
                borderStyle="solid"
                borderRadius="base"
                p="4"
                flexDir="column"
                gap="2"
              >
                <>
                  <Flex justifyContent="space-between" alignItems="center" gap="2">
                    <Heading size="sm">{event.entity}</Heading>
                    <Text>
                      Time:&nbsp;
                      {new Date(Number(event.timestamp) * 1000).toLocaleDateString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text
                      cursor="pointer"
                      onClick={() => {
                        toast({
                          title: 'Copy to clipboard',
                          status: 'success',
                          isClosable: true,
                          duration: 5000,
                        });
                        navigator.clipboard.writeText(event.account);
                      }}
                      textDecorationLine="underline"
                    >
                      Account:&nbsp;
                      {event.account
                        .substring(0, 5)
                        .concat('...')
                        .concat(event.account.substring(event.account.length - 5))}
                      <IconButton
                        marginLeft="2"
                        variant="ghost"
                        aria-label="link to optimisim etherscan"
                        icon={<ExternalLinkIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://optimistic.etherscan.io/address/' + event.account);
                        }}
                      />
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center" gap="2">
                    <Text>
                      Size:&nbsp; ${numberWithCommas((Number(event.size) / 1e18).toFixed(2))}
                    </Text>
                    {event.entity === 'Futures Trade' ? (
                      <Position id={event.positionId} trade={event as FuturesTrades} />
                    ) : event.entity === 'Position Liquidated' && !!event.market ? (
                      <Liquidation event={event} />
                    ) : (
                      <></>
                    )}
                    <Text>Market:&nbsp;{event.market}</Text>
                  </Flex>
                  <Flex>
                    <Text>
                      Fee: $
                      {numberWithCommas(
                        (Number(event['feesPaidToSynthetix'] || event['fee']) / 1e18).toFixed(2)
                      )}
                    </Text>
                  </Flex>
                  {'keeper' in event && (
                    <Text
                      cursor="pointer"
                      onClick={() => {
                        toast({
                          title: 'Copy to clipboard',
                          status: 'success',
                          isClosable: true,
                          duration: 5000,
                        });
                        navigator.clipboard.writeText(event.account);
                      }}
                    >
                      Keeper:&nbsp;
                      {event.keeper
                        .substring(0, 5)
                        .concat('...')
                        .concat(event.keeper.substring(event.keeper.length - 5))}
                      <IconButton
                        marginLeft="2"
                        variant="ghost"
                        aria-label="link to optimisim etherscan"
                        icon={<ExternalLinkIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://optimistic.etherscan.io/address/' + event.keeper);
                        }}
                      />
                    </Text>
                  )}
                  {'pnl' in event && (
                    <Text>
                      PNL:&nbsp;
                      {numberWithCommas((Number(event.pnl) / 1e18).toFixed(2)).concat('%')}
                    </Text>
                  )}
                </>
              </Flex>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};
