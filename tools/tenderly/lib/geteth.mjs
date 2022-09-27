import { providers, utils } from 'ethers';

export async function geteth(envs) {
  const { TENDERLY_FORK_ID, TENDERLY_WALLET_ADDRESS } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }
  if (!TENDERLY_WALLET_ADDRESS) {
    throw new Error('TENDERLY_WALLET_ADDRESS is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  return await provider.send('tenderly_addBalance', [
    [TENDERLY_WALLET_ADDRESS],
    // amount in wei will be set for all wallets
    utils.hexValue(utils.parseUnits('100', 'ether').toHexString()),
  ]);
}
