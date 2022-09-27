import { providers } from 'ethers';
import { fork } from './fork.mjs';

export async function load(envs) {
  const {
    simulation_fork: { id },
  } = await fork(envs);

  const { TENDERLY_CHECKPOINT } = envs;
  if (!TENDERLY_CHECKPOINT) {
    throw new Error('TENDERLY_CHECKPOINT is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${id}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  return await provider.send('evm_revert', [TENDERLY_CHECKPOINT]);
}
