import { useContext } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useGasPrice } from '@snx-v2/useGasPrice';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { useOptimismLayer1Fee } from '@snx-v2/useOptimismLayer1Fee';

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

  const gasLimitQuery = useQuery(
    [getGasLimit?.toString(), networkId],
    async () => {
      if (!getGasLimit) throw Error('Query should not be enable when getGasLimit is missing');
      const gasLimit = await getGasLimit();
      return gasLimit.mul(GAS_LIMIT_BUFFER);
    },
    { enabled: Boolean(getGasLimit && networkId) }
  );
  const optimismLayerOneFeesQuery = useOptimismLayer1Fee({ populateTransaction });

  const gasPrices = gasPriceQuery.data;
  const gasLimit = gasLimitQuery.data;
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
};
