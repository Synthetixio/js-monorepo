import { Button, Center, Flex, Text } from '@chakra-ui/react';
import { FailedIcon } from '@snx-v2/icons';

import { useTranslation } from 'react-i18next';
import { wei } from '@synthetixio/wei';
import { useApproveERC20sUSDMutation } from '@snx-v2/useApproveERC20sUSDMutation';
import { GRAPHQL_MAX_INT } from 'graphql/type';
import { BridgeTransactionModal } from './BridgeTransactionModal';
import { parseTxnError } from '@snx-v2/parseTxnError';
import { EthGasPriceEstimator } from '@snx-v2/EthGasPriceEstimator';

function ApproveAction({
  bridgeAmountsUSD,
  bridgeContractAddress,
  onSuccess,
}: {
  bridgeAmountsUSD: string;
  bridgeContractAddress?: string;
  onSuccess?: () => void;
}) {
  const {
    mutate,
    transactionFee,
    modalOpen,
    txnStatus,
    error,
    gasError,
    settle,
    isGasEnabledAndNotFetched,
    txnHash,
  } = useApproveERC20sUSDMutation({
    amount: wei(GRAPHQL_MAX_INT || 0).toBN(),
    spenderAddress: bridgeContractAddress ?? '',
  });

  const handleSubmit = () => {
    mutate(undefined, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const { t } = useTranslation();
  return (
    <>
      {gasError ? (
        <Center mt={3}>
          <FailedIcon width="40px" height="40px" />
          <Text>{`${t('staking-v2.mint.gas-estimation-error')}: ${parseTxnError(gasError)}`}</Text>
        </Center>
      ) : (
        <Flex alignItems="center" justifyContent="space-between">
          <EthGasPriceEstimator
            mt={3}
            transactionFee={bridgeAmountsUSD === '' ? wei(0) : transactionFee}
          />
        </Flex>
      )}
      <Button
        variant="solid"
        data-testid="approve submit"
        fontFamily="heading"
        fontWeight="black"
        mt={5}
        w="100%"
        onClick={handleSubmit}
        isDisabled={
          bridgeAmountsUSD === '' ||
          bridgeAmountsUSD === '0.00' ||
          Boolean(gasError) ||
          isGasEnabledAndNotFetched
        }
      >
        Approve
      </Button>
      {modalOpen && (
        <BridgeTransactionModal
          title={t('bridge.txn-modal.approving')}
          txnHash={txnHash}
          settle={settle}
          error={error}
          gasError={gasError}
          onClose={() => {
            settle();
          }}
          onSubmit={handleSubmit}
          txnStatus={txnStatus}
          modalOpen={modalOpen}
          bridgeAmountSusd={bridgeAmountsUSD}
        />
      )}
    </>
  );
}

export default ApproveAction;
