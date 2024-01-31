import { CrossChainMessenger } from '@eth-optimism/sdk';
import { useCustomGasOptions } from './useCustomGasOptions';

type NativeBridgeArgs = {
  crossChainMessenger: CrossChainMessenger;
  txnHash: string;
  readyToRelay: boolean;
};

const createPopulateTransaction = (nativeArgs?: NativeBridgeArgs) => {
  if (!nativeArgs || !nativeArgs.crossChainMessenger || !nativeArgs.readyToRelay) return undefined;
  const { txnHash, crossChainMessenger } = nativeArgs;
  if (!txnHash) return undefined;

  return () => {
    return crossChainMessenger.populateTransaction.finalizeMessage(txnHash);
  };
};

const createEstimateGas = (nativeArgs?: NativeBridgeArgs) => {
  if (!nativeArgs || !nativeArgs.crossChainMessenger || !nativeArgs.readyToRelay) return undefined;
  const { txnHash, crossChainMessenger } = nativeArgs;
  if (!txnHash) return undefined;

  return () => {
    return crossChainMessenger.estimateGas.finalizeMessage(txnHash);
  };
};

export function useEstimateFinalizeWithdraw(bridgeArgs: NativeBridgeArgs) {
  const populateTransaction = createPopulateTransaction(bridgeArgs);
  const estimateGas = createEstimateGas(bridgeArgs);

  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useCustomGasOptions({
    estimateGas,
    populateTransaction,
    queryKeys: [bridgeArgs.txnHash, populateTransaction, estimateGas],
  });

  const { transactionPrice } = data || {};

  return {
    transactionFee: transactionPrice,
    isGasEnabledAndNotFetched: gasFetching && !isGasFetched,
    gasError: gasError as Error | null,
  };
}
