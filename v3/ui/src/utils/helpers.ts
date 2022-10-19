import { BigNumberish, utils } from 'ethers';

export const formatValue = (value: BigNumberish, decimals = 18) =>
  parseInt(utils.formatUnits(value, decimals));

export const parseUnits = (value: BigNumberish, decimals = 18) =>
  utils.parseUnits(value.toString(), decimals);

export const compareAddress = (add1: string | null = '', add2: string | null = '') =>
  !!add1 && !!add2 && add1.toLowerCase() === add2.toLowerCase();
