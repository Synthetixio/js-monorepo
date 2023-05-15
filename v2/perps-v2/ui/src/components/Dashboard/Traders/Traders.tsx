import { useState } from 'react';
import { Box, Flex, Text, Spinner, FlexProps, Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { TimeBadge } from '../../TimeBadge';
import { KeyColour } from '../KeyColour';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, Tooltip, Line, YAxis } from 'recharts';
import { TradersTooltip } from './TradersTooltip';
import { formatNumber } from '@snx-v2/formatters';
import { useStats } from '../../../hooks';

export const Traders = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y'>('M');

  const { data, loading } = useStats(state);

  const tradersNumber = data?.reduce(
    (acc, { newTraders, existingTraders }) => acc + newTraders + existingTraders,
    0
  );

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
            Traders
          </Text>

          <Box>
            <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
            {/* <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} /> */}
          </Box>
        </Flex>
        <Flex mt={6}>
          <KeyColour label="RETURNING" colour="whiteAlpha.400" />
          <KeyColour ml={4} label="NEW" colour="pink.300" />
          <KeyColour ml={4} label="ALL TIME" colour="cyan.500" />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <ChakraTooltip
              placement="top"
              fontSize="14px"
              px={2}
              py={1}
              label={`New plus returning for the last ${state === 'M' ? 'month' : 'year'}`}
            >
              <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
                {formatNumber(tradersNumber || 0, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Text>
            </ChakraTooltip>
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
                  cursor={false}
                  content={TradersTooltip}
                  wrapperStyle={{ outline: 'none' }}
                />
                <Bar yAxisId="left" dataKey="newTraders" stackId="a" fill="#F471FF" />
                <Bar yAxisId="left" dataKey="existingTraders" stackId="a" fill="#FFFFFF3D" />
                <Line
                  yAxisId="right"
                  dataKey="cumulativeTraders"
                  stroke="#00D1FF"
                  type="basis"
                  strokeWidth="2px"
                />
                <XAxis
                  dataKey="label"
                  tickLine={{ display: 'none' }}
                  tick={{ fontSize: '12px', fontFamily: 'Inter', fill: '#9999AC' }}
                />
                <YAxis
                  hide={true}
                  // tickFormatter={(x: number) => `$${millify(x)}`}
                  yAxisId="left"
                  orientation="left"
                  stroke="#FFFFFF3D"
                />
                <YAxis
                  hide={true}
                  // tickFormatter={(x: number) => `$${millify(x)}`}
                  yAxisId="right"
                  orientation="right"
                  stroke="#00D1FF"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </>
        )}
      </Flex>
    </>
  );
};
