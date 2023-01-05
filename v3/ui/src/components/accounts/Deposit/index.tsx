import EditPosition from '../EditPosition';
import { parseUnits } from '@snx-v3/format';
import { Balance } from './Balance';
import CollateralTypeSelector from './CollateralTypeSelector';
import { EditIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useNetwork } from 'wagmi';
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { FC } from 'react';
import { useDeposit } from '../../../hooks/useDeposit';
import { useCollateralTypes, CollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';
import { usePools } from '@snx-v3/usePools';
import { usePreferredPool } from '@snx-v3/usePreferredPool';

type FormType = {
  collateralType: CollateralType;
  amount: string;
  poolId: string;
};

function ConnectWallet() {
  const { openConnectModal } = useConnectModal();
  return (
    <Button size="lg" px="8" onClick={() => openConnectModal && openConnectModal()}>
      Connect Wallet
    </Button>
  );
}

export const DepositForm: FC<{
  accountId?: string;
  liquidityPositions?: LiquidityPositionsById;
  refetch?: () => void;
  preferredPoolId: string;
  collateralTypes: CollateralType[];
}> = ({ accountId, preferredPoolId, collateralTypes, liquidityPositions = {}, refetch }) => {
  const { data: pools } = usePools();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);

  // on loading dropdown and token amount maybe use https://chakra-ui.com/docs/components/feedback/skeleton

  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      collateralType: collateralTypes?.[0],
      poolId: preferredPoolId,
    },
  });
  const { handleSubmit, register, formState, reset, control, setValue } = methods;

  const { isOpen: isOpenPool, onOpen: onOpenPool, onClose: onClosePool } = useDisclosure();

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

  const isNativeCurrency = selectedCollateralType?.symbol === 'ETH';
  const balanceData = useTokenBalance(selectedCollateralType?.tokenAddress);

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
    poolId: preferredPoolId,
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
                      const amountBN = Boolean(v) ? parseUnits(v) : BigNumber.from(0);
                      return balanceData && balanceData.value.gte(amountBN);
                    },
                    nonZero: (v) => Boolean(v) && v !== '0',
                  },
                })}
              />
              <CollateralTypeSelector collateralTypes={collateralTypes || []} />
              {hasWalletConnected ? (
                <Button
                  isLoading={multiTxn.status === 'pending' || isLoading}
                  isDisabled={!formState.isValid}
                  size="lg"
                  ml="4"
                  px="8"
                  type="submit"
                >
                  {formState.errors.amount?.type === 'insufficientBalance'
                    ? 'Insufficient Balance'
                    : 'Deposit'}
                </Button>
              ) : (
                <Box ml="4">
                  <ConnectWallet />
                </Box>
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
                  symbol={selectedCollateralType.symbol}
                  onMax={(balance) => setValue('amount', balance)}
                  address={selectedCollateralType.tokenAddress}
                />
              </Box>

              {Boolean(accountId) ? (
                <Text fontSize="xs" ml="auto">
                  Pool:{' '}
                  {selectedPoolId ? pools?.find((x) => x.id === selectedPoolId)?.name : 'None'}{' '}
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

export const Deposit: FC<{
  accountId?: string;
  liquidityPositions: LiquidityPositionsById;
  refetch: () => void;
}> = ({ accountId, liquidityPositions = {}, refetch }) => {
  const { data: collateralTypes } = useCollateralTypes();
  const { data: preferredPool } = usePreferredPool();
  const { chain: activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);
  return (
    <>
      {collateralTypes && collateralTypes.length > 0 && preferredPool ? (
        <DepositForm
          accountId={accountId}
          liquidityPositions={liquidityPositions}
          refetch={refetch}
          preferredPoolId={preferredPool.id}
          collateralTypes={collateralTypes}
        />
      ) : null}
      {collateralTypes?.length === 0 && !hasWalletConnected ? (
        <Box textAlign="center">
          <ConnectWallet />
        </Box>
      ) : null}
    </>
  );
};
