import React, { FC, useEffect, useState } from 'react';
import {
  ClockIcon,
  FailedIcon,
  TickIcon,
  TransactionCompleted,
  TransactionPending,
} from '@snx-v2/icons';
import { TransactionModal } from '@snx-v2/TransactionModal';
import { Alert, AlertDescription, AlertIcon, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';
import { ExternalLink } from '@snx-v2/ExternalLink';
import { useGetTxnLink } from '@snx-v2/txnLink';
import { useEstimateProveWithdraw } from '../../hooks/useEstimateProveWithdraw';
import { CrossChainMessenger, MessageStatus } from '@eth-optimism/sdk';
import { formatNumber } from '../../utils/formatters/number';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';
import { wei } from '@synthetixio/wei';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import Connector from '../../containers/Connector';
import { useEstimateFinalizeWithdraw } from '../../hooks/useEstimateFinalizeWithdraw';
import { EXTERNAL_LINKS } from '@snx-v2/Constants';
import useBridgingHistoryStore from '../../hooks/useBridgingHistoryStore';

export const ReviewWithdrawModal: FC<{
  crossChainMessenger: CrossChainMessenger;
  modalOpen: boolean;
  title: string;
  amount: number;
  txnHash: string;
  onClose: () => void;
  isL2: boolean;
  isMainnet: boolean;
}> = ({ isL2, isMainnet, crossChainMessenger, modalOpen, title, amount, txnHash, onClose }) => {
  const {
    walletAddress,
    isWalletConnected,
    walletConnectedToUnsupportedNetwork,
    switchNetwork,
    connectWallet,
  } = Connector.useContainer();
  const { bridgingHistory, saveBridgingHistory } = useBridgingHistoryStore({ walletAddress });

  const {
    transactionFee: feeProve,
    isGasEnabledAndNotFetched: isGasEnableAndNotFetchedProve,
    gasError: gasErrorProve,
  } = useEstimateProveWithdraw({ txnHash, crossChainMessenger });

  const {
    transactionFee: feeFinalize,
    isGasEnabledAndNotFetched: isGasEnableAndNotFetchedFinalize,
    gasError: gasErrorFinalize,
  } = useEstimateFinalizeWithdraw({ txnHash, crossChainMessenger });

  const [messageStatus, setMessageStatus] = useState<
    { status: MessageStatus; index: number; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const txnLink = useGetTxnLink(txnHash);

  const executeMessage = async () => {
    if (isL2) {
      switchNetwork(isMainnet ? NetworkIdByName['mainnet'] : NetworkIdByName['goerli']);
      return;
    }
    if (hasError || loading) return;
    try {
      setSubmitting(true);
      console.log('Execute button pressed. Current message status:', messageStatus);
      for (const { status, index } of messageStatus) {
        console.log('Executing message at index:', index);
        if (status === MessageStatus.READY_TO_PROVE) {
          console.log('Proving message...');
          await crossChainMessenger.proveMessage(txnHash, undefined, index);
          console.log('Message proved.');
        } else if (status === MessageStatus.READY_FOR_RELAY) {
          console.log('Relaying message...');
          await crossChainMessenger.finalizeMessage(txnHash, undefined, index);
          console.log('Message relayed.');

          const currentHistory = bridgingHistory.find((e) => e.txnHash === txnHash);
          if (currentHistory) {
            saveBridgingHistory({ ...currentHistory, status: 'success' });
          }
        }
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const hasError = messageStatus.some(
    (message) => message.description === 'Invalid transaction hash'
  );
  const readyToProve = messageStatus.some(
    (message) => message.status === MessageStatus.READY_TO_PROVE
  );
  const readyToRelay = messageStatus.some(
    (message) => message.status === MessageStatus.READY_FOR_RELAY
  );
  const wait7Days =
    readyToProve ||
    messageStatus.some((message) => message.status === MessageStatus.IN_CHALLENGE_PERIOD);
  const canExecute = readyToProve || readyToRelay;

  useEffect(() => {
    const fetchMessageStatus = async () => {
      try {
        setLoading(true); // Set loading state to true
        const messages = await crossChainMessenger.getMessagesByTransaction(txnHash);
        const statuses = await Promise.all(
          messages.map(async (message, index) => {
            const status = await crossChainMessenger.getMessageStatus(txnHash, index);
            return { status, index, description: getStatusDescription(status) };
          })
        );
        setMessageStatus(statuses);
      } catch (error) {
        console.error(error);
        setMessageStatus([
          {
            status: MessageStatus.FAILED_L1_TO_L2_MESSAGE,
            description: t('bridge.txn-modal.invalid-txn'),
            index: 0,
          },
        ]);
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchMessageStatus();
  }, [crossChainMessenger, t, txnHash]);

  return (
    <TransactionModal
      onClose={onClose}
      icon={
        !loading && !canExecute && !hasError ? <TransactionCompleted /> : <TransactionPending />
      }
      title={title ?? t('bridge.transaction-modal.withdrawal')}
      isOpen={modalOpen}
    >
      <Flex mb={2} flexDirection="column" alignItems="center" bg="black" p={2}>
        <Text fontWeight={500} color="gray.600">
          {t('bridge.txn-modal.withdraw_amount')}
        </Text>
        <Text fontWeight={500}>{formatNumber(amount)} sUSD</Text>
      </Flex>
      <Flex mb={2} alignItems="center" justifyContent="space-between" bg="black" p={3}>
        <Flex alignItems="center" gap={2} color="green.600">
          <TickIcon />
          <Text>{t('bridge.txn-modal.initiate-withdraw')}</Text>
        </Flex>
        {txnLink && (
          <ExternalLink href={txnLink} fontSize="sm" color="gray.500">
            {t('bridge.txn-modal.transaction')}
          </ExternalLink>
        )}
      </Flex>
      {!!messageStatus?.length && !hasError && (
        <Flex flexDirection="column" gap={2}>
          <Flex alignItems="center" justifyContent="space-between" bg="black" p={3}>
            <Flex alignItems="center" gap={2} color={!canExecute ? 'white' : 'green.600'}>
              {!canExecute ? <ClockIcon width="20px" height="20px" /> : <TickIcon />}
              <ExternalLink
                href="https://blog.oplabs.co/two-step-withdrawals/"
                fontSize="sm"
                color="green.600"
              >
                {t('bridge.txn-modal.wait-to-prove')}
              </ExternalLink>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" bg="black" p={3}>
            <Flex alignItems="center" gap={2} color={readyToProve ? 'white' : 'green.600'}>
              {readyToProve ? <ClockIcon width="20px" height="20px" /> : <TickIcon />}
              <Text>
                {readyToProve ? t('bridge.txn-modal.ready-to-prove') : t('bridge.txn-modal.proved')}
              </Text>
            </Flex>
            {!gasErrorProve && (
              <Flex alignItems="center">
                <EthGasPriceEstimator transactionFee={amount === 0 ? wei(0) : feeProve} />
              </Flex>
            )}
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" bg="black" p={3}>
            <Flex alignItems="center" gap={2} color={wait7Days ? 'white' : 'green.600'}>
              {wait7Days ? <ClockIcon width="20px" height="20px" /> : <TickIcon />}
              <Text>{t('bridge.txn-modal.wait-7-days')}</Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" bg="black" p={3}>
            <Flex alignItems="center" gap={2} color={canExecute ? 'white' : 'green.600'}>
              {canExecute ? <ClockIcon width="20px" height="20px" /> : <TickIcon />}
              <Text>
                {canExecute ? t('bridge.txn-modal.ready-to-relay') : t('bridge.txn-modal.relayed')}
              </Text>
            </Flex>
            {!gasErrorFinalize && (
              <Flex alignItems="center">
                <EthGasPriceEstimator transactionFee={amount === 0 ? wei(0) : feeFinalize} />
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
      <Box>
        {(gasErrorProve || gasErrorFinalize || hasError) && (
          <Flex alignItems="center" gap={2}>
            <FailedIcon width="40px" height="40px" />
            <Text>
              {hasError
                ? messageStatus?.[0].description
                : `${t('staking-v2.mint.gas-estimation-error')}: ${parseTxnError(
                    gasErrorProve || gasErrorFinalize
                  )}`}
            </Text>
          </Flex>
        )}
      </Box>
      <Box mt={3}>
        {Boolean(walletConnectedToUnsupportedNetwork || isWalletConnected) ? (
          <Button
            px={2}
            w="100%"
            variant="solid"
            onClick={executeMessage}
            isDisabled={
              loading ||
              submitting ||
              !canExecute ||
              hasError ||
              isGasEnableAndNotFetchedFinalize ||
              isGasEnableAndNotFetchedProve
            }
            isLoading={submitting}
          >
            {isL2
              ? t('switch-mainnet')
              : readyToProve
              ? t('bridge.txn-modal.btn-prove')
              : readyToRelay
              ? t('bridge.txn-modal.btn-relay')
              : t('bridge.txn-modal.btn-execute')}
          </Button>
        ) : (
          <Button
            variant="solid"
            fontFamily="heading"
            fontWeight="black"
            w="100%"
            onClick={() => connectWallet()}
          >
            {t('bridge.connect-wallet-text')}
          </Button>
        )}

        <Alert mt={5} status="info" variant="left-accent" py={2} px={3}>
          <AlertIcon width="20px" height="20px" />
          <AlertDescription pl={2} pr={0} fontSize="sm" fontFamily="heading">
            <Trans
              i18nKey="bridge.relayer-warning"
              components={[
                <ExternalLink
                  color="cyan.400"
                  target="_blank"
                  href={EXTERNAL_LINKS.Synthetix.MessageRelayer}
                />,
              ]}
            />
          </AlertDescription>
        </Alert>
      </Box>
    </TransactionModal>
  );
};

function getStatusDescription(status: MessageStatus) {
  switch (status) {
    case MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE:
      return 'Message is an L1 to L2 message and has not been processed by the L2';
    case MessageStatus.FAILED_L1_TO_L2_MESSAGE:
      return 'Message is an L1 to L2 message and the transaction to execute the message failed';
    case MessageStatus.STATE_ROOT_NOT_PUBLISHED:
      return 'Message is an L2 to L1 message and no state root has been published yet';
    case MessageStatus.READY_TO_PROVE:
      return 'Message is ready to be proved';
    case MessageStatus.IN_CHALLENGE_PERIOD:
      return 'Message is a proved L2 to L1 message and is undergoing the challenge period';
    case MessageStatus.READY_FOR_RELAY:
      return 'Message is ready to be relayed';
    case MessageStatus.RELAYED:
      return 'Message has been relayed';
    default:
      return 'Unknown status';
  }
}
