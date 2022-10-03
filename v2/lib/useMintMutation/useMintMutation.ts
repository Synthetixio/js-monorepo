import { useContext, useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { getTransactionPrice } from '@snx-v2/EthGasPriceEstimator';
import { GasSpeedContext } from '@snx-v2/GasSpeedContext';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { initialState, reducer } from './reducer';
import { DelegationWallet } from '@synthetixio/queries';

type MintVariables = {
  amount: BigNumber;
  toMax?: boolean;
};

export function useMintMutation(delegateAddress?: DelegationWallet | null) {
  const { data: Synthetix } = useSynthetix();
  const { gasSpeed } = useContext(GasSpeedContext);

  const { data: exchangeRatesData, isLoading: isExchangeRatesDataLoading } = useExchangeRatesData();

  const [state, dispatch] = useReducer(reducer, initialState);

  const getGasLimit = Synthetix?.signer ? () => Synthetix.estimateGas.issueSynths(0) : undefined;

  const populateTransaction = Synthetix
    ? () => Synthetix.populateTransaction.issueSynths(0)
    : undefined;

  const {
    data,
    isLoading: isGasLoading,
    error,
  } = useGasOptions({
    getGasLimit,
    populateTransaction,
  });

  const { gasLimit, gasPrices, optimismLayerOneFees, gasOptionsForTransaction } = data || {};

  const gasPrice = gasPrices?.[gasSpeed];

  const transactionFee = getTransactionPrice(
    gasPrice,
    gasLimit,
    exchangeRatesData?.ETH,
    optimismLayerOneFees
  );

  const isLoading = isGasLoading || isExchangeRatesDataLoading;

  const { modalOpen, txnStatus } = state;

  return {
    ...useMutation(async (variables: MintVariables) => {
      if (!Synthetix) return;
      let txn;
      try {
        dispatch({ type: 'prompting' });
        const { amount, toMax } = variables;
        if (toMax) {
          txn = delegateAddress
            ? await Synthetix.issueMaxSynthsOnBehalf(
                delegateAddress.address,
                gasOptionsForTransaction
              )
            : await Synthetix.issueMaxSynths(gasOptionsForTransaction);
        } else {
          txn = delegateAddress
            ? await Synthetix.issueSynthsOnBehalf(
                delegateAddress.address,
                amount,
                gasOptionsForTransaction
              )
            : await Synthetix.issueSynths(amount, gasOptionsForTransaction);
        }
        dispatch({ type: 'pending' });
        await txn.wait();
        dispatch({ type: 'success' });
        setTimeout(() => dispatch({ type: 'settled' }), 1000);
      } catch (error: any) {
        console.log('Error', error);
        dispatch({ type: 'error' });
        setTimeout(() => dispatch({ type: 'settled' }), 1000);
      }
    }),
    transactionFee,
    isLoading,
    modalOpen,
    txnStatus,
    error,
  };
}
