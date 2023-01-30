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
} from '@chakra-ui/react';
import { Amount } from '@snx-v3/Amount';
import Wei from '@synthetixio/wei';
import { TransactionStatus } from '@snx-v3/txnReducer';
import { CheckIcon, CloseIcon } from '@snx-v3/Multistep';
import { PropsWithChildren } from 'react';

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
  if (txnStatus === 'error') return 'red.400';
  if (txnStatus === 'success') return 'green.500';
  return 'gray.700';
};
export const RepayTxnModal: React.FC<{
  onClose: () => void;
  amount: Wei;
  txnStatus: TransactionStatus;
  executeTransaction: () => void;
  txnModalOpen: boolean;
}> = ({ onClose, amount, txnStatus, executeTransaction, txnModalOpen }) => {
  return (
    <Modal size="lg" isOpen={txnModalOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
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
              Repay <Amount value={amount} suffix={` snxUSD`} />
            </Text>
          </Flex>
          <Button
            disabled={txnStatus === 'pending'}
            onClick={() => {
              if (txnStatus === 'unsent') {
                executeTransaction();
              }
              if (txnStatus === 'success') {
                onClose();
              }
            }}
            width="100%"
            my="4"
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
