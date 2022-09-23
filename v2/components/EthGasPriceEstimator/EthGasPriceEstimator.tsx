import { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { Flex, Text, Skeleton } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';
import { GWEI_DECIMALS } from '@snx-v2/Constants';
import { useExchangeRatesData } from '@snx-v2/useExchangeRatesData';

type GasPrice = {
  baseFeePerGas?: BigNumber; // Note that this is used for estimating price and should not be included in the transaction
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  gasPrice?: BigNumber;
};
type GasPrices = {
  average: GasPrice;
  fast: GasPrice;
  fastest: GasPrice;
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

export const EthGasPriceEstimatorUi: React.FC<{
  gasLimit?: BigNumber;
  optimismLayerOneFees?: Wei;
  ethPriceRate?: Wei;
  gasPrice?: GasPrice;
}> = ({ gasLimit, gasPrice, ethPriceRate, optimismLayerOneFees }) => {
  const { t } = useTranslation();
  const transactionFee = getTransactionPrice(
    gasPrice,
    gasLimit,
    ethPriceRate,
    optimismLayerOneFees
  );

  return (
    <Flex width="full" justifyContent="space-between" alignItems="center">
      <Text>{t('staking-v2.eth-gas-price-estimator.gas-price-label')}</Text>
      <Text>
        {transactionFee ? (
          formatNumberToUsd(transactionFee.toString(), { maximumFractionDigits: 4 })
        ) : (
          <Skeleton width={8} height={3} />
        )}
      </Text>
    </Flex>
  );
};

export const EthGasPriceEstimator: React.FC<{
  gasLimit?: BigNumber;
  gasPrices?: GasPrices;
  optimismLayerOneFees?: Wei;
}> = ({ gasLimit, gasPrices, optimismLayerOneFees }) => {
  const { data: exchangeRatesData } = useExchangeRatesData();
  const [gasSpeed, _setGasSpeed /*TODO Will be used when we have a UI for picking speed*/] =
    useState<'average' | 'fast' | 'fastest'>('average');

  const gasPrice = gasPrices?.[gasSpeed];
  const ethPriceRate = exchangeRatesData?.ETH;
  return (
    <EthGasPriceEstimatorUi
      gasLimit={gasLimit}
      gasPrice={gasPrice}
      ethPriceRate={ethPriceRate}
      optimismLayerOneFees={optimismLayerOneFees}
    />
  );
};
