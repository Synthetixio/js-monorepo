import { BigNumberish, utils } from 'ethers';

export const formatValue = (value: BigNumberish, decimals = 18) =>
  parseInt(utils.formatUnits(value, decimals));

export const parseUnits = (value: BigNumberish, decimals = 18) =>
  utils.parseUnits(value.toString(), decimals);
