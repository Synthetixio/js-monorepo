import { providers } from 'ethers';

export async function save(envs) {
  const { TENDERLY_FORK_ID } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  return await provider.send('evm_snapshot', []);
}
