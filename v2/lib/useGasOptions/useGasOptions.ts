import { useContext } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useGasPrice } from '@snx-v2/useGasPrice';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { useOptimismLayer1Fee } from '@snx-v2/useOptimismLayer1Fee';
import { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from '@snx-v2/Constants';

const GAS_LIMIT_BUFFER = 1.2;

export const useGasOptions = ({
  getGasLimit,
  populateTransaction,
}: {
  getGasLimit?: () => Promise<BigNumber>;
  populateTransaction?: () => Promise<PopulatedTransaction>;
}) => {
  const { networkId } = useContext(ContractContext);
  const gasPriceQuery = useGasPrice();
  const optimismLayerOneFeesQuery = useOptimismLayer1Fee({ populateTransaction });

  return useQuery(
    [
      getGasLimit?.toString(),
      populateTransaction?.toString(),
      optimismLayerOneFeesQuery.data,
      gasPriceQuery.data,
      networkId,
    ],
    async () => {
      if (!getGasLimit) throw Error('Query should not be enable when getGasLimit is missing');
      if (!populateTransaction) {
        throw Error('Query should not be enable when getGasLimit is missing');
      }
      const gasLimitRaw = await getGasLimit();
      const gasLimit = wei(gasLimitRaw, GWEI_DECIMALS).mul(GAS_LIMIT_BUFFER).toBN();
      const gasPrices = gasPriceQuery.data;
      const optimismLayerOneFees = optimismLayerOneFeesQuery.data || undefined;
      const gasSpeed = 'average' as const; // todo look up from context
      const formatGasPriceForTransaction = () => {
        if (!gasPrices) return undefined;
        const gasPrice = gasPrices[gasSpeed];
        if ('baseFeePerGas' in gasPrice) {
          const { baseFeePerGas: _baseFeePerGas, ...gasPriceToReturn } = gasPrice;
          return gasPriceToReturn;
        }
        return gasPrice;
      };
      return {
        gasPrices,
        gasLimit,
        optimismLayerOneFees,
        gasSpeed,
        gasPriceForTransaction: formatGasPriceForTransaction(),
      };
    },
    { enabled: Boolean(getGasLimit && populateTransaction && networkId) }
  );
};
