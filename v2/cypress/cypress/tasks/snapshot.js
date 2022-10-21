import { ethers } from 'ethers';

export async function snapshotSave() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.CYPRESS_TENDERLY_RPC_URL);
  return await provider.send('evm_snapshot', []);
}

export async function snapshotLoad(tenderlySnapshot) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.CYPRESS_TENDERLY_RPC_URL);
  return await provider.send('evm_revert', [tenderlySnapshot]);
}
