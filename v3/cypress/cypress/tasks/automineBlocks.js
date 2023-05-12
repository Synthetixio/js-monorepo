import { ethers } from 'ethers';

export async function automineBlocks({ enabled }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  console.log('automineBlocks', { oldAutomine: await provider.send('anvil_getAutomine', []) });
  await provider.send('evm_setAutomine', [enabled]);
  console.log('automineBlocks', { newAutomine: await provider.send('anvil_getAutomine', []) });
  return null;
}
