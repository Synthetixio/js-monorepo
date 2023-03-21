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
import { formatNumberToUsd } from '@snx-v2/formatters';
import { useDebtData } from '@snx-v2/useDebtData';
import { FC, useState } from 'react';
import { DebtPoolTable } from '@snx-v2/DebtPoolTable';
import { InfoIcon } from '@snx-v2/icons';
import { OneClickHedging } from './OncClickHedging';
import { ManualHedging } from './ManualHeding';

export const DebtUi: FC<{
  debtBalance?: number;
}> = ({ debtBalance }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  return (
    <Box mt={8}>
      <Flex alignItems="center" gap={4}>
        <Box>
          <Heading fontSize="lg" fontWeight="700">
            Hedge your debt
          </Heading>
          <Text color="gray.500" fontSize="xs">
            Your active debt is not static and depends on the debt pool. You might want to mirror
            its composition to be protected against its increase. This is done by buying similar
            assets to the debt pool or by buying dSNX. Learn more about{' '}
            <Link textColor="cyan.400" isExternal>
              debt hedging strategies
            </Link>
            .
          </Text>
        </Box>
        <Flex
          flexDir="column"
          w="282px"
          bg="navy.700"
          p={2}
          flexShrink="0"
          alignItems="flex-end"
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
      <Flex gap={4}>
        <Box mt={4} flexBasis="50%">
          <OneClickHedging />
        </Box>
        <Box flexBasis="50%" mt={4}>
          <ManualHedging />
        </Box>
      </Flex>
      <Box p={4} mt={2} borderWidth="1px" borderColor="gray.900" borderRadius="base" bg="navy.700">
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
