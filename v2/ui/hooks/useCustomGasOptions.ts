import { useContext } from 'react';
import { useGasPrice } from '@snx-v2/useGasPrice';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractContext } from '@snx-v2/ContractContext';
import { QueryKey, useQuery } from '@tanstack/react-query';
import Wei, { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from '@snx-v2/Constants';
import { GasSpeedContext } from '@snx-v2/GasSpeedContext';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';
import { ethers } from 'ethers';
import { useCustomOptimismLayer1Fee } from './useCustomOptimismLayer1Fee';

// Note it looks like gas limit estimation is coming in higher slightly higher than what gets used according to etherscan
// Will try without a buffer, if we get user report of out of gas we can increase it again.
const GAS_LIMIT_BUFFER = wei(1.2, GWEI_DECIMALS);

type GasPrice = {
  baseFeePerGas?: Wei; // Note that this is used for estimating price and should not be included in the transaction
  maxPriorityFeePerGas?: Wei;
  maxFeePerGas?: Wei;
};

const getTotalGasPrice = (gasPrice?: GasPrice | null) => {
  const { baseFeePerGas, maxPriorityFeePerGas } = gasPrice || {};
  if (!baseFeePerGas || !maxPriorityFeePerGas) return wei(0);
  return baseFeePerGas.add(maxPriorityFeePerGas || 0);
};

const getTransactionPrice = (
  gasPrice: GasPrice | undefined,
  gasLimit: BigNumber | undefined,
  ethPrice: Wei | undefined,
  optimismLayerOneFee: Wei | undefined
) => {
  if (!gasPrice || !gasLimit || !ethPrice) return null;
  const totalGasPrice = getTotalGasPrice(gasPrice);

  const extraLayer1Fees = optimismLayerOneFee;
  const gasPriceCost = totalGasPrice.mul(wei(gasLimit, GWEI_DECIMALS)).mul(ethPrice);
  const l1Cost = ethPrice.mul(extraLayer1Fees || 0);

  const txPrice = gasPriceCost.add(l1Cost);

  return txPrice;
};

export const useCustomGasOptions = ({
  estimateGas,
  populateTransaction,
  queryKeys = [],
}: {
  estimateGas?: () => Promise<BigNumber>;
  populateTransaction?: () => Promise<ethers.providers.TransactionRequest>;
  queryKeys: QueryKey;
}) => {
  const { networkId } = useContext(ContractContext);
  const { gasSpeed } = useContext(GasSpeedContext);
  const gasPriceQuery = useGasPrice();
  const optimismLayerOneFeesQuery = useCustomOptimismLayer1Fee({ populateTransaction });
  const { data: exchangeRatesData } = useExchangeRatesData();

  return useQuery(
    [...queryKeys, optimismLayerOneFeesQuery.data, gasPriceQuery.data, networkId, gasSpeed],
    async () => {
      if (!populateTransaction) {
        throw Error('Query should not be enable when getGasLimit is missing');
      }
      const populatedTransaction = await populateTransaction();
      const estimateGasLimit = await estimateGas?.();
      const gasLimitRaw = populatedTransaction.gasLimit ?? estimateGasLimit;
      const gasLimit = wei(gasLimitRaw ?? 0, GWEI_DECIMALS)
        .mul(GAS_LIMIT_BUFFER)
        .toBN();
      const gasPrices = gasPriceQuery.data;
      const optimismLayerOneFees = optimismLayerOneFeesQuery.data || undefined;
      const formatGasPriceForTransaction = () => {
        if (!gasPrices) return undefined;
        const gasPrice = gasPrices[gasSpeed];
        const { baseFeePerGas: _baseFeePerGas, maxFeePerGas, maxPriorityFeePerGas } = gasPrice;
        return {
          maxFeePerGas: maxFeePerGas.toBN(),
          maxPriorityFeePerGas: maxPriorityFeePerGas.toBN(),
          gasLimit,
        };
      };
      return {
        populatedTransaction,
        gasPrices,
        gasLimit,
        optimismLayerOneFees,
        gasSpeed,
        gasOptionsForTransaction: formatGasPriceForTransaction(),
        transactionPrice: getTransactionPrice(
          gasPrices?.[gasSpeed],
          gasLimit,
          exchangeRatesData?.ETH,
          optimismLayerOneFees
        ),
      };
    },
    { enabled: Boolean(populateTransaction && networkId), staleTime: 10000 }
  );
};
