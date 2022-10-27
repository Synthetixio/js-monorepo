import { ethers } from 'ethers';
import * as SystemSettings from '@synthetixio/contracts/src/mainnet/deployment/SystemSettings';

export async function removeMinimumStakeTime() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
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

    await provider.send('anvil_impersonateAccount', [owner]);
    const signer = provider.getSigner(owner);
    const txMinimumStakeTime = await SystemSettingsContract.connect(signer).setMinimumStakeTime(0);
    const receipt = await txMinimumStakeTime.wait();
    console.log('removeMinimumStakeTime', { tx: receipt.transactionHash });
    await provider.send('anvil_stopImpersonatingAccount', [owner]);

    console.log('removeMinimumStakeTime', { result: 'OK' });
  } else {
    console.log('removeMinimumStakeTime', { result: 'SKIP' });
  }

  return null;
}
