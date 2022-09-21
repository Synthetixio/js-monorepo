import { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
// import { useTranslation } from 'react-i18next';
import Wei, { wei } from '@synthetixio/wei';
import { Flex, Text } from '@chakra-ui/react';
import { formatNumberToUsd } from '@snx-v2/formatters';

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

const GWEI_DECIMALS = 9;

const getTotalGasPrice = (gasPrice?: GasPrice | null) => {
  if (!gasPrice) return wei(0);
  const { gasPrice: ovmGasPrice, baseFeePerGas, maxPriorityFeePerGas } = gasPrice;
  if (ovmGasPrice) {
    return wei(ovmGasPrice, GWEI_DECIMALS);
  }
  return wei(baseFeePerGas || 0, GWEI_DECIMALS).add(wei(maxPriorityFeePerGas || 0, GWEI_DECIMALS));
};

const getTransactionPrice = (
  gasPrice: GasPrice | null,
  gasLimit: BigNumber | undefined,
  ethPrice: Wei | null,
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

export const EthGasPriceEstimator: React.FC<{
  gasLimit?: BigNumber;
  gasPrices?: GasPrices;
  optimismLayerOneFees?: Wei;
}> = ({ gasLimit, gasPrices, optimismLayerOneFees }) => {
  // const { t } = useTranslation();

  const [gasSpeed, _setGasSpeed /*Will be used when we have a UI for picking speed*/] = useState<
    'average' | 'fast' | 'fastest'
  >('average');

  if (!gasLimit || !gasPrices) {
    return <Text>Skeleton</Text>;
  }
  const gasPrice = gasPrices[gasSpeed];
  const ethPriceRate = wei(1500); // todo
  const transactionFee = getTransactionPrice(
    gasPrice,
    gasLimit,
    ethPriceRate,
    optimismLayerOneFees
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
