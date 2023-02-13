import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useMemo, useState } from 'react';
import Head from 'react-helmet';
import { useSwitchNetwork } from 'wagmi';
import { NumberInput } from '@snx-v3/NumberInput';
import { Balance } from '@snx-v3/Balance';
import { useContract } from '../../hooks/useContract';
import { useTokenBalance } from '@snx-v3/useTokenBalance';
import { contracts } from '../../utils/constants';
import testnetIcon from './testnet.png';
import { TeleporterModal } from './TeleporterModal';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { wei } from '@synthetixio/wei';

const chains = [
  {
    id: 5,
    logo: testnetIcon,
    label: 'Goerli',
  },
  {
    id: 420,
    logo: testnetIcon,
    label: 'Optimism Goerli',
  },
];

export const Teleporter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();
  const { openConnectModal } = useConnectModal();
  const [amount, setAmount] = useState(wei(0));

  const { switchNetwork } = useSwitchNetwork();
  const network = useNetwork();
  const signer = useSigner();
  const hasWalletConnected = Boolean(signer);

  const teleportChains = chains.sort((chain) => (chain.id === network?.id ? -1 : 1));

  const [from, setFrom] = useState(teleportChains[0].id);
  const [to, setTo] = useState(teleportChains[1].id);

  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY);
  const tokenBalance = useTokenBalance(snxUsdProxy?.address, from);

  const fromChain = useMemo(() => chains.find((chain) => chain.id === from), [from]);
  const toChain = useMemo(() => chains.find((chain) => chain.id === to), [to]);

  return (
    <>
      <Head>
        <title>Teleport snxUSD</title>
      </Head>
      <Container mb="8" maxW="1024px" py="4">
        <Flex height="100%" direction="column" flex="1" py={[4, 6, 12]}>
          <Heading size="lg" mb="3">
            Teleport snxUSD
          </Heading>
          <Text mb="7" color="whiteAlpha.800">
            Transfer snxUSD in your wallet across chains without slippage.
          </Text>

          <Box bg="whiteAlpha.200" p="6" pb="4" borderRadius="12px">
            <Text lineHeight="1" fontSize="sm" fontWeight={600} mb="2.5" color="gray.300">
              From
            </Text>
            <Stack direction={['column', 'column', 'row']} spacing="20px" mb="3">
              <Menu>
                <MenuButton
                  minHeight="48px"
                  minWidth={['0px', '200px']}
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
                        src={fromChain?.logo}
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
                      <Image alt={chain.label} width="24px" height="24px" mr={2} src={chain.logo} />

                      <Text fontWeight="600">{chain.label}</Text>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <InputGroup size="lg" ml="6">
                <NumberInput
                  InputProps={{
                    size: 'lg',
                    type: 'number',
                    placeholder: '0.0',
                    id: 'amount',
                    min: '0',
                    textAlign: 'right',
                    borderColor: 'gray.800',
                    border: '1px',
                    borderTopRightRadius: 'none',
                    borderBottomRightRadius: 'none',
                  }}
                  value={amount}
                  onChange={setAmount}
                  max={tokenBalance.data}
                />
                <InputRightAddon borderColor="gray.800" bg="whiteAlpha.100">
                  snxUSD
                </InputRightAddon>
              </InputGroup>
            </Stack>

            <Flex alignItems="center" justifyContent="flex-end">
              <Balance
                onMax={setAmount}
                balance={tokenBalance.data}
                symbol="snxUSD"
                address={snxUsdProxy?.address}
              />
            </Flex>
          </Box>

          <ArrowDownIcon w={5} h={5} mx="auto" mt="6" mb="5" opacity="0.66" />

          <Box bg="whiteAlpha.200" mb="10" p="6" pb="4" borderRadius="12px">
            <Text lineHeight="1" fontSize="sm" fontWeight={600} mb="2.5" color="gray.300">
              To
            </Text>
            <Stack direction={['column', 'column', 'row']} spacing="20px" mb="3">
              <Menu>
                <MenuButton
                  minHeight="48px"
                  minWidth={['0px', '200px']}
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
                        src={toChain?.logo}
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
                      <Image alt={chain.label} width="24px" height="24px" mr={2} src={chain.logo} />

                      <Text fontWeight="600">{chain.label}</Text>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <InputGroup size="lg" ml="6">
                <NumberInput
                  InputProps={{
                    isReadOnly: true,
                    pointerEvents: 'none',
                    bg: 'whiteAlpha.50',
                    size: 'lg',
                    type: 'number',
                    placeholder: '0.0',
                    id: 'amount',
                    min: '0',
                    textAlign: 'right',
                    border: 'none',
                    borderRight: '1px solid #262626',
                    borderTopRightRadius: 'none',
                    borderBottomRightRadius: 'none',
                  }}
                  value={amount}
                />

                <InputRightAddon border="none" bg="whiteAlpha.100">
                  snxUSD
                </InputRightAddon>
              </InputGroup>
            </Stack>

            <Flex alignItems="center">
              <Text fontSize="xs" textAlign="right" ml="auto" color="gray.300">
                Fee: $0 {/*<InfoOutlineIcon ml="1" transform="translateY(-1px)" />*/}
              </Text>
            </Flex>
          </Box>

          {hasWalletConnected ? (
            <Button
              onClick={async () => {
                toast.closeAll();
                if (network?.id !== from) {
                  toast({
                    title: `Connect to ${fromChain?.label}`,
                    description: `Please connect to ${fromChain?.label} network`,
                    status: 'info',
                    isClosable: true,
                  });
                  switchNetwork?.(420);
                } else {
                  setIsOpen(true);
                }
              }}
              size="lg"
              px="8"
              type="submit"
              disabled={network?.id === from && amount.lte(0)}
            >
              {network?.id !== from ? 'Switch to ' + fromChain?.label : 'Teleport'}
            </Button>
          ) : (
            <Button onClick={openConnectModal} size="lg" px="8">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Container>

      <TeleporterModal amount={amount} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
