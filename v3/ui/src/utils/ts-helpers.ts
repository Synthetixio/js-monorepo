export const assertAddressType = (tokenAddress?: string): tokenAddress is `0x${string}` =>
  tokenAddress ? tokenAddress.startsWith('0x') : false;
