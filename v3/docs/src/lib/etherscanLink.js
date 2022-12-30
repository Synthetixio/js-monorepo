export function etherscanLink({ chain, address }) {
  switch (chain) {
    case 'goerli':
      return `https://goerli.etherscan.io/address/${address}`;
    case 'optimism-goerli':
      return `https://goerli-optimism.etherscan.io/address/${address}`;
    default:
      return `https://etherscan.io/address/${address}`;
  }
}
