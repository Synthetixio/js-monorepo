import { Helmet } from 'react-helmet';
import { Flex } from '@chakra-ui/react';

export function Home() {
  const title = 'Synthetix V3 Spot Markets';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <Flex height="100%" flexDirection="column">
        {title}
      </Flex>
    </>
  );
}
