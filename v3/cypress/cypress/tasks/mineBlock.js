import { ethers } from 'ethers';

export async function mineBlock() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  console.log('mineBlock', {
    oldBlockNumber: await provider.getBlockNumber(),
    oldTimestamp: new Date((await provider.getBlock()).timestamp * 1000),
  });
  await provider.send('evm_mine', []);
  console.log('mineBlock', {
    newBlockNumber: await provider.getBlockNumber(),
    newTimestamp: new Date((await provider.getBlock()).timestamp * 1000),
  });
  return null;
}
