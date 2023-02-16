import { Box, Divider, Flex, Link } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { FC } from 'react';
import { PoolHeader } from './PoolHeader';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { MarketSection } from './MarketSection';
import { CollateralSection } from './CollateralSection';
import { useParams } from '@snx-v3/useParams';
import { usePoolData } from '@snx-v3/usePoolData';

export const PoolUi: FC<{
  PoolHeader: FC;
  CollateralSection: FC;
  MarketSection: FC;
}> = ({ PoolHeader, CollateralSection, MarketSection }) => {
  return (
    <>
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
  const { data: poolData } = usePoolData(params.poolId);
  const title = poolData ? `Pool #${poolData.id} / ${poolData.name}` : 'Pool';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <PoolUi
        PoolHeader={PoolHeader}
        CollateralSection={CollateralSection}
        MarketSection={MarketSection}
      />
    </>
  );
};
