import { useGasPrice } from '@snx-v3/useGasPrice';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { useOptimismLayer1Fee } from '@snx-v3/useOptimismLayer1Fee';
import Wei, { wei } from '@synthetixio/wei';
import { useNetwork } from '@snx-v3/useBlockchain';
import { GWEI_DECIMALS } from '@snx-v3/Constants';
import { useEthPrice } from '@snx-v3/useEthPrice';

// Note it looks like gas limit estimation is coming in higher slightly higher than what gets used according to etherscan
// Will try without a buffer, if we get user report of out of gas we can increase it again.
const GAS_LIMIT_BUFFER = wei(1.2, GWEI_DECIMALS);

type GasPrice = {
  baseFeePerGas?: BigNumber; // Note that this is used for estimating price and should not be included in the transaction
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  gasPrice?: BigNumber;
};

const getTotalGasPrice = (gasPrice?: GasPrice | null) => {
  if (!gasPrice) return wei(0);
  const { gasPrice: ovmGasPrice, baseFeePerGas, maxPriorityFeePerGas } = gasPrice;
  if (ovmGasPrice) {
    return wei(ovmGasPrice, GWEI_DECIMALS);
  }
  return wei(baseFeePerGas || 0, GWEI_DECIMALS).add(wei(maxPriorityFeePerGas || 0, GWEI_DECIMALS));
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

export const useGasOptions = <T>(
  args:
    | {
        populateTransaction?: (arg: T) => Promise<PopulatedTransaction>;
        queryKeys: QueryKey;
        transactionArgs: T;
      }
    | { populateTransaction?: () => Promise<PopulatedTransaction>; queryKeys: QueryKey }
) => {
  const { id: networkId } = useNetwork();
  const { gasSpeed } = { gasSpeed: 'average' } as const; // TODO create a GasSpeed context in v3. Currently no UI for this.
  const gasPriceQuery = useGasPrice();
  const optimismLayerOneFeesQuery = useOptimismLayer1Fee(args);
  const { data: ethPrice } = useEthPrice();
  const keyForTransactionArgs = 'transactionArgs' in args ? args.transactionArgs : undefined;

  return useQuery({
    queryKey: [
      ...(args.queryKeys || []),
      optimismLayerOneFeesQuery.data?.toNumber(),
      gasPriceQuery.data,
      networkId,
      gasSpeed,
      keyForTransactionArgs,
      ethPrice?.toNumber(),
    ],
    queryFn: async () => {
      if (!args.populateTransaction) {
        throw Error('Query should not be enable when getGasLimit is missing');
      }
      const populatedTransaction =
        'transactionArgs' in args
          ? await args.populateTransaction(args.transactionArgs)
          : await args.populateTransaction();
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
        populatedTransaction,
        gasPrices,
        gasLimit,
        optimismLayerOneFees,
        gasSpeed,
        gasOptionsForTransaction: formatGasPriceForTransaction(),
        transactionPrice: getTransactionPrice(
          gasPrices?.[gasSpeed],
          gasLimit,
          ethPrice,
          optimismLayerOneFees
        ),
      };
    },
    enabled: Boolean(args.populateTransaction && networkId),
  });
};
