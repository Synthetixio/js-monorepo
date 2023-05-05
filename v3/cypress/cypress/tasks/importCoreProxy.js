import { ethers } from 'ethers';

export async function importCoreProxy() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  switch (network.chainId) {
    case 1:
      return import('@synthetixio/v3-contracts/src/mainnet/CoreProxy');
    case 5:
      return import('@synthetixio/v3-contracts/src/goerli/CoreProxy');
    case 10:
      return import('@synthetixio/v3-contracts/src/optimism-mainnet/CoreProxy');
    case 420:
      return import('@synthetixio/v3-contracts/src/optimism-goerli/CoreProxy');
    default:
      throw new Error(`Unsupported chain ${network.chainId}`);
  }
}
