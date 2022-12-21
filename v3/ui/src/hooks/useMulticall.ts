import { contracts } from '../utils/constants';
import { useContract } from './useContract';
import ethers, { Contract } from 'ethers';
import { useCallback, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

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
  overrides: ContractWriteParams[0]['overrides'] = {},
  config?: Partial<TxConfig>
) => {
  const [status, setStatus] = useState<MulticallStatusType>('idle');

  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);
  let callContract: ethers.Contract | undefined;
  let callFunc: string | undefined;
  let callArgs: any[] | undefined;
  if (calls.length && snxProxy) {
    if (calls.length === 1) {
      // direct call
      callContract = calls[0].contract;
      callFunc = calls[0].functionName;
      callArgs = calls[0].callArgs;
    } else if (calls.length > 1) {
      callContract = snxProxy.contract;
      callFunc = 'multicall';
      callArgs = [
        calls.map((call) =>
          call.contract.interface.encodeFunctionData(call.functionName, call.callArgs || [])
        ),
      ];
    }
  }

  const currentTxn = useContractWrite({
    enabled: Boolean(calls.length && snxProxy),
    mode: 'recklesslyUnprepared',
    address: callContract?.address ?? '',
    abi: callContract?.interface ?? '',
    functionName: callFunc!,
    args: callArgs,
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
