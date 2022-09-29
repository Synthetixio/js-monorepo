import { ethers, providers, utils } from 'ethers';
import * as RewardsDistribution from '@synthetixio/contracts/build/mainnet/deployment/RewardsDistribution.js';
import * as ProxyERC20 from '@synthetixio/contracts/build/mainnet/deployment/ProxyERC20.js';
import * as Synthetix from '@synthetixio/contracts/build/mainnet/deployment/Synthetix.js';

export async function getsnx(envs) {
  const { TENDERLY_FORK_ID, TENDERLY_WALLET_ADDRESS } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }
  if (!TENDERLY_WALLET_ADDRESS) {
    throw new Error('TENDERLY_WALLET_ADDRESS is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);

  const RewardsDistributionContract = new ethers.Contract(
    RewardsDistribution.address,
    RewardsDistribution.abi,
    provider
  );
  const ProxyERC20Contract = new ethers.Contract(ProxyERC20.address, ProxyERC20.abi, provider);
  const SynthetixContract = new ethers.Contract(Synthetix.address, Synthetix.abi, provider);

  const balancePreMint = utils.formatUnits(
    await ProxyERC20Contract.balanceOf(TENDERLY_WALLET_ADDRESS)
  );

  const rewardsOwner = await RewardsDistributionContract.owner();
  const RewardsDistributionContractConnected = RewardsDistributionContract.connect(
    provider.getSigner(rewardsOwner)
  );
  const distributionsLength = await RewardsDistributionContract.distributionsLength();

  // Cleanup all the pending rewards
  await new Array(distributionsLength.toNumber()).fill(0).reduce(async (previous) => {
    await previous;
    const tx = await RewardsDistributionContractConnected.removeRewardDistribution(0);
    await tx.wait();
  }, Promise.resolve);

  const rewardDistributionTx = await RewardsDistributionContractConnected.addRewardDistribution(
    TENDERLY_WALLET_ADDRESS,
    utils.hexValue(utils.parseEther('100').toHexString())
  );
  const rewardDistributionTxReceipt = await rewardDistributionTx.wait();

  const synthetixOwner = await SynthetixContract.owner();
  const SynthetixContractConnected = SynthetixContract.connect(provider.getSigner(synthetixOwner));
  const mintTx = await SynthetixContractConnected.mint({ gasLimit: utils.hexValue(30000000) });
  const mintTxReceipt = await mintTx.wait();

  const balancePostMint = utils.formatUnits(
    await ProxyERC20Contract.balanceOf(TENDERLY_WALLET_ADDRESS)
  );

  return {
    balancePreMint,
    balancePostMint,
    rewardDistributionTx,
    rewardDistributionTxReceipt,
    mintTx,
    mintTxReceipt,
  };
}
