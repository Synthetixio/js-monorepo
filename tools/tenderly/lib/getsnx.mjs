import { ethers, providers, utils } from 'ethers';
import { address, abi } from '@synthetixio/contracts/build/mainnet/deployment/ProxyERC20.js';

export async function getsnx(envs) {
  const { TENDERLY_FORK_ID, TENDERLY_WALLET_ADDRESS, TENDERLY_SNX_WHALE_ADDRESS } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }
  if (!TENDERLY_WALLET_ADDRESS) {
    throw new Error('TENDERLY_WALLET_ADDRESS is required');
  }
  if (!TENDERLY_SNX_WHALE_ADDRESS) {
    throw new Error('TENDERLY_SNX_WHALE_ADDRESS is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  const signer = provider.getSigner(TENDERLY_WALLET_ADDRESS);
  const contract = new ethers.Contract(address, abi, signer);

  // converts 1 ether into wei, stripping the leading zeros
  const tokenAmount = utils.hexValue(utils.parseEther('100').toHexString());

  const unsignedTx = await contract.populateTransaction.transfer(
    await signer.getAddress(),
    tokenAmount
  );

  return await provider.send('eth_sendTransaction', [
    {
      to: contract.address,
      from: TENDERLY_SNX_WHALE_ADDRESS,
      data: unsignedTx.data,
      gas: utils.hexValue(3000000),
      gasPrice: utils.hexValue(1),
      value: utils.hexValue(0),
    },
  ]);
}
