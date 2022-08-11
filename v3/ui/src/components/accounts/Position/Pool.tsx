import { ExternalLinkIcon, EditIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Text,
  Box,
  Flex,
  Link,
  Radio,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';

export default function Pool() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box mb="2">
      <Text mt="2" mb="6">
        By pooling liquidity for markets, you’re enabling the creation synthetic assets on-chain.
        You can earn fees and rewards, but your debt may increase. See{' '}
        <em>Hedging Your Staking Position</em> for information on how to protect your C-Ratio.
      </Text>
      <Box mb="6">
        <Text fontSize="sm" fontWeight="semibold">
          Current Pool
        </Text>
        <Heading size="lg" mb="1">
          Spartan Council
          <Link
            color="blue.400"
            ml="1.5"
            display="inline-block"
            transform="translateY(-2px)"
            onClick={onOpen}
          >
            <EditIcon w="5" />
          </Link>
        </Heading>
        <Text fontSize="sm">
          <span style={{ opacity: 0.8 }}>Pool #1</span>
          <NavLink to={'/pools/example'}>
            <Link color="blue.400" ml="1" display="inline-block" transform="translateY(-2px)">
              <ExternalLinkIcon />
            </Link>
          </NavLink>
          <span style={{ opacity: 0.8 }}>&nbsp;&nbsp;|&nbsp;&nbsp;231 Pool Shares</span>
          <QuestionOutlineIcon color="blue.400" ml="1" transform="translateY(-2px)" />
        </Text>
      </Box>

      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Change Pool</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="6">Select a pool to participate in with this staking position:</Text>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  None
                </Heading>
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Spartan Council
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #1{' '}
                  <NavLink to={'/pools/example'}>
                    <Link
                      color="blue.400"
                      display="inline-block"
                      transform="translateY(-1.5px)"
                      target="_blank"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </NavLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  20% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  70% Projected Rewards APY
                </Text>
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Commodities
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #2{' '}
                  <NavLink to={'/pools/example'}>
                    <Link
                      color="blue.400"
                      display="inline-block"
                      transform="translateY(-1.5px)"
                      target="_blank"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </NavLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  10% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  0% Projected Rewards APY
                </Text>
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Crypto
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #3{' '}
                  <NavLink to={'/pools/example'}>
                    <Link
                      color="blue.400"
                      display="inline-block"
                      transform="translateY(-1.5px)"
                      target="_blank"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </NavLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  25% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  0% Projected Rewards APY
                </Text>
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Experimental
                </Heading>
                <Text fontSize="xs" display="block" color="gray.400">
                  Pool #4{' '}
                  <NavLink to={'/pools/example'}>
                    <Link
                      color="blue.400"
                      display="inline-block"
                      transform="translateY(-1.5px)"
                      target="_blank"
                    >
                      <ExternalLinkIcon />
                    </Link>
                  </NavLink>
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="xs" display="block" color="gray.400">
                  2% Projected Fees APY
                </Text>
                <Text fontSize="xs" display="block" color="gray.400">
                  0% Projected Rewards APY
                </Text>
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              mb="2.5"
              pb="2.5"
              borderBottom="1px solid rgba(255,255,255,0.3)"
            >
              <Box>
                <Radio size="lg" colorScheme="orange" />
              </Box>
              <Box flex="1" pl="3">
                <Heading size="sm" mb="0.5">
                  Custom
                </Heading>
              </Box>
              <Box ml="auto" w="80px">
                <InputGroup size="sm">
                  <InputLeftAddon bg="black">#</InputLeftAddon>
                  <Input id="amount" type="amount" borderLeft="none" value="1" />
                </InputGroup>
              </Box>
            </Flex>
            {/*
            <Heading size="sm" mb="2" mt="6">
              Leverage
            </Heading>
            <Grid
              templateColumns="repeat(12, 1fr)"
              gap={6}
              alignItems="center"
              mb="6"
            >
              <GridItem colSpan="3">
                <InputGroup>
                  <InputLeftAddon bg="black">&times;</InputLeftAddon>
                  <Input
                    id="amount"
                    type="amount"
                    borderLeft="none"
                    value="1"
                  />
                </InputGroup>
              </GridItem>
              <GridItem colSpan="9">
                <Text fontSize="xs">
                  Leveraging your staking position allows you to earn more fees
                  and rewards, but your C-Ratio is subject to greater volatiity.{" "}
                  <strong>⚠️ Use leverage with caution.</strong>
                </Text>
              </GridItem>
            </Grid>
  */}
            <Heading size="sm" mb="2" mt="6">
              Burn Pool Shares
            </Heading>
            <Text>
              To leave the pool you’re currently in, you need to burn your pool shares.{' '}
              <em>t.b.d.</em>
            </Text>

            <Button colorScheme="blue" w="100%" my="5">
              Update Pool
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Heading size="md" mb="1">
        Market Exposure
      </Heading>
      <Text mb="4">
        You’re currently backing the following markets. Your exposure can change based on market
        conditions. To customize the markets you’re exposed to,{' '}
        <Link fontWeight="semibold" color="blue.400">
          create your own pool
        </Link>
        .
      </Text>
      <Table size="sm" variant="simple" mb="6">
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Asset
            </Th>
            <Th color="white" pb="2">
              Fees APY
            </Th>
            <Th color="white" pb="2">
              Exposure
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              <Heading size="sm">Synthetic&nbsp;Bitcoin</Heading>
              <Text mt="1" fontSize="xs">
                <span style={{ opacity: 0.8 }}>sBTC</span>
                <NavLink to={'/synths/example'}>
                  <Link color="blue.400" ml="1" display="inline-block" transform="translateY(-1px)">
                    <ExternalLinkIcon />
                  </Link>
                </NavLink>
              </Text>
            </Td>
            <Td>
              25.4%
              <Text fontSize="xs" opacity="0.8">
                sUSD
              </Text>
            </Td>
            <Td>
              0.2 sBTC
              <Text fontSize="xs" opacity="0.8">
                Max: 0.4 sBTC
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Heading size="sm" mb="1">
        Hedging Your Staking Position
      </Heading>
      <Text fontSize="sm" mb="12">
        If you’re concerned about maintaining your C-Ratio, you can hedge your staking position. To
        become fully hedged, make sure you’re always holding your exposure to each of the assets
        above (or their non-synthetic equivalents). These assets will change in value by the amount
        that you would need to restore your C-Ratio to its current value.
      </Text>
    </Box>
  );
}
