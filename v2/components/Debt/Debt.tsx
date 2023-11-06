import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Collapse,
  SkeletonText,
  Tooltip,
  Link,
} from '@chakra-ui/react';
import { formatNumberToUsd } from '@synthetixio/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { FC, useState } from 'react';
import { DebtPoolTable } from '@snx-v2/DebtPoolTable';
import { InfoIcon } from '@snx-v2/icons';
import { OneClickHedging } from './OneClickHedging';
import { ManualHedging } from './ManualHeding';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';

export const DebtUi: FC<{
  debtBalance?: number;
}> = ({ debtBalance }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  return (
    <Box mt={8}>
      <Flex alignItems="center" gap={4} flexDirection={{ base: 'column', sm: 'row' }}>
        <Box>
          <Heading fontSize="lg" fontWeight="700">
            Hedge your debt
          </Heading>
          <Text color="gray.500" fontSize="xs">
            Your active debt is not static and depends on the debt pool. You might want to mirror
            its composition to be protected against its increase. This is done by buying similar
            assets to the debt pool or by buying dSNX. Learn more about{' '}
            <Link href={EXTERNAL_LINKS.Synthetix.HedgeStrategies} textColor="cyan.400" isExternal>
              debt hedging strategies
            </Link>
            .
          </Text>
        </Box>
        <Flex
          flexDir="column"
          w={{ base: '100%', sm: '282px' }}
          bg="navy.700"
          p={2}
          flexShrink="0"
          alignItems={{ base: 'center', sm: 'flex-end' }}
          borderWidth="1px"
          borderColor="gray.900"
          borderRadius="base"
        >
          <Text display="flex" alignItems="center" gap={1} color="gray.500" fontSize="sm">
            Active Debt
            <Tooltip label="Active debt is your share of the global debt pool">
              <Flex>
                <InfoIcon />
              </Flex>
            </Tooltip>
          </Text>
          <SkeletonText fontSize="2xl" fontWeight="700" isLoaded={debtBalance !== undefined}>
            {debtBalance !== undefined ? formatNumberToUsd(debtBalance) : null}
          </SkeletonText>
        </Flex>
      </Flex>
      <Flex gap={4} flexDirection={{ base: 'column', md: 'row' }}>
        <Box mt={4} flexBasis="50%">
          <OneClickHedging />
        </Box>
        <Box flexBasis="50%" mt={4}>
          <ManualHedging />
        </Box>
      </Flex>
      <Box p={4} mt={4} borderWidth="1px" borderColor="gray.900" borderRadius="base" bg="navy.700">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading fontSize="lg"> Detailed Debt Pool Composition</Heading>
          <Button onClick={() => setDetailOpen((x) => !x)} variant="outline">
            Show {detailOpen ? 'Less' : 'More'}
          </Button>
        </Flex>
        <Collapse in={detailOpen}>
          <Box mt={4}>
            <DebtPoolTable />
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
export const Debt = () => {
  const { data: debtData } = useDebtData();
  return <DebtUi debtBalance={debtData?.debtBalance.toNumber()} />;
};
