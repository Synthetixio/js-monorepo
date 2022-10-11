import { chainIdState, collateralTypesState } from '../../../utils/state';
import { poolsData, getChainById } from '../../../utils/constants';
import { useSynthetixRead } from '../../../hooks';
import EditPosition from '../EditPosition';
import { Balance } from './Balance';
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
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { BigNumber, ethers } from 'ethers';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useNetwork } from 'wagmi';
import { CollateralType, StakingPositionType } from '../../../utils/types';
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { FC } from 'react';
import { useStake } from '../../../hooks/useStake';

type FormType = {
  collateralType: CollateralType;
  amount: string;
  poolId: string;
};

interface Props {
  accountId?: string;
  stakingPositions?: Record<string, StakingPositionType>;
}

export const Stake: FC<Props> = ({ accountId, stakingPositions = {} }) => {
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);
  const [collateralTypes] = useRecoilState(collateralTypesState);

  const { data: poolId } = useSynthetixRead({
    functionName: 'getPreferredPool',
  });
  // on loading dropdown and token amount maybe use https://chakra-ui.com/docs/components/feedback/skeleton

  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      collateralType: collateralTypes[0],
      poolId: poolId?.toString() ?? '0',
    },
  });
  const { handleSubmit, register, formState, reset, control, setValue } = methods;

  const { isOpen: isOpenPool, onOpen: onOpenPool, onClose: onClosePool } = useDisclosure();

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

  const balanceData = useTokenBalance(
    isNativeCurrency ? undefined : selectedCollateralType.address
  );

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

  const { createAccount, isLoading, multiTxn } = useStake({
    accountId,
    stakingPositions,
    amount,
    selectedCollateralType,
    selectedPoolId,
    poolId: poolId?.toString(),
    reset: () =>
      reset({
        collateralType: selectedCollateralType,
        poolId: selectedPoolId,
        amount: '',
      }),
  });
  return (
    <>
      <FormProvider {...methods}>
        <Box bg="whiteAlpha.200" mb="8" p="6" pb="4" borderRadius="12px">
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
                min="0"
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
                  <Balance
                    balance={balanceData?.value}
                    decimals={selectedCollateralType.decimals}
                    symbol={selectedCollateralType.symbol}
                    onMax={(balance) => setValue('amount', balance)}
                    address={selectedCollateralType.address}
                  />
                </Box>
              )}

              {Boolean(accountId) ? (
                <Text fontSize="xs" textAlign="right" ml="auto">
                  Pool:{' '}
                  {selectedPoolId
                    ? poolsData[selectedPoolId]
                      ? poolsData[selectedPoolId]?.name
                      : 'Unknown Pool'
                    : 'None'}{' '}
                  <Link color="cyan.500">
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
                <Button size="sm"  w="100%" mt="8">
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
};
