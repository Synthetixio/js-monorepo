import { useMemo, useReducer } from 'react';
import { useCoreProxy, CoreProxyContractType } from '@snx-v3/useCoreProxy';
import { useGasOptions } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei, { wei } from '@synthetixio/wei';
import { BigNumber } from 'ethers';

const createPopulateTransaction = ({
  CoreProxy,
  accountId,
  newAccountId,
  poolId,
  collateralTypeAddress,
  collateralChange,
  currentCollateral,
}: {
  CoreProxy?: CoreProxyContractType;
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
    poolId,
    collateralTypeAddress,
    collateralChange,
    currentCollateral,
    enabled = true,
  }: {
    accountId?: string;
    poolId?: string;
    collateralTypeAddress?: string;
    currentCollateral: Wei;
    collateralChange: Wei;
    enabled: boolean;
  },
  eventHandlers?: { onSuccess?: () => void; onMutate?: () => void; onError?: (e: Error) => void }
) => {
  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const newAccountId = useMemo(() => `${Math.floor(Math.random() * 10000000000)}`, []);
  const populateTransaction = enabled
    ? createPopulateTransaction({
        CoreProxy,
        accountId,
        newAccountId,
        poolId,
        currentCollateral,
        collateralTypeAddress,
        collateralChange,
      })
    : undefined;
  const signer = useSigner();

  const { data } = useGasOptions({
    populateTransaction,
    queryKeys: [
      {
        withSigner: Boolean(signer),
        CoreProxy: CoreProxy?.address,
        accountId,
        poolId,
        collateralTypeAddress,
        collateralChange,
      },
    ],
  });
  const { gasOptionsForTransaction } = data || {};
  const mutation = useMutation(async () => {
    if (!signer || !populateTransaction) return;
    try {
      dispatch({ type: 'prompting' });

      const populatedTxn = await populateTransaction();
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
