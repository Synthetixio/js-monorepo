import ethers, { Contract, Overrides } from 'ethers';
import { useCallback, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useExternalMulticall } from '@snx-v3/useExternalMulticall';
import { useCoreProxy } from '@snx-v3/useCoreProxy';

// contact, funcion name, arguments
export type MulticallCall = {
  contract: Contract;
  functionName: string;
  callArgs: any[];
};

export type ContractWriteParams = Parameters<typeof useContractWrite>;

export type TxConfig = {
  onSuccess: () => void;
  onMutate: () => void;
  onError: (e: Error) => void;
};

type MulticallStatusType = 'idle' | 'pending' | 'success' | 'error';

/**
 * Executes the given list of transactions on a multicall contract as required.
 * If the list is only 1 operation long, it will be executed directly with no multicall
 * If all operations in the list take place on the synthetix proxy contract, the synthetix proxy multicall will be used.
 * Otherwise, the transactions will be packaged into a Multicall3 call.
 *
 * If a transaction fails, all transactions following will be cancelled.
 *
 * It is up to the caller to determine which calls need to be completed (ie whether or not an approval step is needed)
 *
 * @param calls List of calls to execute. The outer array indicates
 * operations to run in multiple steps, and the inner array indicates operations to run in the same transaction.
 * @returns a lot of stuff
 */
export const useMulticall = (
  calls: MulticallCall[],
  overrides?: Overrides,
  config?: Partial<TxConfig>
) => {
  const [status, setStatus] = useState<MulticallStatusType>('idle');
  const { data: Multicall } = useExternalMulticall();
  const { data: CoreProxy } = useCoreProxy();

  let callContract: ethers.Contract | undefined;
  let callFunc: string | undefined;
  let callArgs: any[] | undefined;
  if (calls.length && CoreProxy) {
    if (calls.length === 1) {
      // direct call
      callContract = calls[0].contract;
      callFunc = calls[0].functionName;
      callArgs = calls[0].callArgs;
    } else if (calls.find((c) => c.contract.address !== CoreProxy?.address)) {
      callContract = Multicall;
      callFunc = 'aggregate3Value';

      callArgs = [
        calls.map((call) => {
          const callData = call.contract.interface.encodeFunctionData(
            call.functionName,
            call.callArgs || []
          );
          return {
            target: call.contract.address,
            callData,
            allowFailure: false,
            value: 0,
          };
        }),
      ];
    } else if (calls.length > 1) {
      callContract = CoreProxy;
      callFunc = 'multicall';
      callArgs = [
        calls.map((call) =>
          call.contract.interface.encodeFunctionData(call.functionName, call.callArgs || [])
        ),
      ];
    }
  }

  const currentTxn = useContractWrite({
    enabled: Boolean(calls.length && CoreProxy),
    mode: 'recklesslyUnprepared',
    address: callContract?.address ?? '',
    // @ts-ignore
    abi: callContract?.interface ?? '',
    functionName: callFunc!,
    args: callArgs,
    // @ts-ignore
    overrides,
    onMutate: () => {
      config?.onMutate && config.onMutate();
    },
    onError: (e) => {
      setStatus('error');
      config?.onError && config.onError(e);
    },
  });

  useWaitForTransaction({
    hash: currentTxn.data?.hash,
    timeout: 300000,
    enabled: !!currentTxn,
    onSuccess: (_data) => {
      setStatus('idle');
      config?.onSuccess && config.onSuccess();
    },
    onError: (e) => {
      setStatus('error');
      config?.onError && config.onError(e);
    },
  });

  const exec = useCallback(async () => {
    if (!currentTxn.writeAsync) return;
    try {
      setStatus('pending');
      const txReceipt = await currentTxn.writeAsync();
      await txReceipt.wait();
    } catch (error) {
      console.error(error);
      setStatus('error');
      throw error;
    }
  }, [currentTxn]);

  return {
    exec,
    status,
    currentTxn,
    isLoading: status === 'pending',
    isValid: !!calls.length,
  };
};
