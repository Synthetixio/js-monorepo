import React, { PropsWithChildren, ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import { theme } from '@synthetixio/v3-theme';
import { useTranslation } from 'react-i18next';

type Props = { isOpen: boolean; onClose?: () => void; title: string; icon?: ReactNode };

export const TransactionModal = ({
  isOpen,
  onClose = () => {},
  title,
  children,
  icon,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgGradient={theme.gradients['dark'][500]} pt="10" pb="3">
        <ModalCloseButton />
        {icon && <Box alignSelf="center">{icon}</Box>}
        <ModalHeader pb="1" textAlign="center">
          {title}
        </ModalHeader>
        <ModalBody textAlign="center" fontSize="xs" color="gray.600">
          {t('staking-v2.transaction-modal.metamask-note')}
        </ModalBody>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
