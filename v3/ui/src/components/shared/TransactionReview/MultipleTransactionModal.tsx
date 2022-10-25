import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MultipleTransactionReview } from './MultipleTransactionReview';
import { Transaction } from './TransactionReview.types';

interface Props {
  title?: string;
  subtitle?: string;
  transacions: Transaction[];
  isOpen: boolean;
  onClose: () => void;
}

export const MultipleTransactionModal: FC<Props> = ({
  title = 'Complete this action',
  subtitle = 'Please execute the following transactions:',
  isOpen,
  onClose,
  transacions,
}) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="2">{subtitle}</Text>
          <MultipleTransactionReview transacions={transacions} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
