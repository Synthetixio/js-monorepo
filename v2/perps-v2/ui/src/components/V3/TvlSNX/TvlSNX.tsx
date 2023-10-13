import { Flex, Text, Spinner, FlexProps, Box } from '@chakra-ui/react';

import { ResponsiveContainer, ComposedChart, XAxis, Tooltip, YAxis, Area } from 'recharts';
import { KeyColour } from '../../Dashboard';
import { TvlSNXTooltip } from './TvlSNXTooltip';
import { useState } from 'react';
import { TimeBadge } from '../../TimeBadge';
import { formatNumber } from '@snx-v2/formatters';
import { useTvlSNX } from '../../../hooks/useTvlSNX';

export const TvlSNX = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y' | 'ALL'>('ALL');
  const { data, loading } = useTvlSNX(state);
  console.log(data);

  const tvlNumber = data?.reduce((acc, { totalSNX }) => acc + totalSNX, 0);

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
            Layer Balances - TVL SNX
          </Text>
          <Box>
            <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
            <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} />
            <TimeBadge title="ALL" onPress={() => setState('ALL')} isActive={state === 'ALL'} />
          </Box>
        </Flex>
        <Flex mt={6} sx={{ gap: '12px' }}>
          <KeyColour label="ethSNX" colour="#522ED1" />
          <KeyColour label="opSNX" colour="#FC8738" />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
              $
              {formatNumber(tvlNumber ?? 0, {
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
                  content={TvlSNXTooltip}
                  wrapperStyle={{ outline: 'none' }}
                />
                <Area dataKey="ethSNX" stackId="1" fill="#522ED1" stroke="#522ED1" yAxisId="left" />
                <Area dataKey="opSNX" stackId="1" fill="#FC8738" stroke="#FC8738" yAxisId="left" />
                <XAxis
                  dataKey="label"
                  minTickGap={10}
                  tickLine={{ display: 'none' }}
                  tick={{ fontSize: '12px', fontFamily: 'Inter', fill: '#9999AC' }}
                />
                <YAxis hide yAxisId="left" orientation="left" stroke="#FFFFFF3D" />
              </ComposedChart>
            </ResponsiveContainer>
          </>
        )}
      </Flex>
    </>
  );
};
