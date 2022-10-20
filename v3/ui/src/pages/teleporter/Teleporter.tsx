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
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import Head from 'react-helmet';
import { useNetwork } from 'wagmi';
import { NumberInput } from '../../components/accounts/Position/Manage/NumberInput';
import { Balance } from '../../components/accounts/Stake/Balance';
import { useContract } from '../../hooks';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { contracts } from '../../utils/constants';

const teleportChains = [
  {
    id: 5,
    logo: 'testnet.png',
    label: 'Goerli',
  },
  {
    id: 420,
    logo: 'testnet.png',
    label: 'Optimism Goerli',
  },
];

export const Teleporter = () => {
  const [amount, setAmount] = useState(0);

  const [from, setFrom] = useState(teleportChains[0].id);
  const [to, setTo] = useState(teleportChains[1].id);

  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  const snxProxy = useContract(contracts.SNX_USD_PROXY, from);
  const balance = useTokenBalance(snxProxy?.address, from);

  const fromChain = useMemo(() => teleportChains.find((chain) => chain.id === from), [from]);
  const toChain = useMemo(() => teleportChains.find((chain) => chain.id === to), [to]);

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
                    minWidth="200px"
                    borderWidth="1px"
                    borderColor="gray.800"
                    borderRadius="6px"
                    alignItems="center"
                    cursor="pointer"
                    type="button"
                  >
                    <Flex alignItems="center" justify="space-between" mx={2}>
                      <Flex>
                        <Image
                          alt={fromChain?.label}
                          width="24px"
                          height="24px"
                          mr={2}
                          src={`/images/${fromChain?.logo}`}
                        />
                        <Text fontWeight="600">{fromChain?.label}</Text>
                      </Flex>
                      <ChevronDownIcon opacity="0.66" w="5" h="5" />
                    </Flex>
                  </MenuButton>
                  <MenuList background="black">
                    {teleportChains.map((chain) => (
                      <MenuItem
                        onClick={() => {
                          if (to === chain.id) {
                            const id = teleportChains.find((item) => item.id !== to)?.id;
                            if (!id) {
                              return;
                            }
                            setTo(id);
                          }
                          setFrom(chain.id);
                        }}
                        display="flex"
                        alignItems="center"
                        key={chain.id}
                      >
                        <Image
                          alt={chain.label}
                          width="24px"
                          height="24px"
                          mr={2}
                          src={`/images/${chain.logo}`}
                        />

                        <Text fontWeight="600">{chain.label}</Text>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                <InputGroup size="lg" ml="6">
                  <NumberInput
                    flex="1"
                    type="number"
                    placeholder="0.0"
                    id="amount"
                    step="any"
                    min="0"
                    textAlign="right"
                    borderColor="gray.800"
                    value={amount}
                    onChange={setAmount}
                    border="1px"
                    max={balance.formatedValue}
                    borderRightRadius="none"
                  />
                  <InputRightAddon borderColor="gray.800" bg="whiteAlpha.100">
                    snxUSD
                  </InputRightAddon>
                </InputGroup>
              </Flex>

              <Flex alignItems="center" justifyContent="flex-end">
                <Balance
                  balance={balance.value}
                  decimals={balance.decimals}
                  symbol="snxUsd"
                  address={snxProxy?.address}
                />
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
                    minWidth="200px"
                    borderWidth="1px"
                    borderColor="gray.800"
                    borderRadius="6px"
                    alignItems="center"
                    cursor="pointer"
                    type="button"
                  >
                    <Flex alignItems="center" justify="space-between" mx={2}>
                      <Flex>
                        <Image
                          alt={toChain?.label}
                          width="24px"
                          height="24px"
                          mr={2}
                          src={`/images/${toChain?.logo}`}
                        />
                        <Text fontWeight="600">{toChain?.label}</Text>
                      </Flex>
                      <ChevronDownIcon opacity="0.66" w="5" h="5" />
                    </Flex>
                  </MenuButton>
                  <MenuList background="black">
                    {teleportChains.map((chain) => (
                      <MenuItem
                        onClick={() => {
                          if (from === chain.id) {
                            const id = teleportChains.find((item) => item.id !== from)?.id;
                            if (!id) {
                              return;
                            }
                            setFrom(id);
                          }
                          setTo(chain.id);
                        }}
                        display="flex"
                        alignItems="center"
                        key={chain.id}
                      >
                        <Image
                          alt={chain.label}
                          width="24px"
                          height="24px"
                          mr={2}
                          src={`/images/${chain.logo}`}
                        />

                        <Text fontWeight="600">{chain.label}</Text>
                      </MenuItem>
                    ))}
                  </MenuList>
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
                    borderRight="1px solid #262626"
                    value={amount}
                  />
                  <InputRightAddon border="none" bg="whiteAlpha.100">
                    snxUSD
                  </InputRightAddon>
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
