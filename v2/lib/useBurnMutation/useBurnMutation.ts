import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSynthetix } from '@snx-v2/useSynthetixContracts';
import { useGasOptions } from '@snx-v2/useGasOptions';
import { BigNumber } from '@ethersproject/bignumber';
import { getTransactionPrice } from '@snx-v2/EthGasPriceEstimator';
import { GasSpeedContext } from '@snx-v2/GasSpeedContext';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';

type BurnVariables = {
  amount: BigNumber;
  toTarget?: boolean;
};

export function useBurnMutation() {
  const { data: Synthetix } = useSynthetix();
  const { gasSpeed } = useContext(GasSpeedContext);
  const { data: exchangeRatesData, isLoading: isExchangeRatesDataLoading } = useExchangeRatesData();

  const [txModalOpen, setTxModalOpen] = useState<boolean>(false);
  const [err, setError] = useState(null);

  const getGasLimit = Synthetix?.signer ? () => Synthetix.estimateGas.burnSynths(0) : undefined;

  const populateTransaction = Synthetix
    ? () => Synthetix.populateTransaction.burnSynths(0)
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

  console.log(transactionFee?.toString(), 'gas error', error);

  const isLoading = isGasLoading || isExchangeRatesDataLoading;

  return {
    ...useMutation(async (variables: BurnVariables) => {
      if (!Synthetix) return;
      try {
        setTxModalOpen(true);
        const { amount, toTarget } = variables;
        if (toTarget) {
          // eslint-disable-next-line no-console
          console.log('Burning synths to target');
          await Synthetix.burnSynthsToTarget(gasOptionsForTransaction);
        } else {
          // eslint-disable-next-line no-console
          console.log('Burning synths', amount.toString());
          await Synthetix.burnSynths(amount, gasOptionsForTransaction);
        }
        setTxModalOpen(false);
      } catch (error: any) {
        setError(error);
        throw new Error(error);
      }
    }),
    transactionFee,
    isLoading,
    txModalOpen,
    error,
  };
}
