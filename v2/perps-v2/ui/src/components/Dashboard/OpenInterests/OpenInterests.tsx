import { useState } from 'react';
import { Box, Flex, Text, FlexProps, Spinner } from '@chakra-ui/react';
import { TimeBadge } from '../../TimeBadge';
import { KeyColour } from '../KeyColour';
import { OITooltips } from './OItooltips';
import UseOiStats from '../../../hooks/useOiStats';
import {
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
} from 'recharts';

export const OpenInterests = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'W' | 'M' | 'Y'>('Y');
  const { data, loading, totalShortLoss } = UseOiStats(state);

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
            Open Interests
          </Text>
          {/* FILTERS | de-comment lines for filters */}
          <Box>
            <TimeBadge title="1W" onPress={() => setState('W')} isActive={state === 'W'} />
            <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
            <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} />
          </Box>
        </Flex>
        <Flex mt={6}>
          <KeyColour label="LONG" colour="whiteAlpha.400" />
          <KeyColour ml={4} label="SHORT" colour="pink.300" />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%" minHeight={200}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
              $
              {totalShortLoss?.absoluteValue.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </Text>

            {data && (
              <ResponsiveContainer minWidth="100%" minHeight={200}>
                <BarChart
                  data={data.result.rows}
                  stackOffset="sign"
                  margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid stroke="0" />
                  <XAxis
                    dataKey="dayFormatted"
                    tickLine={{ display: 'none' }}
                    tick={{ fontSize: '12px', fontFamily: 'Inter', fill: '#9999AC' }}
                  />
                  <Tooltip content={OITooltips} cursor={false} wrapperStyle={{ outline: 'none' }} />
                  <ReferenceLine y={0} stroke="#000" />
                  <Bar dataKey="short" fill="#F471FF" stackId="stack" />
                  <Bar dataKey="long" fill="#464657" stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </Flex>
    </>
  );
};
