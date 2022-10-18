async function removeMinimumStakeTime() {
  const { ethers } = require('ethers');
  const SystemSettings = require('@synthetixio/contracts/build/mainnet/deployment/SystemSettings.js');

  const provider = new ethers.providers.JsonRpcProvider(process.env.CYPRESS_TENDERLY_RPC_URL);
  const SystemSettingsContract = new ethers.Contract(
    SystemSettings.address,
    SystemSettings.abi,
    provider
  );

  const minimumStakeTime = await SystemSettingsContract.minimumStakeTime();
  console.log('removeMinimumStakeTime', { minimumStakeTime: minimumStakeTime.toNumber() });

  if (minimumStakeTime > 0) {
    const owner = await SystemSettingsContract.owner();
    console.log('removeMinimumStakeTime', { owner });

    const txMinimumStatkeTime = await SystemSettingsContract.connect(
      provider.getSigner(owner)
    ).setMinimumStakeTime(0, { gasLimit: 1000000 });
    const receipt = await txMinimumStatkeTime.wait();
    console.log('removeMinimumStakeTime', { tx: receipt.transactionHash });
    console.log('removeMinimumStakeTime', { result: 'OK' });
  } else {
    console.log('removeMinimumStakeTime', { result: 'SKIP' });
  }

  return null;
}

module.exports = { removeMinimumStakeTime };
