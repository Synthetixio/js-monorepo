import { useState } from 'react';
import { Box, Flex, Text, Spinner, FlexProps } from '@chakra-ui/react';
import { TimeBadge } from '../../TimeBadge';
import { KeyColour } from '../KeyColour';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, Tooltip, Line, YAxis } from 'recharts';
import { VolumeTooltip } from './VolumeTooltip';
import { formatNumber } from '@snx-v2/formatters';
import { useStats } from '../../../hooks';

export const Volume = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y'>('M');

  const { data, loading } = useStats(state);

  const volumeNumber = data?.reduce((acc, { volume }) => acc + volume, 0);

  return (
    <>
      <Flex
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
            Volume
          </Text>
          <Box>
            <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
            <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} />
          </Box>
        </Flex>
        <Flex mt={6}>
          <KeyColour label="VOLUME" colour="whiteAlpha.400" />
          <KeyColour ml={4} label="CUMULATIVE" colour="cyan.500" />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%" minHeight={200}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
              $
              {formatNumber(volumeNumber || 0, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
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
                  cursor={false}
                  content={VolumeTooltip}
                  wrapperStyle={{ outline: 'none' }}
                />
                <Bar yAxisId="left" dataKey="volume" stackId="a" fill="#FFFFFF3D" />
                <Line
                  yAxisId="right"
                  dataKey="cumulativeVolume"
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
