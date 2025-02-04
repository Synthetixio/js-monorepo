import { NetworkId, NetworkNameById } from '@synthetixio/contracts-interface';

import { GasLimitEstimate } from 'constants/network';
import Wei, { wei } from '@synthetixio/wei';
import { GWEI_DECIMALS } from './infura';
import { GasPrice } from '@synthetixio/queries';

export function isSupportedNetworkId(id: number | string): id is NetworkId {
  return id in NetworkNameById;
}

export const getTotalGasPrice = (gasPriceObj?: GasPrice | null) => {
  if (!gasPriceObj) return wei(0);
  const { gasPrice, baseFeePerGas, maxPriorityFeePerGas } = gasPriceObj;
  if (gasPrice) {
    return wei(gasPrice, GWEI_DECIMALS);
  }
  return wei(baseFeePerGas || 0, GWEI_DECIMALS).add(wei(maxPriorityFeePerGas || 0, GWEI_DECIMALS));
};

export const getTransactionPrice = (
  gasPrice: GasPrice | null,
  gasLimit: GasLimitEstimate,
  ethPrice: Wei | null,
  optimismLayerOneFee: Wei | null
) => {
  if (!gasPrice || !gasLimit || !ethPrice) return null;
  const totalGasPrice = getTotalGasPrice(gasPrice);

  const extraLayer1Fees = optimismLayerOneFee;
  const gasPriceCost = totalGasPrice.mul(wei(gasLimit, GWEI_DECIMALS)).mul(ethPrice);
  const l1Cost = ethPrice.mul(extraLayer1Fees || 0);

  const txPrice = gasPriceCost.add(l1Cost);

  return txPrice;
};

export const getIsOVM = (networkId: number): boolean => !!~[10, 69, 420].indexOf(networkId);
