import { providers, utils } from 'ethers';
import { fork } from './fork.mjs';

export async function geteth(envs) {
  const {
    simulation_fork: { id },
  } = await fork(envs);

  const RPC_URL = `https://rpc.tenderly.co/fork/${id}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  const { TENDERLY_WALLET_ADDRESS } = envs;
  if (!TENDERLY_WALLET_ADDRESS) {
    throw new Error('TENDERLY_WALLET_ADDRESS is required');
  }

  return await provider.send('tenderly_setBalance', [
    [TENDERLY_WALLET_ADDRESS],
    //amount in wei will be set for all wallets
    utils.hexValue(utils.parseUnits('100', 'ether').toHexString()),
  ]);
}
