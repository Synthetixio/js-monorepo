import { ethers } from 'ethers';
import * as SystemSettings from '@synthetixio/contracts/src/mainnet/deployment/SystemSettings';

export async function removeMinimumStakeTime(fork) {
  const rpc = `https://rpc.tenderly.co/fork/${fork.simulation_fork.id}`;

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const SystemSettingsContract = new ethers.Contract(
    SystemSettings.address,
    SystemSettings.abi,
    provider
  );

  const minimumStakeTime = await SystemSettingsContract.minimumStakeTime();
  console.log('removeMinimumStakeTime', { minimumStakeTime: minimumStakeTime.toNumber() });

  if (minimumStakeTime > 0) {
    await new Promise((ok) => setTimeout(ok, 1000));
    const owner = await SystemSettingsContract.owner();
    console.log('removeMinimumStakeTime', { owner });

    const txMinimumStatkeTime = await SystemSettingsContract.connect(
      provider.getSigner(owner)
    ).setMinimumStakeTime(0, { gasLimit: 100_000_000 });
    const receipt = await txMinimumStatkeTime.wait();
    console.log('removeMinimumStakeTime', { tx: receipt.transactionHash });
    console.log('removeMinimumStakeTime', { result: 'OK' });
  } else {
    console.log('removeMinimumStakeTime', { result: 'SKIP' });
  }

  return null;
}
