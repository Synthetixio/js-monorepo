import { contracts } from '../utils/constants';
import { useContract } from './useContract';
import ethers, { CallOverrides, Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

// contact, funcion name, arguments
// [ethers.Contract, functionName, arguments, overrides (i.e value, gasLimit, gasPrice)]
export type MulticallCall = [Contract, string, any[], CallOverrides?];

type ContractWriteParams = Parameters<typeof useContractWrite>;

type MulticallConfigType = {
  onSuccess: () => void;
  onStepSuccess: (stepNumber: number) => void;
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
  calls: MulticallCall[][],
  overrides: ContractWriteParams[0]['overrides'] = {},
  config?: Partial<MulticallConfigType>
) => {
  const [step, setStep] = useState(0);
  const [lastExecutedStep, setLastExecutedStep] = useState(0);
  const [status, setStatus] = useState<MulticallStatusType>('idle');

  const [receipts, setReceipts] = useState<ethers.providers.TransactionReceipt[]>([]);

  // for synthetix multicall
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);

  // for regular multicall
  const multicall = useContract(contracts.MULTICALL);

  let callContract: ethers.Contract | undefined,
    callFunc: string | undefined,
    callArgs: any[] | undefined;
  if (calls.length && snxProxy && multicall) {
    if (calls[step].length === 1) {
      // direct call
      [callContract, callFunc, callArgs] = calls[step][0];
    } else if (calls[step].length > 1) {
      if (calls[step].find((c) => c[0].address !== snxProxy?.address)) {
        // Multicall3
        callContract = multicall.contract;
        callFunc = 'aggregate3Value';

        callArgs = [
          calls[step].map((c) => {
            const callData = c[0].interface.encodeFunctionData(c[1], c[2] || []);
            return {
              target: c[0].address,
              callData,
              allowFailure: false,
              value: 0,
            };
          }),
        ];
      } else {
        // Synthetix Multicall
        callContract = snxProxy.contract;
        callFunc = 'multicall';
        callArgs = [
          calls[step].map((c) => {
            const callData = c[0].interface.encodeFunctionData(c[1], c[2] || []);
            return callData;
          }),
        ];
      }
    }
  }

  const currentTxn = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: callContract!.address,
    contractInterface: callContract!.interface,
    functionName: callFunc!,
    args: callArgs,
    overrides,
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
      const newStep = step + 1;
      config?.onStepSuccess && config.onStepSuccess(step);
      if (newStep !== calls.length) {
        setStep(newStep);
      } else {
        setStatus('success');
        reset();
        config?.onSuccess && config.onSuccess();
      }
    },
  });

  function reset() {
    setStatus('idle');
    setStep(0);
    setLastExecutedStep(0);
    setReceipts([]);
  }

  async function exec() {
    if (status === 'idle') {
      setStatus('pending');
      await currentTxn.writeAsync();
    }
  }

  useEffect(() => {
    if (step !== 0 && lastExecutedStep !== step) {
      currentTxn.write();
      setLastExecutedStep((s) => s + 1);
    }
  }, [step, currentTxn, lastExecutedStep]);

  return {
    step,
    receipts,
    reset,
    exec,
    status,
    currentTxn,
  };
};
