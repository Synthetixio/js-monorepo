import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { MultipleTransactionReview } from './MultipleTransactionReview';
import { useClearTransactionState, useTransactionState } from '@snx-v3/useTransactionState';

export function MultipleTransactionModal() {
  const { data: transactionState } = useTransactionState();
  const clearTransactionState = useClearTransactionState();

  return (
    <Modal
      size="lg"
      isOpen={Boolean(transactionState?.isOpen)}
      onClose={clearTransactionState}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Complete this action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">Please execute the following transactions:</Text>
          <MultipleTransactionReview onSuccess={clearTransactionState} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
