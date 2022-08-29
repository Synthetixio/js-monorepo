import { BigNumberish, utils } from 'ethers';

export const formatValue = (value: BigNumberish, decimals = 18) =>
  parseInt(utils.formatUnits(value, decimals));
