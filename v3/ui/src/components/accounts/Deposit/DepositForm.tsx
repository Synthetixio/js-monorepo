import { parseUnits } from '@snx-v3/format';
import { Balance } from '@snx-v3/Balance';
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
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { useDeposit } from '../../../hooks/useDeposit';
import { CollateralType } from '@snx-v3/useCollateralTypes';
import { LiquidityPositionsById } from '@snx-v3/useLiquidityPositions';
import { CollateralTypeSelector } from '@snx-v3/CollateralTypeSelector';
import { PoolSelector } from '@snx-v3/PoolSelector';
import { usePools } from '@snx-v3/usePools';
import { useCallback, useState, FormEvent } from 'react';

export function DepositForm({
  accountId,
  preferredPoolId,
  collateralTypes,
  liquidityPositions = {},
  onSuccess,
}: {
  accountId?: string;
  liquidityPositions?: LiquidityPositionsById;
  onSuccess?: () => void;
  preferredPoolId: string;
  collateralTypes: CollateralType[];
}) {
  const { data: pools } = usePools();

  const { isOpen: isOpenPool, onOpen: onOpenPool, onClose: onClosePool } = useDisclosure();

  const [poolId, setPoolId] = useState(preferredPoolId);
  const [collateralType, setCollateralType] = useState<CollateralType>(collateralTypes?.[0]);
  const [amount, setAmount] = useState('');

  const balanceData = useTokenBalance(collateralType?.tokenAddress);

  const { isLoading, multiTxn, createAccount } = useDeposit({
    accountId,
    liquidityPositions,
    amount,
    selectedCollateralType: collateralType,
    selectedPoolId: poolId,
    poolId: preferredPoolId,
    isWrappedEth: collateralType?.symbol === 'WETH',
    onSuccess: async () => {
      await balanceData.refetch();
      onSuccess?.();
    },
  });

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (form.reportValidity()) {
        await createAccount();
      }
    },
    [createAccount]
  );

  return (
    <>
      <Box
        as="form"
        bg="whiteAlpha.200"
        mb="8"
        p="6"
        pb="4"
        borderRadius="12px"
        onSubmit={onSubmit}
      >
        <Stack direction={['column', 'column', 'row']} spacing="20px" mb="3">
          <Input
            minHeight="48px"
            flex="1"
            type="number"
            size="lg"
            placeholder="0.0"
            id="amount"
            min="0"
            required
            onChange={(e) => {
              setAmount(e.target.value);
              const currentAmount = parseUnits(e.target.value || 0);
              if (currentAmount.gte(balanceData.value.toBN())) {
                e.target.setCustomValidity('Insufficient Balance');
              } else if (currentAmount.gt(0)) {
                e.target.setCustomValidity('');
              } else {
                e.target.setCustomValidity('Value is required');
              }
            }}
          />
          <CollateralTypeSelector
            collateralType={collateralType}
            setCollateralType={setCollateralType}
          />
          <Button
            isLoading={multiTxn.status === 'pending' || isLoading}
            size="lg"
            ml="4"
            px="8"
            type="submit"
          >
            Deposit
          </Button>
        </Stack>

        <Stack
          direction={['column-reverse', 'column-reverse', 'row']}
          spacing="10px"
          alignItems="center"
        >
          <Box mr="auto">
            <Balance
              balance={balanceData?.value}
              symbol={collateralType.symbol}
              onMax={(balance) => setAmount(balance)}
              address={collateralType.tokenAddress}
            />
          </Box>

          {Boolean(accountId) ? (
            <Text fontSize="xs" ml="auto">
              Pool: {poolId ? pools?.find((x) => x.id === poolId)?.name : 'None'}{' '}
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
      </Box>

      <Modal size="2xl" isOpen={isOpenPool} onClose={onClosePool}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Select Pool</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PoolSelector
              poolId={poolId}
              setPoolId={(value: string) => {
                setPoolId(value);
                onClosePool();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
