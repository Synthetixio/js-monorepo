import { useReducer } from 'react';
import { useCoreProxy, CoreProxyType } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';

const createPopulateTransaction = ({
  CoreProxy,
  accountId,
  newAccountId,
  poolId,
  collateralTypeAddress,
  collateralChange,
  currentCollateral,
}: {
  CoreProxy?: CoreProxyType;
  accountId?: string;
  newAccountId: string;
  poolId?: string;
  collateralTypeAddress?: string;
  collateralChange: Wei;
  currentCollateral: Wei;
}) => {
  if (!(CoreProxy && poolId && collateralTypeAddress)) return;
  if (collateralChange.eq(0)) return;

  const id = accountId ?? newAccountId;
  const accountCalls = accountId
    ? []
    : [CoreProxy.interface.encodeFunctionData('createAccount', [BigNumber.from(id)])];

  const calls = accountCalls.concat([
    CoreProxy.interface.encodeFunctionData('deposit', [
      BigNumber.from(id),
      collateralTypeAddress,
      collateralChange.toBN(),
    ]),
    CoreProxy.interface.encodeFunctionData('delegateCollateral', [
      BigNumber.from(id),
      BigNumber.from(poolId),
      collateralTypeAddress,
      currentCollateral.add(collateralChange).toBN(),
      wei(1).toBN(),
    ]),
  ]);

  return () =>
    CoreProxy.populateTransaction.multicall(calls, {
      gasLimit: CoreProxy.estimateGas.multicall(calls),
    });
};
export const useDeposit = (
  {
    accountId,
    newAccountId,
    poolId,
    collateralTypeAddress,
    collateralChange,
    currentCollateral,
  }: {
    accountId?: string;
    newAccountId: string;
    poolId?: string;
    collateralTypeAddress?: string;
    currentCollateral: Wei;
    collateralChange: Wei;
  },
  eventHandlers?: { onSuccess?: () => void; onMutate?: () => void; onError?: (e: Error) => void }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { gasSpeed } = useGasSpeed();
  const populateTransaction = createPopulateTransaction({
    CoreProxy,
    accountId,
    newAccountId,
    poolId,
    currentCollateral,
    collateralTypeAddress,
    collateralChange,
  });

  const signer = useSigner();
  const { name: networkName, id: networkId } = useNetwork();

  const mutation = useMutation({
    mutationFn: async () => {
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
          gasSpeed,
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
    },
    ...eventHandlers,
  });
  return {
    mutation,
    txnState,
    settle: () => dispatch({ type: 'settled' }),
    isLoading: mutation.isLoading,
    exec: mutation.mutateAsync,
  };
};
