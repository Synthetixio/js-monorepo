export function assertAddressType(tokenAddress?: string): tokenAddress is `0x${string}` {
  return tokenAddress ? tokenAddress.startsWith('0x') : false;
}
