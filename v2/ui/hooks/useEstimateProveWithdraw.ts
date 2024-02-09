import { CrossChainMessenger } from '@eth-optimism/sdk';
import { useCustomGasOptions } from './useCustomGasOptions';

type NativeBridgeArgs = {
  crossChainMessenger: CrossChainMessenger;
  txnHash: string;
  readyToProve: boolean;
};

const createPopulateTransaction = (nativeArgs?: NativeBridgeArgs) => {
  if (!nativeArgs || !nativeArgs.crossChainMessenger || !nativeArgs.readyToProve) return undefined;
  const { txnHash, crossChainMessenger } = nativeArgs;
  if (!txnHash) return undefined;

  return () => {
    return crossChainMessenger.populateTransaction.proveMessage(txnHash);
  };
};

const createEstimateGas = (nativeArgs?: NativeBridgeArgs) => {
  if (!nativeArgs || !nativeArgs.crossChainMessenger || !nativeArgs.readyToProve) return undefined;
  const { txnHash, crossChainMessenger } = nativeArgs;
  if (!txnHash) return undefined;

  return () => {
    return crossChainMessenger.estimateGas.proveMessage(txnHash);
  };
};

export function useEstimateProveWithdraw(bridgeArgs: NativeBridgeArgs) {
  const populateTransaction = createPopulateTransaction(bridgeArgs);
  const estimateGas = createEstimateGas(bridgeArgs);

  const {
    data,
    isFetched: isGasFetched,
    isFetching: gasFetching,
    error: gasError,
  } = useCustomGasOptions({
    populateTransaction,
    estimateGas,
    queryKeys: [bridgeArgs.txnHash, populateTransaction, estimateGas],
  });

  const { transactionPrice, gasPrices } = data || {};

  return {
    transactionFee: transactionPrice,
    isGasEnabledAndNotFetched: gasFetching && !isGasFetched,
    gasError: gasError as Error | null,
    gasPrices,
  };
}
