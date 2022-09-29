import { ethers, providers, utils } from 'ethers';
import * as RewardsDistribution from '@synthetixio/contracts/build/mainnet/deployment/RewardsDistribution.js';
import * as ProxyERC20 from '@synthetixio/contracts/build/mainnet/deployment/ProxyERC20.js';

export async function getsnx(envs) {
  const { TENDERLY_FORK_ID: forkId, TENDERLY_WALLET_ADDRESS: wallet } = envs;
  if (!forkId) {
    throw new Error('TENDERLY_FORK_ID is required');
  }
  if (!wallet) {
    throw new Error('TENDERLY_WALLET_ADDRESS is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${forkId}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  const RewardsDistributionContract = new ethers.Contract(
    RewardsDistribution.address,
    RewardsDistribution.abi,
    provider
  );
  const ProxyERC20Contract = new ethers.Contract(ProxyERC20.address, ProxyERC20.abi, provider);

  const rewardsOwner = await RewardsDistributionContract.owner();

  const balancesPre = {
    [wallet]: utils.formatUnits(await ProxyERC20Contract.balanceOf(wallet)),
    [rewardsOwner]: utils.formatUnits(await ProxyERC20Contract.balanceOf(rewardsOwner)),
  };

  const transferTx = await ProxyERC20Contract.connect(provider.getSigner(rewardsOwner)).transfer(
    wallet,
    utils.hexValue(utils.parseEther('100').toHexString())
  );
  const transferTxReceipt = await transferTx.wait();

  const balancesPost = {
    [wallet]: utils.formatUnits(await ProxyERC20Contract.balanceOf(wallet)),
    [rewardsOwner]: utils.formatUnits(await ProxyERC20Contract.balanceOf(rewardsOwner)),
  };

  return {
    balancesPre,
    balancesPost,
    transferTx,
    transferTxReceipt,
  };
}
