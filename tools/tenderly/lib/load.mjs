import { providers } from 'ethers';

export async function load(envs) {
  const { TENDERLY_FORK_ID, TENDERLY_CHECKPOINT } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }
  if (!TENDERLY_CHECKPOINT) {
    throw new Error('TENDERLY_CHECKPOINT is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  return await provider.send('evm_revert', [TENDERLY_CHECKPOINT]);
}
