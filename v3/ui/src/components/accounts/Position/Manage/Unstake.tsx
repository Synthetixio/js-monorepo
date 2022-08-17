import { Text, Box, Link, Input, Button, Flex, Heading, Badge } from '@chakra-ui/react';

export default function Unstake() {
  return (
    <Box mb="4">
      <Heading fontSize="md" mb="1">
        Unstake SNX
      </Heading>
      <Text fontSize="sm" mb="1">
        Retrieve your collateral from the protocol. This decreases your C-Ratio and increases your
        risk of liquidation.
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
              onChange={() => null}
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
              Mint
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Box>
            <Text fontSize="xs">Max: 100 SNX</Text>
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
