import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import Wei from '@synthetixio/wei';
import { TransactionStatus } from '@snx-v3/txnReducer';
import { CheckIcon, CloseIcon } from '@snx-v3/Multistep';
import { PropsWithChildren, useCallback, useContext } from 'react';
import { useParams } from '@snx-v3/useParams';
import { ManagePositionContext } from '@snx-v3/ManagePositionContext';
import { useCollateralType } from '@snx-v3/useCollateralTypes';
import { useBorrow } from '@snx-v3/useBorrow';
import { useCoreProxy } from '@snx-v3/useCoreProxy';
import { useContractErrorParser } from '@snx-v3/useContractErrorParser';
import { ContractError } from '@snx-v3/ContractError';

function StepIcon({ txnStatus, children }: PropsWithChildren<{ txnStatus: TransactionStatus }>) {
  switch (txnStatus) {
    case 'error':
      return <CloseIcon color="white" />;
    case 'success':
      return <CheckIcon color="white" />;
    case 'prompting':
    case 'pending':
      return <Spinner color="white" width={6} height={6} />;
    default:
      return (
        <Box
          __css={{
            display: 'inline',
            fontWeight: 'medium',
            textAlign: 'center',
            fontSize: 'md',
          }}
        >
          {children}
        </Box>
      );
  }
}

const statusColor = (txnStatus: TransactionStatus) => {
  if (txnStatus === 'error' || txnStatus === 'success') return txnStatus;
  return 'gray.700';
};
export const BorrowModalUi: React.FC<{
  onClose: () => void;
  debtChange: Wei;
  isOpen: boolean;
  txnStatus: TransactionStatus;
  execBorrow: () => void;
}> = ({ onClose, isOpen, debtChange, txnStatus, execBorrow }) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white" data-testid="borrow modal">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            gap={2}
            alignItems="center"
            rounded="lg"
            p="4"
            border="2px solid"
            transitionProperty="border-color"
            transitionDuration="normal"
            borderColor={statusColor(txnStatus)}
          >
            <Flex
              width={10}
              height={10}
              justifyContent="center"
              alignItems="center"
              bg={statusColor(txnStatus)}
              rounded="full"
              transitionProperty="background"
              transitionDuration="normal"
            >
              <StepIcon txnStatus={txnStatus}>1</StepIcon>
            </Flex>
            <Text>
              Borrow <Amount value={debtChange} suffix={` snxUSD`} />
            </Text>
          </Flex>
          <Button
            isDisabled={txnStatus === 'pending'}
            onClick={() => {
              if (txnStatus === 'unsent') {
                execBorrow();
              }
              if (txnStatus === 'success') {
                onClose();
              }
            }}
            width="100%"
            my="4"
            data-testid="borrow confirm button"
          >
            {(() => {
              switch (txnStatus) {
                case 'error':
                  return 'Retry';
                case 'pending':
                  return 'Processing...';
                case 'success':
                  return 'Done';
                default:
                  return 'Start';
              }
            })()}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const BorrowModal: React.FC<{
  onClose: () => void;
  isOpen: boolean;
}> = ({ onClose, isOpen }) => {
  const { debtChange } = useContext(ManagePositionContext);
  const params = useParams();
  const collateralType = useCollateralType(params.collateralSymbol);
  const {
    exec: execBorrow,
    txnState,
    settle: settleBorrow,
  } = useBorrow({
    accountId: params.accountId,
    poolId: params.poolId,
    collateralTypeAddress: collateralType?.tokenAddress,
    debtChange,
  });

  const toast = useToast({ isClosable: true, duration: 9000 });
  const { data: CoreProxy } = useCoreProxy();
  const errorParserCoreProxy = useContractErrorParser(CoreProxy);
  const execBorrowWithErrorParser = useCallback(async () => {
    try {
      await execBorrow();
    } catch (error: any) {
      const contractError = errorParserCoreProxy(error);
      if (contractError) {
        console.error(new Error(contractError.name), contractError);
      }
      toast.closeAll();
      toast({
        title: 'Borrow failed',
        description: contractError ? (
          <ContractError contractError={contractError} />
        ) : (
          'Please try again.'
        ),
        status: 'error',
      });
      throw Error('Borrow failed', { cause: error });
    }
  }, [errorParserCoreProxy, execBorrow, toast]);

  const { txnStatus } = txnState;
  if (!params.poolId || !params.accountId || !collateralType) return null;
  return (
    <BorrowModalUi
      execBorrow={execBorrowWithErrorParser}
      debtChange={debtChange}
      txnStatus={txnStatus}
      onClose={() => {
        settleBorrow();
        onClose();
      }}
      isOpen={isOpen}
    />
  );
};
