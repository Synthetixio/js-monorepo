export function etherscanLink({ chain, address }: { chain: string; address: string }): string {
  switch (chain) {
    case 'goerli':
      return `https://goerli.etherscan.io/address/${address}`;
    case 'optimism-goerli':
      return `https://goerli-optimism.etherscan.io/address/${address}`;
    case 'optimism':
      return `https://optimistic.etherscan.io/address/${address}`;
    case 'mainnet':
    default:
      return `https://etherscan.io/address/${address}`;
  }
}
