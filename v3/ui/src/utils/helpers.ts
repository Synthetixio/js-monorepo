import { BigNumberish, utils } from 'ethers';

export const formatValue = (value: BigNumberish, decimals: number) =>
  parseInt(utils.formatUnits(value, decimals));
