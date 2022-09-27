import { providers } from 'ethers';
import { fork } from './fork.mjs';

export async function save(envs) {
  const {
    simulation_fork: { id },
  } = await fork(envs);

  const RPC_URL = `https://rpc.tenderly.co/fork/${id}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  return await provider.send('evm_snapshot', []);
}
