import { Box, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { PoolHeader } from './PoolHeader';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useVaultCollaterals } from '@snx-v3/useVaultCollaterals';
import { MarketSection } from './MarketSection';

export const Pool = () => {
  const { id } = useParams();

  const x = useVaultCollaterals(id ? parseFloat(id) : undefined);
  return (
    <>
      <Helmet>
        <title>Pool</title>
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
      <Flex>
        <Box w="40%" mr={2}>
          <PoolHeader />
          <Box
            mt={4}
            borderColor="gray.900"
            borderWidth="1px"
            height="400px"
            borderRadius="base"
            padding={4}
          >
            Collateral, TODO
          </Box>
        </Box>
        <Box w="60%" ml={2}>
          <MarketSection />
        </Box>
      </Flex>
    </>
  );
};
