import { Flex, Box, Stack, Skeleton, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

export function Pool() {
  //const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Pool</title>
        <meta name="description" content="Pool" />
      </Helmet>
      <Flex position="relative" flex="1">
        <Box
          position="absolute"
          px="3"
          py="1"
          zIndex="999"
          bg="black"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
        >
          <Heading
            mb="0"
            size="sm"
            opacity="0.66"
            textTransform="uppercase"
            fontWeight="300"
            letterSpacing="2px"
          >
            UI Coming Soon
          </Heading>
        </Box>
        <Stack w="100%">
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
          <Skeleton startColor="gray.900" endColor="cyan.900" height="8px" isLoaded={false} />
        </Stack>
      </Flex>
    </>
  );
}
