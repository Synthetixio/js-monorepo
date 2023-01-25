import { ethers } from 'ethers';

export async function forkReset() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  await provider.send('anvil_reset', [
    {
      forking: {
        jsonRpcUrl: '',
        blockNumber: 14390000,
      },
    },
  ]);
  console.log('forkReset', { result: 'OK' });
  return null;
}
