import { FC } from 'react';
import { FailedIcon, TransactionCompleted, TransactionPending } from '@snx-v2/icons';
import { TransactionModal } from '@snx-v2/TransactionModal';
import { TransactionStatus } from '@snx-v3/txnReducer';
import { Button, Center, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { ExternalLink } from '@snx-v2/ExternalLink';
import { useGetTxnLink } from '@snx-v2/txnLink';

export const SelfLiquidationTransactionModal: FC<{
  settle: () => void;
  onSubmit: () => void;
  error: Error | null;
  gasError: Error | null;
  txnStatus: TransactionStatus;
  modalOpen: boolean;
  txnHash: string | null;
  onClose: () => void;
}> = ({ settle, error, txnStatus, modalOpen, txnHash, gasError, onSubmit, onClose }) => {
  const { t } = useTranslation();
  const txnLink = useGetTxnLink(txnHash);
  const transactionLoading = txnStatus === 'pending' || txnStatus === 'prompting';

  return (
    <TransactionModal
      onClose={onClose}
      icon={
        error ? (
          <FailedIcon />
        ) : transactionLoading ? (
          <TransactionPending />
        ) : (
          <TransactionCompleted />
        )
      }
      title={
        transactionLoading
          ? t('staking-v2.transaction-modal.pending')
          : txnStatus === 'success'
          ? t('staking-v2.transaction-modal.completed')
          : t('staking-v2.transaction-modal.error-headline')
      }
      isOpen={modalOpen}
    >
      <Flex flexDirection="column" alignItems="center" bg="black" pt="4" pb="4" mt="4">
        <Text fontWeight={500} color="gray.600">
          {t('staking-v2.self-liquidation.txn-modal.action')}
        </Text>
      </Flex>

      {transactionLoading && (
        <Flex alignItems="center" justifyContent="center" bg="black" pt="4" pb="4" mt="4">
          <Spinner size="sm" mr="3" />
          <Text color="cyan.500" fontWeight={500}>
            {t('staking-v2.transaction-modal.loading')}
          </Text>
        </Flex>
      )}
      {error && (
        <Center pt="4" pb="4" mt="4">
          <FailedIcon width="40px" height="40px" />

          <Text>{parseTxnError(error)}</Text>
        </Center>
      )}
      <Divider borderColor="gray.900" mt="4" mb="4" orientation="horizontal" />
      {!error ? (
        <Center flexDirection="column">
          {txnLink && (
            <ExternalLink href={txnLink} fontSize="sm">
              {t('staking-v2.transaction-modal.etherscan')}
            </ExternalLink>
          )}
          {txnStatus === 'success' && (
            <Button mt={2} onClick={onClose}>
              {t('staking-v2.transaction-modal.close')}
            </Button>
          )}
        </Center>
      ) : (
        <Center>
          <Button onClick={gasError ? settle : onSubmit}>
            {gasError
              ? t('staking-v2.transaction-modal.close')
              : t('staking-v2.transaction-modal.retry')}
          </Button>
        </Center>
      )}
    </TransactionModal>
  );
};
