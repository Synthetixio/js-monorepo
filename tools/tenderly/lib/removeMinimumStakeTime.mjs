import { ethers, providers } from 'ethers';
import * as SystemSettings from '@synthetixio/contracts/build/mainnet/deployment/SystemSettings.js';

export async function removeMinimumStakeTime(envs) {
  const { TENDERLY_FORK_ID: forkId } = envs;
  if (!forkId) {
    throw new Error('TENDERLY_FORK_ID is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${forkId}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);
  const SystemSettingsContract = new ethers.Contract(
    SystemSettings.address,
    SystemSettings.abi,
    provider
  );

  const owner = await SystemSettingsContract.owner();
  console.log({ owner });

  const minimumStakeTimePre = await SystemSettingsContract.minimumStakeTime();
  console.log({ minimumStakeTimePre: minimumStakeTimePre.toNumber() });

  const tx = await SystemSettingsContract.connect(provider.getSigner(owner)).setMinimumStakeTime(0);
  console.log({ tx });

  const receipt = await tx.wait();
  console.log({ receipt });

  const minimumStakeTimePost = await SystemSettingsContract.minimumStakeTime();
  console.log({ minimumStakeTimePost: minimumStakeTimePost.toNumber() });

  return {
    minimumStakeTimePre: minimumStakeTimePre.toNumber(),
    minimumStakeTimePost: minimumStakeTimePost.toNumber(),
    tx,
    receipt,
  };
}
