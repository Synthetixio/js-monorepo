import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import { BorderBox } from '@snx-v3/BorderBox';
import { BorrowIcon, DollarCircle } from '@snx-v3/icons';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useLiquidityPosition } from '@snx-v3/useLiquidityPosition';
import { useParams } from '@snx-v3/useParams';
import { validatePosition } from '@snx-v3/validatePosition';
import { wei } from '@synthetixio/wei';
import {
  FC,
  FormEvent,
  lazy,
  PropsWithChildren,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Borrow } from './Borrow';
import { Repay } from './Repay';
import { Undelegate } from './Undelegate';
import { Deposit } from './Deposit';
import { z } from 'zod';
import { safeImport } from '@synthetixio/safe-import';

const RepayModal = lazy(() => safeImport(() => import('@snx-v3/RepayModal')));
const BorrowModal = lazy(() => safeImport(() => import('@snx-v3/BorrowModal')));
const DepositModal = lazy(() => safeImport(() => import('@snx-v3/DepositModal')));
const UndelegateModal = lazy(() => safeImport(() => import('@snx-v3/UndelegateModal')));

const validActions = ['borrow', 'deposit', 'repay', 'undelegate'] as const;
const ManageActionSchema = z.enum(validActions);
type ManageAction = z.infer<typeof ManageActionSchema>;

const ActionButton: FC<
  PropsWithChildren<{
    onClick: (action: ManageAction) => void;
    action: ManageAction;
    activeAction?: string;
  }>
> = ({ children, action, activeAction, onClick }) => (
  <BorderBox
    as={Button}
    fontWeight="700"
    fontSize="md"
    color="gray.50"
    _hover={{
      bg: 'whiteAlpha.100',
    }}
    _active={{
      bg: 'whiteAlpha.100',
    }}
    cursor="pointer"
    data-testid="manage action"
    data-action={action}
    data-active={action === activeAction ? 'true' : undefined}
    onClick={() => onClick(action)}
    py={2}
    width="50%"
    textAlign="center"
  >
    {children}
  </BorderBox>
);

const Action: FC<{ manageAction: ManageAction }> = ({ manageAction }) => {
  switch (manageAction) {
    case 'borrow':
      return <Borrow />;
    case 'deposit':
      return <Deposit />;
    case 'repay':
      return <Repay />;
    case 'undelegate':
      return <Undelegate />;

    default:
      return null;
  }
};

const ManageActionUi: FC<{
  setActiveAction: (action: ManageAction) => void;
  manageAction?: ManageAction;
  onSubmit: (e: FormEvent) => void;
}> = ({ setActiveAction, manageAction, onSubmit }) => {
  return (
    <Box as="form" onSubmit={onSubmit}>
      <Flex mt={2} gap={2}>
        <ActionButton onClick={setActiveAction} action="deposit" activeAction={manageAction}>
          <ArrowDownIcon w="15px" h="15px" mr={1} /> Deposit Collateral
        </ActionButton>
        <ActionButton onClick={setActiveAction} action="repay" activeAction={manageAction}>
          <DollarCircle mr={1} /> Repay snxUSD
        </ActionButton>
      </Flex>
      <Flex mt={2} gap={2}>
        <ActionButton onClick={setActiveAction} action="undelegate" activeAction={manageAction}>
          <ArrowUpIcon w="15px" h="15px" mr={1} /> Undelegate Collateral
        </ActionButton>
        <ActionButton onClick={setActiveAction} action="borrow" activeAction={manageAction}>
          <BorrowIcon mr={1} /> Borrow snxUSD
        </ActionButton>
      </Flex>
      {manageAction ? (
        <Flex direction="column" mt={4}>
          <Action manageAction={manageAction} />
        </Flex>
      ) : null}
    </Box>
  );
};
export const ManageAction = () => {
  const params = useParams();
  const [_, setQueryParam] = useSearchParams();
  const [txnModalOpen, setTxnModalOpen] = useState<ManageAction | null>(null);
  const { debtChange, collateralChange, setCollateralChange, setDebtChange } =
    useContext(ManagePositionContext);

  const collateralType = useCollateralType(params.collateralSymbol);
  const liquidityPosition = useLiquidityPosition({
    accountId: params.accountId,
    poolId: params.poolId,
    tokenAddress: collateralType?.tokenAddress,
  });

  const { isValid } = validatePosition({
    issuanceRatioD18: collateralType?.issuanceRatioD18,
    collateralAmount: liquidityPosition.data?.collateralAmount,
    collateralValue: liquidityPosition.data?.collateralValue,
    debt: liquidityPosition.data?.debt,
    collateralChange,
    debtChange,
  });
  const parsedActionParam = ManageActionSchema.safeParse(params.manageAction);
  const parsedAction = parsedActionParam.success ? parsedActionParam.data : null;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!form.reportValidity() || !isValid) {
        return;
      }
      setTxnModalOpen(parsedAction);
    },
    [isValid, parsedAction]
  );

  useEffect(() => {
    // This is just for initial state, if we have a manage action selected return
    if (params.manageAction) return;
    if (!liquidityPosition.data) return;
    if (!collateralType) return;
    const cRatio = liquidityPosition.data.cRatio;
    const canBorrow =
      liquidityPosition.data.debt.eq(0) || cRatio.gt(collateralType.issuanceRatioD18);
    if (canBorrow) {
      setQueryParam({ manageAction: 'borrow' });
      return;
    }
    const cRatioIsCloseToLiqRatio = cRatio.mul(0.9).lt(collateralType.liquidationRatioD18);
    if (cRatioIsCloseToLiqRatio) {
      setQueryParam({ manageAction: 'repay' });
      return;
    }

    setQueryParam({ manageAction: 'deposit' });
  }, [collateralType, liquidityPosition.data, params.manageAction, setQueryParam]);

  return (
    <>
      <ManageActionUi
        onSubmit={onSubmit}
        setActiveAction={(action) => {
          setCollateralChange(wei(0));
          setDebtChange(wei(0));
          setQueryParam({ manageAction: action });
        }}
        manageAction={parsedAction || undefined}
      />
      <Suspense fallback={null}>
        {txnModalOpen === 'repay' ? (
          <RepayModal
            onClose={() => {
              liquidityPosition.refetch();
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'repay'}
          />
        ) : null}
        {txnModalOpen === 'borrow' ? (
          <BorrowModal
            onClose={() => {
              liquidityPosition.refetch();
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'borrow'}
          />
        ) : null}
        {txnModalOpen === 'deposit' ? (
          <DepositModal
            collateralChange={collateralChange}
            onClose={() => {
              liquidityPosition.refetch();
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'deposit'}
          />
        ) : null}
        {txnModalOpen === 'undelegate' ? (
          <UndelegateModal
            onClose={() => {
              liquidityPosition.refetch();
              setCollateralChange(wei(0));
              setDebtChange(wei(0));
              setTxnModalOpen(null);
            }}
            isOpen={txnModalOpen === 'undelegate'}
          />
        ) : null}
      </Suspense>
    </>
  );
};
