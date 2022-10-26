import { ethers } from 'ethers';
import * as RewardsDistribution from '@synthetixio/contracts/src/mainnet/deployment/RewardsDistribution';
import * as ProxyERC20 from '@synthetixio/contracts/src/mainnet/deployment/ProxyERC20';

export async function getSnx(fork, amount = 100) {
  const rpc = `https://rpc.tenderly.co/fork/${fork.simulation_fork.id}`;
  const [[wallet]] = Object.entries(fork.simulation_fork.accounts);
  console.log('getSnx', { rpc, wallet });

  const provider = new ethers.providers.JsonRpcProvider(rpc);

  const RewardsDistributionContract = new ethers.Contract(
    RewardsDistribution.address,
    RewardsDistribution.abi,
    provider
  );
  const ProxyERC20Contract = new ethers.Contract(ProxyERC20.address, ProxyERC20.abi, provider);

  const rewardsOwner = await RewardsDistributionContract.owner();
  console.log('getSnx', { rewardsOwner });

  const balancesPre = {
    [wallet]: parseFloat(ethers.utils.formatUnits(await ProxyERC20Contract.balanceOf(wallet))),
    [rewardsOwner]: parseFloat(
      ethers.utils.formatUnits(await ProxyERC20Contract.balanceOf(rewardsOwner))
    ),
  };
  console.log('getSnx', { balancesPre });

  if (parseFloat(balancesPre[wallet]) < amount) {
    await new Promise((ok) => setTimeout(ok, 1000));
    const transferTx = await ProxyERC20Contract.connect(provider.getSigner(rewardsOwner)).transfer(
      wallet,
      ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString()),
      { gasLimit: 100_000_000 }
    );
    const transferTxReceipt = await transferTx.wait();
    console.log('getSnx', { tx: transferTxReceipt.transactionHash });

    await new Promise((ok) => setTimeout(ok, 1000));
    const balancesPost = {
      [wallet]: parseFloat(ethers.utils.formatUnits(await ProxyERC20Contract.balanceOf(wallet))),
      [rewardsOwner]: parseFloat(
        ethers.utils.formatUnits(await ProxyERC20Contract.balanceOf(rewardsOwner))
      ),
    };
    console.log('getSnx', { balancesPost });
    console.log('getSnx', { result: 'OK' });
  } else {
    console.log('getSnx', { result: 'SKIP' });
  }

  return null;
}
