import { Box, Divider, Flex, Link } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { PoolHeader } from './PoolHeader';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { MarketSection } from './MarketSection';
import { CollateralSection } from './CollateralSection';
import { useParams } from '@snx-v3/useParams';
import { PoolType, usePoolData } from '@snx-v3/usePoolData';

export const PoolUi = ({ pool }: { pool: PoolType }) => {
  return (
    <>
      <Helmet>
        <title>
          Pool #{pool.id} / {pool.name}
        </title>
        <meta name="description" content="Pool" />
      </Helmet>
      <Link
        width="fit-content"
        display="flex"
        alignItems="center"
        color="cyan.500"
        as={ReactRouterLink}
        to="/"
        fontSize="sm"
        fontWeight={700}
        ml={2}
        mb={2}
      >
        <ArrowBackIcon mr={1} /> Account Overview
      </Link>

      <PoolHeader />

      <Divider my={8} bg="gray.900" />

      <Flex gap={4} flexDirection={{ base: 'column', lg: 'row' }}>
        <Box flexGrow={1}>
          <CollateralSection />
        </Box>
        <Box flexGrow={1}>
          <MarketSection />
        </Box>
      </Flex>
    </>
  );
};

export const Pool = () => {
  const params = useParams();
  const { data: pool } = usePoolData(params.poolId);
  return pool ? <PoolUi pool={pool} /> : null;
};
