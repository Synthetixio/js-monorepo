import { Flex, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { BorderBox } from '@snx-v3/BorderBox';

export interface StatsProps {
  totalDebt?: number;
  totalCollateral?: number;
}

export const Stats = ({ totalDebt, totalCollateral }: StatsProps) => {
  return (
    <Flex justifyContent="space-between" gap={4} flexDirection={{ base: 'column', md: 'row' }}>
      <BorderBox p={4} width="33%" flexDir="column">
        <Text
          fontSize="xs"
          fontFamily="heading"
          textTransform="uppercase"
          color="gray.500"
          textAlign="center"
          fontWeight="400"
        >
          Total Collateral
        </Text>
        <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
          {totalCollateral ? formatNumberToUsd(totalCollateral) : '—'}
        </Text>
      </BorderBox>
      <BorderBox p={4} flexDir="column" width="33%">
        <Text
          fontSize="xs"
          fontFamily="heading"
          textTransform="uppercase"
          color="gray.500"
          textAlign="center"
          fontWeight="400"
        >
          Total debt
        </Text>
        <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
          {totalDebt ? formatNumberToUsd(totalDebt) : '—'}
        </Text>
      </BorderBox>
      <BorderBox p={4} flexDir="column" width="33%">
        <Text
          fontSize="xs"
          fontFamily="heading"
          textTransform="uppercase"
          color="gray.500"
          textAlign="center"
          fontWeight="400"
        >
          Total Earnings Lifetime
        </Text>
        <Text fontFamily="heading" fontWeight="800" textAlign="center" fontSize="2xl">
          —
        </Text>
      </BorderBox>
    </Flex>
  );
};
