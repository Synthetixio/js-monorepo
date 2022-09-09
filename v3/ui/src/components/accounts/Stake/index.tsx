import { accountsState, chainIdState, collateralTypesState } from '../../../utils/state';
import { contracts, poolsData, getChainById } from '../../../utils/constants';
import { useContract, useSynthetixRead } from '../../../hooks';
import EditPosition from '../EditPosition';
import Balance from './Balance';
import CollateralTypeSelector from './CollateralTypeSelector';
import HowItWorks from './HowItWorks';
import { EditIcon, InfoOutlineIcon, LockIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { BigNumber, CallOverrides, ethers, utils } from 'ethers';
import { useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { CollateralType, StakingPositionType } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';
import { MulticallCall, useMulticall } from '../../../hooks/useMulticall2';
import { useApproveCall } from '../../../hooks/useApproveCall';

type FormType = {
  collateralType: CollateralType;
  amount: string;
  poolId: string;
};

export default function Stake({
  accountId,
  stakingPositions = {},
}: {
  accountId?: string;
  stakingPositions?: Record<string, StakingPositionType>;
}) {
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);
  const [collateralTypes] = useRecoilState(collateralTypesState);

  const { data: poolId } = useSynthetixRead({
    functionName: 'getPreferredPool',
  });
  // on loading dropdown and token amount maybe use https://chakra-ui.com/docs/components/feedback/skeleton
  const toast = useToast({
    isClosable: true,
    duration: 9000,
  });
  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      collateralType: collateralTypes[0],
      poolId: poolId?.toString() ?? '0',
    },
  });
  const { handleSubmit, register, formState, reset, control } = methods;

  const collateralContract = useContract(contracts.SNX_TOKEN);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  const { isOpen: isOpenPool, onOpen: onOpenPool, onClose: onClosePool } = useDisclosure();

  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();

  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);
  const selectedCollateralType = useWatch({
    control,
    name: 'collateralType',
  });
  const selectedPoolId = useWatch({
    control,
    name: 'poolId',
  });
  const amount = useWatch({
    control,
    name: 'amount',
  });

  const isNativeCurrency = selectedCollateralType.symbol === chain?.nativeCurrency?.symbol;

  const { address: accountAddress } = useAccount();
  const [{ refetchAccounts }] = useRecoilState(accountsState);
  const { data: balanceData } = useBalance({
    addressOrName: accountAddress,
    token: isNativeCurrency ? undefined : selectedCollateralType.address,
    enabled: hasWalletConnected,
  });

  const amountBN = Boolean(amount)
    ? ethers.utils.parseUnits(amount, selectedCollateralType.decimals)
    : BigNumber.from(0);

  const generateAccountId = () => {
    return Math.floor(Math.random() * 10000000000);
  }; // ten digit numberf
  const newAccountId = useMemo(() => generateAccountId(), []);

  const calls: MulticallCall[] = useMemo(() => {
    const id = accountId ?? newAccountId;
    const key = `${selectedPoolId}-${selectedCollateralType.symbol}`;
    const currentStakingPosition = stakingPositions[key];

    const amountToDelegate = Boolean(accountId)
      ? currentStakingPosition?.collateralAmount.add(amountBN)
      : amountBN;

    if (!snxProxy) return [];

    const createAccountCall: MulticallCall[] = [
      {
        contract: snxProxy.contract,
        functionName: 'createAccount',
        callArgs: [newAccountId],
      },
    ];
    const stakingCalls: MulticallCall[] = [
      {
        contract: snxProxy.contract,
        functionName: 'depositCollateral',
        callArgs: [id, selectedCollateralType.address, amountBN],
      },
      {
        contract: snxProxy.contract,
        functionName: 'delegateCollateral',
        callArgs: [
          id,
          Boolean(accountId) ? selectedPoolId : poolId || 0,
          selectedCollateralType.address,
          amountToDelegate || 0,
          utils.parseEther('1'),
        ],
      },
    ];

    return Boolean(accountId) ? stakingCalls : [...createAccountCall, ...stakingCalls];
  }, [
    accountId,
    amountBN,
    poolId,
    newAccountId,
    selectedCollateralType.address,
    selectedCollateralType.symbol,
    selectedPoolId,
    snxProxy,
    stakingPositions,
  ]);

  const overrides: CallOverrides = {};

  // add extra step to convert to wrapped token if native (ex. ETH)
  // if (isNativeCurrency) {
  //   calls[0].unshift([
  //     collateralContract!.contract,
  //     'deposit',
  //     [],
  //     { value: amount || 0 },
  //   ]);
  //   overrides.value = amount!;
  // }

  const multiTxn = useMulticall(calls, overrides, {
    onMutate: () => {
      toast.closeAll();
      toast({
        title: 'Create your account',
        description: "You'll be redirected once your account is created.",
        status: 'info',
        isClosable: true,
        duration: 9000,
      });
    },
    onSuccess: async () => {
      toast.closeAll();
      reset({
        collateralType: selectedCollateralType,
        poolId: selectedPoolId,
        amount: '',
      });
      await Promise.all([refetchAccounts!({ cancelRefetch: Boolean(accountId) })]);
      if (!Boolean(accountId)) {
        navigate(`/accounts/${newAccountId}?chain=${chain?.network}`);
      } else {
        // TODO: get language from noah
        toast({
          title: 'Success',
          description: 'Your staked collateral amounts have been updated.',
          status: 'success',
          duration: 5000,
        });
      }
    },
    onError: () => {
      toast({
        title: 'Could not complete account creation',
        description: 'Please try again.',
        status: 'error',
      });
    },
  });

  const { exec: createAccount, isLoading } = useApproveCall(
    collateralContract!.contract.address,
    amountBN,
    snxProxy?.address,
    multiTxn.exec,
    {
      onMutate: () => {
        toast({
          title: 'Approve collateral for transfer',
          description: 'The next transaction will create your account and stake this collateral.',
          status: 'info',
        });
      },
      onError: () => {
        toast.closeAll();
        toast({
          title: 'Approval failed',
          description: 'Please try again.',
          status: 'error',
        });
      },
    }
  );

  return (
    <>
      <FormProvider {...methods}>
        <Box bg="gray.900" mb="8" p="6" pb="4" borderRadius="12px">
          <form
            onSubmit={handleSubmit((_data) => {
              createAccount();
            })}
          >
            <Flex mb="3">
              <Input
                flex="1"
                type="number"
                size="lg"
                border="none"
                placeholder="0.0"
                mr="4"
                id="amount"
                {...register('amount', {
                  validate: {
                    sufficientPools: (v) => {
                      const amountBN = Boolean(v)
                        ? ethers.utils.parseUnits(v, selectedCollateralType.decimals)
                        : BigNumber.from(0);
                      return balanceData && balanceData.value.gte(amountBN);
                    },
                    nonZero: (v) => Boolean(v) && v !== '0',
                  },
                })}
              />
              <CollateralTypeSelector collateralTypes={collateralTypes} />
              {false && (
                <Tooltip label="Configure Lock Duration">
                  <IconButton
                    ml="3"
                    bg="blue.900"
                    color="blue.200"
                    border="1px solid rgba(255,255,255,0.33)"
                    size="lg"
                    aria-label="Configure Staking Position"
                    icon={<LockIcon />}
                  />
                </Tooltip>
              )}
              {/*
              <Tooltip label="Configure Lock">
                <IconButton onClick={onOpenLock} ml="3" bg="transparent" border="1px solid rgba(255,255,255,0.33)" size="lg" aria-label='Configure Lock' icon={<LockIcon />} />
              </Tooltip>
            */}
              {hasWalletConnected ? (
                <Button
                  isLoading={multiTxn.status === 'pending' || isLoading}
                  isDisabled={!formState.isValid}
                  size="lg"
                  colorScheme="blue"
                  ml="4"
                  px="8"
                  type="submit"
                >
                  {/* @ts-ignore */}
                  {formState.errors.amount?.type === 'sufficientPools'
                    ? 'Insufficient Pools'
                    : 'Stake'}
                </Button>
              ) : (
                <Button
                  size="lg"
                  colorScheme="blue"
                  ml="4"
                  px="8"
                  onClick={() => openConnectModal && openConnectModal()}
                >
                  Connect Wallet
                </Button>
              )}
            </Flex>

            <Flex alignItems="center">
              {hasWalletConnected && (
                <Box>
                  <Balance balance={balanceData?.value || ethers.BigNumber.from(0)} />
                </Box>
              )}

              {Boolean(accountId) ? (
                <Text fontSize="xs" textAlign="right" ml="auto">
                  Pool:{' '}
                  {selectedPoolId
                    ? poolsData[selectedPoolId]
                      ? poolsData[selectedPoolId].name
                      : 'Unknown Pool'
                    : 'None'}{' '}
                  <Link color="blue.400">
                    <EditIcon onClick={onOpenPool} style={{ transform: 'translateY(-2px)' }} />
                  </Link>
                </Text>
              ) : (
                <Text fontSize="xs" textAlign="right" ml="auto">
                  Receive an snxAccount token{' '}
                  <Tooltip
                    textAlign="center"
                    label="You will be minted an NFT that represents your account. You can easily transfer it between wallets."
                  >
                    <InfoOutlineIcon transform="translateY(-1.5px)" />
                  </Tooltip>
                </Text>
              )}
            </Flex>
          </form>
        </Box>

        <Modal size="2xl" isOpen={isOpenPool} onClose={onClosePool}>
          <ModalOverlay />
          <ModalContent bg="black" color="white">
            <ModalHeader>Select Pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditPosition onClose={onClosePool} />
              {/*
              <Heading size="sm" mb="3">Leverage</Heading>
              <Grid templateColumns='repeat(12, 1fr)' gap={6} alignItems="center" mb="6">
                <GridItem colSpan="3">
                  <InputGroup>
                    <InputLeftAddon bg="black">&times;</InputLeftAddon>
                    <Input id='amount' type='amount' borderLeft="none" value="1" />
                  </InputGroup>
                </GridItem>
                <GridItem colSpan="9">
                  <Text fontSize="sm">Leveraging your staking position allows you to earn more rewards, but your c-ratio is subject to greater volatiity. <em>Use leverage with caution.</em></Text>
                </GridItem>
              </Grid>
            */}
            </ModalBody>
          </ModalContent>
        </Modal>
      </FormProvider>
      {!Boolean(accountId) && <HowItWorks selectedCollateralType={selectedCollateralType} />}
      {/*
      <Modal size="2xl" isOpen={isOpenLock} onClose={onCloseLock}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Manage Lock [WIP]</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
              <GridItem mb="4">
                Lock your staked SNX tokens to increase your rewards, fees, and
                voting power. Benefits scale the longer you lock.
              </GridItem>
              <GridItem mb="4">
                <Heading mb="1.5" size="sm">
                  Locked SNX
                </Heading>
                <Progress
                  mb="1"
                  value="23"
                  colorScheme="green"
                  size="sm"
                  borderRadius="4"
                />
                <Text fontSize="xs">
                  Total Locked SNX: 2.3MM
                  <br />
                  SNX Floating Supply: 8.2MM
                </Text>
              </GridItem>
            </Grid>

            <Heading mb="2" size="md">
              Lock Collateral
            </Heading>

            <Heading mb="2" size="md">
              Extend Lock
            </Heading>

            <Grid mb="2" templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem mb="4">
                <FormControl>
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <InputGroup size="sm">
                    <Input id="amount" type="amount" />
                    <InputRightAddon color="black">SNX</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem mb="4">
                <FormControl mb="6">
                  <FormLabel htmlFor="name">Lock Duration</FormLabel>
                  <ButtonGroup
                    size="sm"
                    isAttached
                    colorScheme="blue"
                    variant="outline"
                  >
                    <Button mr="-px">1W</Button>
                    <Button mr="-px">1M</Button>
                    <Button mr="-px">3M</Button>
                    <Button mr="-px">6M</Button>
                    <Button mr="-px">1Y</Button>
                    <Button mr="-px">2Y</Button>
                    <IconButton aria-label="Custom" icon={<CalendarIcon />} />
                  </ButtonGroup>
                </FormControl>
              </GridItem>
              <GridItem mb="4">
                <Button size="sm" colorScheme="blue" w="100%" mt="8">
                  Lock
                </Button>
              </GridItem>
            </Grid>

            <Heading mb="2" size="md">
              Unlock
            </Heading>

            <Text>
              You can unlock your collateral early, allowing you to unstake it,
              but will incur a penalty of <strong>50%</strong>. The penalized
              collateral is liquidated.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      */}
    </>
  );
}
