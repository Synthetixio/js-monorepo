import { useContext } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useGasPrice } from '@snx-v2/useGasPrice';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { useOptimismLayer1Fee } from '@snx-v2/useOptimismLayer1Fee';
import { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from '@snx-v2/Constants';
import { GasSpeedContext } from '@snx-v2/GasSpeedContext';

const GAS_LIMIT_BUFFER = 1.2;

export const useGasOptions = ({
  populateTransaction,
  queryKeys = [],
}: {
  populateTransaction?: () => Promise<PopulatedTransaction>;
  queryKeys: QueryKey;
}) => {
  const { networkId } = useContext(ContractContext);
  const { gasSpeed } = useContext(GasSpeedContext);
  const gasPriceQuery = useGasPrice();
  const optimismLayerOneFeesQuery = useOptimismLayer1Fee({ populateTransaction });

  return useQuery(
    [...queryKeys, optimismLayerOneFeesQuery.data, gasPriceQuery.data, networkId],
    async () => {
      if (!populateTransaction) {
        throw Error('Query should not be enable when getGasLimit is missing');
      }
      const populatedTransaction = await populateTransaction();
      const gasLimitRaw = populatedTransaction.gasLimit;
      const gasLimit = wei(gasLimitRaw ?? 0, GWEI_DECIMALS)
        .mul(GAS_LIMIT_BUFFER)
        .toBN();
      const gasPrices = gasPriceQuery.data;
      const optimismLayerOneFees = optimismLayerOneFeesQuery.data || undefined;
      const formatGasPriceForTransaction = () => {
        if (!gasPrices) return undefined;
        const gasPrice = gasPrices[gasSpeed];
        if ('baseFeePerGas' in gasPrice) {
          const { baseFeePerGas: _baseFeePerGas, ...gasPriceToReturn } = gasPrice;
          return { ...gasPriceToReturn, gasLimit };
        }
        return { ...gasPrice, gasLimit };
      };
      return {
        gasPrices,
        gasLimit,
        optimismLayerOneFees,
        gasSpeed,
        gasOptionsForTransaction: formatGasPriceForTransaction(),
      };
    },
    { enabled: Boolean(getGasLimit && populateTransaction && networkId) }
  );
};
