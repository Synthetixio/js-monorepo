import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  Heading,
  SimpleGrid,
  Flex,
  Tooltip,
  Link,
  Badge,
  Text,
} from '@chakra-ui/react';

export default function Custom() {
  return (
    <Box mb="4">
      <SimpleGrid columns={2} spacing={6} mb="4">
        <Box>
          <Heading fontSize="md" mb="2">
            Adjust Collateral
          </Heading>

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
                  value="100"
                />
              </Flex>
            </form>
            <Flex alignItems="center">
              <Box mr="auto">
                <Text fontSize="xs">Balance: 100 SNX</Text>
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
        <Box>
          <Heading fontSize="md" mb="2">
            Adjust snxUSD Debt
          </Heading>

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
                  value="100"
                />
              </Flex>
            </form>
            <Flex alignItems="center">
              <Box mr="auto">
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
      </SimpleGrid>
      <Text>
        This adjustment will <strong>stake 10 additional SNX</strong> and{' '}
        <strong>mint 300 additional snxUSD</strong>.
      </Text>
    </Box>
  );
}
