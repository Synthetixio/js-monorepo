import { ArrowDownIcon, ChevronDownIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Image,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  Text,
  InputGroup,
  InputRightAddon,
  Container,
  Badge,
} from '@chakra-ui/react';
import { BigNumber, utils } from 'ethers';
import Head from 'react-helmet';
import { useNetwork } from 'wagmi';

export const Teleporter = () => {
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  const balance = BigNumber.from(10);
  const decimals = 18;

  // import snxUSD addresses per network?
  // const balanceData = useTokenBalance(selectedCollateralType.address); // This needs to receive a network param?
  // read fee from contract?

  return (
    <>
      <Head>
        <title>Teleporter snxUSD</title>
      </Head>
      <Container maxW="lg">
        <Flex height="100%" direction="column" flex="1" py="12">
          <Heading size="lg" mb="3">
            Teleport snxUSD
          </Heading>
          <Text mb="7" color="whiteAlpha.800">
            Transfer snxUSD in your wallet across chains.
          </Text>

          <Box bg="whiteAlpha.200" p="6" pb="4" borderRadius="12px">
            <Text lineHeight="1" fontSize="sm" fontWeight={600} mb="2.5" color="gray.300">
              From
            </Text>
            <form>
              <Flex mb="3">
                <Menu>
                  <MenuButton
                    minWidth="170px"
                    borderWidth="1px"
                    borderColor="gray.800"
                    borderRadius="6px"
                    alignItems="center"
                    cursor="pointer"
                    type="button"
                  >
                    <Flex>
                      <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" ml="3.5" mr="2">
                        <Image
                          alt="collateral image"
                          width="24px"
                          height="24px"
                          src={'https://www.placecage.com/c/24/24'}
                        />
                      </Box>
                      <Text fontWeight="600">Optimism</Text>
                      <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
                    </Flex>
                  </MenuButton>
                </Menu>

                <InputGroup size="lg" ml="6">
                  <Input
                    flex="1"
                    type="number"
                    placeholder="0.0"
                    id="amount"
                    step="any"
                    min="0"
                    textAlign="right"
                    borderColor="gray.800"
                  />
                  <InputRightAddon borderColor="gray.800" bg="whiteAlpha.100" children="snxUSD" />
                </InputGroup>
              </Flex>

              <Flex alignItems="center">
                <Text fontSize="xs" textAlign="right" ml="auto">
                  <Text display="flex" gap={2} alignItems="center" fontSize="xs">
                    Balance: {parseFloat(utils.formatUnits(balance, decimals)).toLocaleString()}{' '}
                    snxUSD
                    {!balance.eq(0) && (
                      <Badge as="button" variant="outline" transform="translateY(-1px)">
                        Use Max
                      </Badge>
                    )}
                  </Text>
                </Text>
              </Flex>
            </form>
          </Box>

          <ArrowDownIcon w={5} h={5} mx="auto" mt="6" mb="5" opacity="0.66" />

          <Box bg="whiteAlpha.200" mb="10" p="6" pb="4" borderRadius="12px">
            <Text lineHeight="1" fontSize="sm" fontWeight={600} mb="2.5" color="gray.300">
              To
            </Text>
            <form>
              <Flex mb="3">
                <Menu>
                  <MenuButton
                    minWidth="170px"
                    borderWidth="1px"
                    borderColor="gray.800"
                    borderRadius="6px"
                    alignItems="center"
                    cursor="pointer"
                    type="button"
                  >
                    <Flex>
                      <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" ml="3.5" mr="2">
                        <Image
                          alt="collateral image"
                          width="24px"
                          height="24px"
                          src={'https://www.placecage.com/c/24/24'}
                        />
                      </Box>
                      <Text fontWeight="600">Ethereum</Text>
                      <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
                    </Flex>
                  </MenuButton>
                </Menu>

                <InputGroup size="lg" ml="6">
                  <Input
                    flex="1"
                    type="number"
                    placeholder="0.0"
                    id="amount"
                    step="any"
                    min="0"
                    textAlign="right"
                    border="none"
                    isReadOnly
                    pointerEvents="none"
                    bg="whiteAlpha.50"
                    value="0"
                    borderRight="1px solid #262626"
                  />
                  <InputRightAddon border="none" bg="whiteAlpha.100" children="snxUSD" />
                </InputGroup>
              </Flex>

              <Flex alignItems="center">
                <Text fontSize="xs" textAlign="right" ml="auto" color="gray.300">
                  Fee: $0 <InfoOutlineIcon ml="1" transform="translateY(-1px)" />
                </Text>
              </Flex>
            </form>
          </Box>

          {hasWalletConnected ? (
            <Button size="lg" px="8" type="submit">
              Transfer
            </Button>
          ) : (
            <Button size="lg" px="8">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Container>
    </>
  );
};
