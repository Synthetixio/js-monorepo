import { useState } from 'react';
import { Box, Flex, Text, Spinner, FlexProps } from '@chakra-ui/react';
import { Bar, Tooltip, ResponsiveContainer, Line, ComposedChart, XAxis } from 'recharts';
import { TimeBadge } from '../../TimeBadge';
import { KeyColour } from '../KeyColour';
import { formatNumber } from '@snx-v2/formatters';
import { TradesTooltip } from './TradesTooltip';
import { useStats } from '../../../hooks';

export const Trades = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y'>('M');

  const { data, loading } = useStats(state);

  const tradesNumber = data?.reduce((acc, { trades }) => acc + trades, 0);

  return (
    <>
      <Flex
        width="49%"
        my={5}
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="5px"
        sx={{
          borderCollapse: 'separate !important',
          borderSpacing: 0,
        }}
        bg="navy.700"
        flexDirection="column"
        p={4}
        {...props}
      >
        <Flex justifyContent="space-between" flexDir="row" w="100%">
          <Text fontFamily="heading" fontSize="20px" fontWeight={700} lineHeight="28px">
            Trades
          </Text>
          <Box>
            <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
            <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} />
          </Box>
        </Flex>
        <Flex mt={6}>
          <KeyColour label="TRADES" colour="whiteAlpha.400" />
          <KeyColour ml={4} label="CUMULATIVE TRADES" colour="cyan.500" />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%" minHeight={200}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
              {formatNumber(tradesNumber || 0)}
            </Text>
            <ResponsiveContainer minWidth="100%" minHeight={200}>
              <ComposedChart
                data={data || []}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Tooltip
                  content={TradesTooltip}
                  cursor={false}
                  wrapperStyle={{ outline: 'none' }}
                />
                <Bar dataKey="trades" stackId="a" fill="#FFFFFF3D" />
                <Line dataKey="cumulativeTrades" stroke="#00D1FF" type="basis" strokeWidth="2px" />
                <XAxis
                  dataKey="label"
                  tickLine={{ display: 'none' }}
                  tick={{ fontSize: '12px', fontFamily: 'Inter', fill: '#9999AC' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </>
        )}
      </Flex>
    </>
  );
};
