import { Flex, Heading, Link } from '@chakra-ui/react';
import Head from 'react-helmet';
import { Link as NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Not Found | Synthetix V3 Spot Markets</title>
      </Head>
      <Flex
        height="100%"
        direction="column"
        position="relative"
        alignItems="center"
        justifyContent="center"
        flex="1"
      >
        <Heading fontSize={140}>404</Heading>
        <Heading textTransform="uppercase" fontSize={24}>
          Page not found
        </Heading>
        <NavLink to="/">
          <Link color="cyan.500">Return to Home</Link>
        </NavLink>
      </Flex>
    </>
  );
};
