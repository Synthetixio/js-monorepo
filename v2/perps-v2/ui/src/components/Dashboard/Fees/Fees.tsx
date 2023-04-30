import { useState } from 'react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { TimeBadge } from '../../TimeBadge';
import { KeyColour } from '../KeyColour';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, Tooltip, Line } from 'recharts';
import { formatNumber } from '@snx-v2/formatters';
import { useStats } from '../../../hooks';
import { FeesTooltip } from './FeesTooltip';

export const Fees = () => {
  const [state, setState] = useState<'M' | 'Y'>('M');

  const { data, loading } = useStats(state);

  const totalFees = data?.reduce((acc, { fees }) => acc + fees, 0);

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
            Fees
          </Text>
          <Box>
            <TimeBadge title="1M" onPress={() => setState('M')} isActive={state === 'M'} />
            <TimeBadge title="1Y" onPress={() => setState('Y')} isActive={state === 'Y'} />
          </Box>
        </Flex>
        <Flex mt={6}>
          <KeyColour label="FEES" colour="whiteAlpha.400" />
          <KeyColour ml={4} label="CUMULATIVE" colour="cyan.500" />
        </Flex>
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="100%">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Text my={3} color="white" fontSize="24px" fontFamily="heading" fontWeight={800}>
              $
              {formatNumber(totalFees || 0, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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
                <Tooltip cursor={false} content={FeesTooltip} wrapperStyle={{ outline: 'none' }} />
                <Bar dataKey="fees" stackId="a" fill="#FFFFFF3D" />
                <Line dataKey="cumulativeFees" stroke="#00D1FF" type="basis" strokeWidth="2px" />
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
