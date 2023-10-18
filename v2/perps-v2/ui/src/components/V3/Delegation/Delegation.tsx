import { Box, Flex, FlexProps, Spinner, Text, Tooltip as ChakraTooltip } from '@chakra-ui/react';

import { useState } from 'react';
import { useDelegations } from '../../../hooks/useDelegations';
import { TimeBadge } from '../../TimeBadge';
import { KeyColour } from '../../Dashboard';
import { formatNumber } from '@snx-v2/formatters';
import { DelegationTooltip } from './DelegationTooltip';
import { Area, Bar, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { InfoIcon } from '@chakra-ui/icons';

export const BLOCKCHAIN_COLORS = ['#522ED1', '#FC8738'];
export const TOKEN_COLORS = ['#11946B', '#ED1EFF'];

export const Delegation = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y' | 'ALL'>('ALL');
  const { data, loading, blockchains, ids, totalToday } = useDelegations(state);
  return (
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
      <Flex
        justifyContent="space-between"
        flexDir="row"
        w="100%"
        flexWrap="wrap"
        sx={{ gap: '16px' }}
      >
        <ChakraTooltip label="All collateral delegated by token, pool, and network" hasArrow>
          <Flex alignItems="center" sx={{ gap: '8px' }}>
            <Text fontFamily="heading" fontSize="20px" fontWeight={700} lineHeight="28px">
              Pool Delegations
            </Text>
            <InfoIcon />
          </Flex>
        </ChakraTooltip>

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
        <>
          {' '}
          <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
            $
            {formatNumber(totalToday ?? 0, {
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
                content={(payload) => (
                  <DelegationTooltip
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
                  <Area
                    key={`cumDelegationUsd-${index}`}
                    dataKey={`${blockchain}.cumDelegationUsd`}
                    stackId="1"
                    fill={BLOCKCHAIN_COLORS[index]}
                    stroke={BLOCKCHAIN_COLORS[index]}
                    yAxisId="left"
                  />
                );
              })}
              {blockchains.map((blockchain, index) => {
                return (
                  <Bar
                    key={`dailyDelegations-${index}`}
                    dataKey={`${blockchain}.dailyDelegations`}
                    stackId="2"
                    fill={TOKEN_COLORS[index]}
                    stroke={TOKEN_COLORS[index]}
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
        </>
      )}
    </Flex>
  );
};
