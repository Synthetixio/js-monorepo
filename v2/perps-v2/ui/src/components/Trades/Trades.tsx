import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
// import { useQuery } from '@apollo/client';
import { Bar, Tooltip, ResponsiveContainer, Line, ComposedChart, XAxis } from 'recharts';
// import { TRADERS_QUERY } from '../../queries/dashboard';
import { TimeBadge } from '../TimeBadge';
import { KeyColour } from './KeyColour';
import { CustomTooltip } from '../CustomTooltip';
// import { FuturesPosition_OrderBy, OrderDirection } from '../../__generated__/graphql';
// import { getUnixTime, subDays } from 'date-fns';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
    label: 'Jan',
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
    label: 'Feb',
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
    label: 'Mar',
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
    label: 'Apr',
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
    label: 'May',
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
    label: 'Jun',
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
    label: 'Jul',
  },
];

export const Trades = () => {
  const [state, setState] = useState<'M' | 'Y'>('Y');

  // const {
  //   data: tradersData,
  //   loading,
  //   error,
  // } = useQuery(TRADERS_QUERY, {
  //   // variables: {
  //   //   orderBy: FuturesPosition_OrderBy.RealizedPnl,
  //   //   orderDirection: OrderDirection.Desc,
  //   //   first: 3,
  //   // },
  //   pollInterval: 10000,
  // });

  const tradesNumber = 3000;

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
        <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
          {tradesNumber}
        </Text>
        <ResponsiveContainer minWidth="100%" minHeight={200}>
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Tooltip content={CustomTooltip} cursor={false} />
            <Bar dataKey="pv" stackId="a" fill="#FFFFFF3D" />
            <Line dataKey="amt" stroke="#00D1FF" type="basis" strokeWidth="2px" />
            <XAxis
              dataKey="label"
              tickLine={{ display: 'none' }}
              tick={{ fontSize: '12px', fontFamily: 'Inter', fill: '#9999AC' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Flex>
    </>
  );
};
