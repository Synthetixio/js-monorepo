import { BigNumberish, utils } from 'ethers';
import { wei, WeiSource } from '@synthetixio/wei';

export const formatValue = (value: BigNumberish, decimals = 18) =>
  parseFloat(utils.formatUnits(value, decimals));

export const parseUnits = (value: WeiSource, decimals = 18) => wei(value, decimals).toBN();

export const compareAddress = (add1: string | null = '', add2: string | null = '') =>
  !!add1 && !!add2 && add1.toLowerCase() === add2.toLowerCase();

export const prettyString = (text: string, startLength = 6, endLength = 4) =>
  `${text.substring(0, startLength)}...${text.substring(text.length - endLength)}`;
