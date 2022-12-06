import { collateralTypesState } from '../../../utils/state';
import { poolsData } from '../../../utils/constants';
import { useSynthetixRead } from '../../../hooks';
import EditPosition from '../EditPosition';
import { Balance } from './Balance';
import CollateralTypeSelector from './CollateralTypeSelector';
import { EditIcon, InfoOutlineIcon, LockIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Stack,
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
import { CollateralType, LiquidityPositionType } from '../../../utils/types';
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { FC } from 'react';
import { useDeposit } from '../../../hooks/useDeposit';

type FormType = {
  collateralType: CollateralType;
  amount: string;
  poolId: string;
};

interface Props {
  accountId?: string;
  liquidityPositions?: Record<string, LiquidityPositionType>;
  refetch?: () => void;
}

export const Deposit: FC<Props> = ({ accountId, liquidityPositions = {}, refetch }) => {
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

  const isNativeCurrency = selectedCollateralType.symbol === 'eth';

  const balanceData = useTokenBalance(selectedCollateralType.address);

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

  const onSuccess = () => {
    reset({
      collateralType: selectedCollateralType,
      poolId: selectedPoolId,
      amount: '',
    });
    refetch?.();
    balanceData.refetch();
  };
  const { isLoading, multiTxn, createAccount } = useDeposit({
    accountId,
    liquidityPositions,
    amount,
    selectedCollateralType,
    selectedPoolId,
    poolId: poolId?.toString(),
    isNativeCurrency,
    onSuccess,
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
            <Stack direction={['column', 'column', 'row']} spacing="20px" mb="3">
              <Input
                minHeight="48px"
                flex="1"
                type="number"
                size="lg"
                border="none"
                placeholder="0.0"
                id="amount"
                step="any"
                min="0"
                {...register('amount', {
                  validate: {
                    insufficientBalance: (v) => {
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
                    aria-label="Configure Depositing Position"
                    icon={<LockIcon />}
                  />
                </Tooltip>
              )}
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
                  {formState.errors.amount?.type === 'insufficientBalance'
                    ? 'Insufficient Balance'
                    : 'Deposit'}
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
            </Stack>

            <Stack
              direction={['column-reverse', 'column-reverse', 'row']}
              spacing="10px"
              alignItems="center"
            >
              <Box mr="auto">
                <Balance
                  balance={balanceData?.value}
                  decimals={selectedCollateralType.decimals}
                  symbol={selectedCollateralType.symbol}
                  onMax={(balance) => setValue('amount', balance)}
                  address={selectedCollateralType.address}
                />
              </Box>

              {Boolean(accountId) ? (
                <Text fontSize="xs" ml="auto">
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
                <Text fontSize="xs" ml="auto">
                  Receive an snxAccount token{' '}
                  <Tooltip label="You will be minted an NFT that represents your account. You can easily transfer it between wallets.">
                    <InfoOutlineIcon transform="translateY(-1px)" />
                  </Tooltip>
                </Text>
              )}
            </Stack>
          </form>
        </Box>

        <Modal size="2xl" isOpen={isOpenPool} onClose={onClosePool}>
          <ModalOverlay />
          <ModalContent bg="black" color="white">
            <ModalHeader>Select Pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditPosition onClose={onClosePool} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </FormProvider>
    </>
  );
};
