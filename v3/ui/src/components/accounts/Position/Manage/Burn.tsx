import { Text, Box, Link, Input, Button, Flex, Heading, Badge } from '@chakra-ui/react';

export default function Burn() {
  return (
    <Box mb="4">
      <Heading fontSize="md" mb="1">
        Burn snxUSD
      </Heading>
      <Text fontSize="sm" mb="1">
        Reduce your debt and improve your C-Ratio. You can purchase snxUSD from most major exchanges
        like{' '}
        <Link
          display="inline"
          _hover={{ textDecoration: 'none' }}
          borderBottom="1px dotted rgba(255,255,255,0.5)"
        >
          one we like
        </Link>
        .
      </Text>

      <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
        <form>
          <Flex mb="3">
            <Input
              flex="1"
              type="number"
              border="none"
              placeholder="0.0"
              // value={null}
              onChange={(e) => {
                null;
              }}
            />
            <Button
              display="none"
              // isLoading={null}
              // isDisabled={null}
              colorScheme="blue"
              ml="4"
              px="8"
              type="submit"
            >
              Burn
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Box>
            <Text fontSize="xs">Balance: $2,000</Text>
          </Box>
          <Link>
            <Badge
              as="button"
              ml="3"
              variant="outline"
              colorScheme="blue"
              transform="translateY(-2px)"
            >
              Use Max
            </Badge>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
