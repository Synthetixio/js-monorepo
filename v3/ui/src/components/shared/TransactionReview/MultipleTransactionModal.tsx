import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { transactionState } from '../../../utils/state';
import { MultipleTransactionReview } from './MultipleTransactionReview';

export const MultipleTransactionModal: FC = () => {
  const [transaction, setTransaction] = useRecoilState(transactionState);

  const onClose = useCallback(() => {
    setTransaction({
      transactions: [],
      isOpen: false,
    });
  }, [setTransaction]);

  return (
    <Modal size="lg" isOpen={transaction.isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>{transaction.title || 'Complete this action'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">{transaction.subtitle || 'Please execute the following transactions:'}</Text>
          <MultipleTransactionReview onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
