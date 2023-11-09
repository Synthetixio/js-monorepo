import { Flex, Text, Spinner, FlexProps, Box, Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { ResponsiveContainer, ComposedChart, XAxis, Tooltip, YAxis, Area } from 'recharts';
import { useTvlProtocols } from '../../../hooks/useTvlProtocols';
import { KeyColour } from '../../Dashboard';
import { TvlProtocolsTooltip } from './TvlProtocolsTooltip';
import { useState } from 'react';
import { TimeBadge } from '../../TimeBadge';
import { formatNumber } from '@synthetixio/formatters';

export const BLOCKCHAIN_COLORS = ['#522ED1', '#FC8738'];

export const TvlProtocols = ({ ...props }: FlexProps) => {
  const [state, setState] = useState<'M' | 'Y' | 'ALL'>('ALL');
  const { data, loading, blockchains, totalToday } = useTvlProtocols(state);

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
        <Flex
          justifyContent="space-between"
          flexDir="row"
          w="100%"
          flexWrap="wrap"
          sx={{ gap: '16px' }}
        >
          <ChakraTooltip label="All value held in the Synthetix V3 Core Contract" hasArrow>
            <Flex alignItems="center" sx={{ gap: '8px' }}>
              <Text fontFamily="heading" fontSize="20px" fontWeight={700} lineHeight="28px">
                TVL Network Totals
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
          {blockchains.map((blockchain, index) => {
            return (
              <KeyColour
                key={index}
                label={blockchain}
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
                    <TvlProtocolsTooltip
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
                      key={index}
                      dataKey={blockchain}
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
          </>
        )}
      </Flex>
    </>
  );
};
