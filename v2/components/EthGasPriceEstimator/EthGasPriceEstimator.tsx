import { useContext, useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
// import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { useGasPrice } from '@snx-v2/useGasPrice';
import { serialize } from '@ethersproject/transactions';
import { NetworkIdByName } from '@snx-v2/useSynthetixContracts';
import { Contract, PopulatedTransaction } from '@ethersproject/contracts';
import { OptimismOracleContract } from './OptimismGasPriceOracleContract';
import { InfuraProvider } from '@ethersproject/providers';
import { ContractContext } from '@snx-v2/ContractContext';
import { useQuery } from '@tanstack/react-query';
import { Flex, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

/**
 * The purpose of this component is to
 * 1. Render a UI that displays gas costs
 * 2. Actually do the gasPrice and gasLimit estimations
 * 3. Provide gasOptions to the parent through onGasOptionChange
 */

type GasSelectorProps = {
  onGasOptionChange: (gasPrice: GasOption, gasLimit: BigNumber) => void;
  getGasLimit: () => Promise<BigNumber>;
  populateTransaction: () => Promise<PopulatedTransaction>;
};

export type GasOption = {
  baseFeePerGas?: BigNumber; // Note that this is used for estimating price and should not be included in the transaction
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  gasPrice?: BigNumber;
  gasLimit?: BigNumber;
};

const GWEI_DECIMALS = 9;

const getTotalGasPrice = (gasPriceObj?: GasOption | null) => {
  if (!gasPriceObj) return wei(0);
  const { gasPrice, baseFeePerGas, maxPriorityFeePerGas } = gasPriceObj;
  if (gasPrice) {
    return wei(gasPrice, GWEI_DECIMALS);
  }
  return wei(baseFeePerGas || 0, GWEI_DECIMALS).add(wei(maxPriorityFeePerGas || 0, GWEI_DECIMALS));
};

const getTransactionPrice = (
  gasOption: GasOption | null,
  gasLimit: BigNumber | undefined,
  ethPrice: Wei | null,
  optimismLayerOneFee: Wei | null
) => {
  if (!gasOption || !gasLimit || !ethPrice) return null;
  const totalGasPrice = getTotalGasPrice(gasOption);

  const extraLayer1Fees = optimismLayerOneFee;
  const gasPriceCost = totalGasPrice.mul(wei(gasLimit, GWEI_DECIMALS)).mul(ethPrice);
  const l1Cost = ethPrice.mul(extraLayer1Fees || 0);

  const txPrice = gasPriceCost.add(l1Cost);

  return txPrice;
};

const getOptimismLayerOneFees = async (serializedTxn: string, networkId: number | null) => {
  const isNotOvm =
    networkId !== NetworkIdByName['mainnet-ovm'] && networkId !== NetworkIdByName['goerli-ovm'];
  if (isNotOvm || !networkId) {
    return null;
  }
  const provider = new InfuraProvider(networkId, process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);

  const OptimismGasPriceOracleContract = new Contract(
    OptimismOracleContract.address,
    OptimismOracleContract.abi,
    provider
  );

  return wei(await OptimismGasPriceOracleContract.getL1Fee(serializedTxn));
};

export const EthGasPriceEstimator: React.FC<GasSelectorProps> = ({
  onGasOptionChange,
  getGasLimit,
  populateTransaction,
}) => {
  const { networkId } = useContext(ContractContext);
  // const { t } = useTranslation();

  const [gasSpeed, _setGasSpeed /*Will be used when we have a UI for picking speed*/] = useState<
    'average' | 'fast' | 'fastest'
  >('average');

  const gasPriceQuery = useGasPrice();
  // We need to serialize in a separate query so we now if we need to invalidate the gasLimit query
  const serializedTransactionQuery = useQuery([networkId, populateTransaction], async () => {
    const tx = await populateTransaction();
    return serialize(tx);
  });
  const optimismLayerOneFeesQuery = useQuery(
    [networkId, serializedTransactionQuery.data],
    () => {
      if (!serializedTransactionQuery.data) {
        throw Error('Query should not be enable when serializedTransactionQuery.data missing');
      }
      return getOptimismLayerOneFees(serializedTransactionQuery.data, networkId);
    },
    { enabled: Boolean(serializedTransactionQuery.data) }
  );

  const gasLimitQuery = useQuery([networkId], getGasLimit);
  const gasPrices = gasPriceQuery.data;

  const gasPrice = gasPrices ? gasPriceQuery.data[gasSpeed] : null;
  const gasLimit = gasLimitQuery.data;
  useEffect(() => {
    if (gasPrice && gasLimit) {
      const gasPriceForTransaction =
        'gasPrice' in gasPrice
          ? { gasPrice: gasPrice.gasPrice, gasLimit }
          : {
              maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
              maxFeePerGas: gasPrice.maxFeePerGas,
              gasLimit,
            };
      onGasOptionChange(gasPriceForTransaction, gasLimit);
    }

    // We let consumers pass in a non memoized onGasPriceChange callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gasPrice, gasLimit]);

  const ethPriceRate = wei(1500); // todo

  const transactionFee = getTransactionPrice(
    gasPrice,
    gasLimitQuery.data || undefined,
    ethPriceRate,
    optimismLayerOneFeesQuery.data || null
  );

  return (
    <Flex justifyContent="space-between">
      <Text>Gas price</Text>
      <Text>
        {transactionFee
          ? formatNumberToUsd(transactionFee.toString(), { maximumFractionDigits: 4 })
          : 'Skeleton'}
      </Text>
    </Flex>
  );
};
