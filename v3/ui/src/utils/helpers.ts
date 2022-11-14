import { BigNumberish, utils } from 'ethers';

export const formatValue = (value: BigNumberish, decimals = 18) =>
  parseFloat(utils.formatUnits(value, decimals));

export const parseUnits = (value: BigNumberish, decimals = 18) =>
  utils.parseUnits(value.toString(), decimals);

export const compareAddress = (add1: string | null = '', add2: string | null = '') =>
  !!add1 && !!add2 && add1.toLowerCase() === add2.toLowerCase();

export const prettyTx = (text: string, startLength = 6, endLength = 4) => {
  const start = text.substr(0, startLength);
  const end = text.substr(-endLength);
  return `${start}...${end}`;
};
