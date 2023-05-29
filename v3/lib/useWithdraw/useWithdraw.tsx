import { useReducer } from 'react';
import { CoreProxyType, useCoreProxy } from '@snx-v3/useCoreProxy';
import { formatGasPriceForTransaction } from '@snx-v3/useGasOptions';
import { useMutation } from '@tanstack/react-query';
import { useNetwork, useSigner } from '@snx-v3/useBlockchain';
import { initialState, reducer } from '@snx-v3/txnReducer';
import Wei from '@synthetixio/wei';
import { BigNumber } from 'ethers';
import { getGasPrice } from '@snx-v3/useGasPrice';
import { useGasSpeed } from '@snx-v3/useGasSpeed';
import { useAccountCollateral } from '@snx-v3/useAccountCollateral';

const createPopulateTransaction = ({
  CoreProxy,
  accountId,
  collateralTypeAddress,
  availableCollateral,
}: {
  CoreProxy?: CoreProxyType;
  accountId?: string;
  collateralTypeAddress?: string;
  availableCollateral?: Wei;
}) => {
  if (!(CoreProxy && collateralTypeAddress && availableCollateral)) return;
  if (availableCollateral.eq(0)) return;

  const calls = [
    CoreProxy.interface.encodeFunctionData('withdraw', [
      BigNumber.from(accountId),
      collateralTypeAddress,
      availableCollateral.toBN(),
    ]),
  ];

  return () =>
    CoreProxy.populateTransaction.multicall(calls, {
      gasLimit: CoreProxy.estimateGas.multicall(calls),
    });
};

export const useWithdraw = (
  {
    accountId,
    collateralTypeAddress,
  }: {
    accountId?: string;
    collateralTypeAddress?: string;
  },
  eventHandlers?: { onSuccess?: () => void; onMutate?: () => void; onError?: (e: Error) => void }
) => {
  const accountCollateral = useAccountCollateral({ accountId });
  const accountCollateralData = accountCollateral.data?.find(
    (collateral) => collateral.tokenAddress === collateralTypeAddress
  );

  const [txnState, dispatch] = useReducer(reducer, initialState);
  const { data: CoreProxy } = useCoreProxy();
  const { gasSpeed } = useGasSpeed();
  const populateTransaction = createPopulateTransaction({
    CoreProxy,
    accountId,
    collateralTypeAddress,
    availableCollateral: accountCollateralData?.availableCollateral,
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
