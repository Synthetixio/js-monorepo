import { Flex, Text, Spinner, FlexProps, Box } from '@chakra-ui/react';

import { ResponsiveContainer, ComposedChart, XAxis, Tooltip, YAxis, Bar } from 'recharts';
import { KeyColour } from '../../Dashboard';
import { useState } from 'react';
import { TimeBadge } from '../../TimeBadge';
import { useDelegations } from '../../../hooks/useDelegations';
import { DailyDelegationsTooltip } from './DailyDelegationsTooltip';

export const BLOCKCHAIN_COLORS = ['#522ED1', '#FC8738'];

export const DailyDelegations = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y' | 'ALL'>('ALL');
  const { data, loading, blockchains, ids } = useDelegations(state);

  return (
    <Flex
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
      <Flex
        justifyContent="space-between"
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        sx={{ gap: '16px' }}
      >
        <Text fontFamily="heading" fontSize="20px" fontWeight={700} lineHeight="28px">
          Daily Delegations
        </Text>
        <Box>
          <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
          <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} />
          <TimeBadge title="ALL" onPress={() => setState('ALL')} isActive={state === 'ALL'} />
        </Box>
      </Flex>
      <Flex mt={6} sx={{ gap: '12px' }}>
        {ids.map((id, index) => {
          return (
            <KeyColour
              key={index}
              label={id}
              colour={BLOCKCHAIN_COLORS[index]}
              textTransform="capitalize"
            />
          );
        })}
      </Flex>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Spinner size="xl" />
        </Flex>
      ) : (
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
              content={(payload) => (
                <DailyDelegationsTooltip
                  label={payload.label}
                  payload={payload.payload}
                  active={payload.active}
                  blockchains={blockchains}
                />
              )}
              wrapperStyle={{ outline: 'none' }}
            />
            {blockchains.map((blockchain, index) => {
              return (
                <Bar
                  key={index}
                  dataKey={`${blockchain}.dailyDelegationsUsd`}
                  stackId="1"
                  fill={BLOCKCHAIN_COLORS[index]}
                  stroke={BLOCKCHAIN_COLORS[index]}
                  yAxisId="left"
                />
              );
            })}
            <XAxis
              dataKey="label"
              minTickGap={10}
              tickLine={{ display: 'none' }}
              tick={{ fontSize: '12px', fontFamily: 'Inter', fill: '#9999AC' }}
            />
            <YAxis hide yAxisId="left" orientation="left" stroke="#FFFFFF3D" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </Flex>
  );
};
