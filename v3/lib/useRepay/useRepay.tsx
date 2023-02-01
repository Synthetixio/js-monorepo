import { useReducer } from 'react';
import { useCoreProxy, CoreProxyContractType } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';

const createPopulateTransaction = ({
  CoreProxy,
  accountId,
  poolId,
  collateralTypeAddress,
  debtChange,
}: {
  CoreProxy?: CoreProxyContractType;
  accountId?: string;
  poolId?: string;
  collateralTypeAddress?: string;
  debtChange: Wei;
}) => {
  if (!(CoreProxy && poolId && accountId && collateralTypeAddress)) return;
  if (debtChange.eq(0)) return;

  return () =>
    CoreProxy.populateTransaction.burnUsd(
      BigNumber.from(accountId),
      BigNumber.from(poolId),
      collateralTypeAddress,
      debtChange.abs().toBN(),
      {
        gasLimit: CoreProxy.estimateGas.burnUsd(
          BigNumber.from(accountId),
          BigNumber.from(poolId),
          collateralTypeAddress,
          debtChange.abs().toBN()
        ),
      }
    );
};
export const useRepay = (
  {
    accountId,
    poolId,
    collateralTypeAddress,
    debtChange,
  }: {
    accountId?: string;
    poolId?: string;
    collateralTypeAddress?: string;
    debtChange: Wei;
  },
  eventHandlers?: { onSuccess?: () => void; onMutate?: () => void; onError?: (e: Error) => void }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);

  const { data: CoreProxy } = useCoreProxy();
  const populateTransaction = createPopulateTransaction({
    CoreProxy,
    accountId,
    poolId,
    collateralTypeAddress,
    debtChange,
  });
  const signer = useSigner();
  const { name: networkName, id: networkId } = useNetwork();

  const mutation = useMutation(async () => {
    if (!signer || !populateTransaction) return;
    try {
      dispatch({ type: 'prompting' });

      const [populatedTxn, gasPrices] = await Promise.all([
        populateTransaction(),
        getGasPrice({ networkId, networkName }),
      ]);
      const gasLimit = populatedTxn.gasLimit || BigNumber.from(0);
      const gasOptionsForTransaction = formatGasPriceForTransaction({
        gasLimit,
        gasPrices,
        gasSpeed: 'average', // TODO read gasSpeed from context when v3 adds support for it
      });
      const txn = await signer.sendTransaction({
        ...populatedTxn,
        ...gasOptionsForTransaction,
      });
      dispatch({ type: 'pending', payload: { txnHash: txn.hash } });

      await txn.wait();
      dispatch({ type: 'success' });
    } catch (error: any) {
      dispatch({ type: 'error', payload: { error } });
      throw error;
    }
  }, eventHandlers);
  return {
    mutation,
    txnState,
    settle: () => dispatch({ type: 'settled' }),
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
};
