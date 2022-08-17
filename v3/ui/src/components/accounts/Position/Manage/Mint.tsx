import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Text, Box, Link, Tooltip, Input, Button, Flex, Heading, Badge } from '@chakra-ui/react';

export default function Mint() {
  return (
    <Box mb="4">
      <Heading fontSize="md" mb="1">
        Mint snxUSD
      </Heading>
      <Text fontSize="sm" mb="1">
        Take an interest-free loan against your collateral. This increases your debt and decreases
        your C-Ratio.
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
            <Text fontSize="xs">
              Max Mint: $1,200
              <Tooltip label="You can't mint snxUSD that takes your C-Ratio below the target c-ratio of 300%.">
                <QuestionOutlineIcon transform="translateY(-1.5px)" ml="1" />
              </Tooltip>
            </Text>
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
