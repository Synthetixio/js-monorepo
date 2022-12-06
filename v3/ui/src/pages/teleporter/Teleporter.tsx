import { ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons';
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
  useToast,
  Stack,
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useMemo, useState } from 'react';
import Head from 'react-helmet';
import { useSetRecoilState } from 'recoil';
import { useAccount, useContractWrite, useNetwork, useSwitchNetwork } from 'wagmi';
import { NumberInput } from '../../components/accounts/Position/Manage/NumberInput';
import { Balance } from '../../components/accounts/Deposit/Balance';
import { routeToChain } from '../../components/NetworkChain';
import { Transaction } from '../../components/shared/TransactionReview/TransactionReview.types';
import { useContract } from '../../hooks';
import { useApprove } from '../../hooks/useApprove';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { contracts } from '../../utils/constants';
import { transactionState } from '../../utils/state';
import testnetIcon from './testnet.png';

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

const encodeAddress = (address: string | undefined) => {
  return address ? ethers.utils.defaultAbiCoder.encode(['address'], [address]) : undefined;
};

export const Teleporter = () => {
  const { address } = useAccount();
  const toast = useToast();
  const setTransaction = useSetRecoilState(transactionState);
  const { openConnectModal } = useConnectModal();
  const [amount, setAmount] = useState(0);

  const { switchNetwork } = useSwitchNetwork({
    onSuccess: (data) => {
      routeToChain(location.pathname, data.id);
    },
  });

  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  const teleportChains = chains.sort((chain) => (chain.id === activeChain?.id ? -1 : 1));

  const [from, setFrom] = useState(teleportChains[0].id);
  const [to, setTo] = useState(teleportChains[1].id);

  const CCIP = useContract(contracts.CCIP, from);
  const snxUsdProxy = useContract(contracts.SNX_USD_PROXY, from);
  const balance = useTokenBalance(snxUsdProxy?.address, from);

  const fromChain = useMemo(() => chains.find((chain) => chain.id === from), [from]);
  const toChain = useMemo(() => chains.find((chain) => chain.id === to), [to]);

  const { writeAsync: ccipSend, isLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: CCIP!.address,
    contractInterface: CCIP!.abi,
    functionName: 'ccipSend',
    args: [
      to,
      [
        encodeAddress(address),
        '0x',
        [snxUsdProxy!.address],
        [ethers.utils.parseEther(amount.toString())],
        100000,
      ],
    ],
  });

  const { approve, requireApproval } = useApprove(
    snxUsdProxy?.address,
    ethers.utils.parseEther(amount.toString()),
    CCIP!.address
  );

  const submit = async () => {
    const transactions: Transaction[] = [];

    if (requireApproval) {
      transactions.push({
        title: 'Approve snxUSD transfer',
        call: async (infiniteApproval) => await approve(infiniteApproval),
        checkboxLabel: requireApproval
          ? `Approve unlimited snxUSD transfers to Synthetix.`
          : undefined,
      });
    }

    transactions.push({
      title: 'Teleport snxUSD',
      subtitle: `This will transfer your snxUSD to the ${toChain?.label} network.`,
      call: async () => {
        const txReceipt = await ccipSend();
        toast.closeAll();
        toast({
          title: 'Teleportation initiated',
          description: 'Your balance on the destination chain will be updated in a few minutes.',
          status: 'info',
          isClosable: true,
          duration: 9000,
        });
        setAmount(0);
        await txReceipt.wait();
        balance.refetch();
      },
    });

    setTransaction({
      transactions,
      isOpen: true,
    });
  };

  return (
    <>
      <Head>
        <title>Teleport snxUSD</title>
      </Head>
      <Container maxW="lg">
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
            <form>
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
                        <Image
                          alt={chain.label}
                          width="24px"
                          height="24px"
                          mr={2}
                          src={chain.logo}
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
              </Stack>

              <Flex alignItems="center" justifyContent="flex-end">
                <Balance
                  onMax={(balance) => setAmount(parseFloat(balance) || 0)}
                  balance={balance.value}
                  decimals={balance.decimals}
                  symbol="snxUsd"
                  address={snxUsdProxy?.address}
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
                        <Image
                          alt={chain.label}
                          width="24px"
                          height="24px"
                          mr={2}
                          src={chain.logo}
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
              </Stack>

              <Flex alignItems="center">
                <Text fontSize="xs" textAlign="right" ml="auto" color="gray.300">
                  Fee: $0 {/*<InfoOutlineIcon ml="1" transform="translateY(-1px)" />*/}
                </Text>
              </Flex>
            </form>
          </Box>

          {hasWalletConnected ? (
            <Button
              onClick={async () => {
                toast.closeAll();
                if (activeChain?.id !== from) {
                  toast({
                    title: 'Connect to ' + fromChain?.label,
                    description: `Please connect to ${fromChain?.label} network`,
                    status: 'info',
                    isClosable: true,
                  });
                  switchNetwork?.(420);
                } else {
                  await submit();
                }
              }}
              size="lg"
              px="8"
              type="submit"
              disabled={activeChain?.id === from && amount <= 0}
              isLoading={isLoading}
            >
              {activeChain?.id !== from ? 'Switch to ' + fromChain?.label : 'Teleport'}
            </Button>
          ) : (
            <Button onClick={openConnectModal} size="lg" px="8">
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Container>
    </>
  );
};
