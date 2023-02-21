import React, { useEffect, useMemo } from 'react';
import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Spinner,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { numberWithCommas } from './utils/numbers';
import { PositionLiquidated, useGetLiquidations } from './queries/liquidation';
import { DelayedOrder, useGetDelayedOrder } from './queries/delayed-orders';
import { FuturesTrades, useGetFuturesTrades } from './queries/futures-trades';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Position } from './components/Position';
import { Liquidation } from './components/Liquidation';
import { Order } from './components/Order';

export interface EventType extends FuturesTrades, DelayedOrder, PositionLiquidated {}

function App() {
  const navigate = useNavigate();
  const toast = useToast();
  const { register, getValues } = useForm({
    defaultValues: { address: '' },
  });
  const { colorMode, toggleColorMode } = useColorMode();
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

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" gap="2">
      <Heading size="sm">Add a wallet address:</Heading>
      <Input placeholder="Address" w="50%" {...register('address')} />
      <Button onClick={() => navigate(getValues('address'))}>Query</Button>
      <Text>- OR -</Text>
      <Link to="/all" style={{ textDecorationLine: 'underline' }}>
        See all trades in a table
      </Link>
      <Divider />
      <Flex flexDir="column" p="2" justifyContent="center" alignItems="center">
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
                      : event.entity === 'Futures Order'
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
                        <Order event={event} />
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
                        onClick={(e) => {
                          e.stopPropagation();
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
                            window.open('https://optimistic.etherscan.io/address/' + event.account);
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
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/' + event.account);
                    }}
                  >
                    <Heading size="sm">GO TO TRADE</Heading>
                  </Button>
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default App;
