import { CrossChainMessenger } from '@eth-optimism/sdk';
import { useCustomGasOptions } from './useCustomGasOptions';

type NativeBridgeArgs = {
  crossChainMessenger: CrossChainMessenger;
  txnHash: string;
};

const createPopulateTransaction = (nativeArgs?: NativeBridgeArgs) => {
  if (!nativeArgs || !nativeArgs.crossChainMessenger) return undefined;
  const { txnHash, crossChainMessenger } = nativeArgs;
  if (!txnHash) return undefined;

  return () => {
    return crossChainMessenger.populateTransaction.proveMessage(txnHash);
  };
};

export function useEstimateProveWithdraw(bridgeArgs: NativeBridgeArgs) {
  const populateTransaction = createPopulateTransaction(bridgeArgs);

  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useCustomGasOptions({
    populateTransaction,
    queryKeys: [bridgeArgs.txnHash, populateTransaction],
  });

  const { transactionPrice } = data || {};

  return {
    transactionFee: transactionPrice,
    isGasEnabledAndNotFetched: gasFetching && !isGasFetched,
    gasError: gasError as Error | null,
  };
}
