async function snapshotSave() {
  const { ethers } = require('ethers');
  const provider = new ethers.providers.JsonRpcProvider(process.env.CYPRESS_TENDERLY_RPC_URL);
  return await provider.send('evm_snapshot', []);
}

async function snapshotLoad(tenderlySnapshot) {
  const { ethers } = require('ethers');
  const provider = new ethers.providers.JsonRpcProvider(process.env.CYPRESS_TENDERLY_RPC_URL);
  return await provider.send('evm_revert', [tenderlySnapshot]);
}

module.exports = { snapshotSave, snapshotLoad };
