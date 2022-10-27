import { ethers } from 'ethers';
import * as RewardsDistribution from '@synthetixio/contracts/src/mainnet/deployment/RewardsDistribution';
import * as ProxyERC20 from '@synthetixio/contracts/src/mainnet/deployment/ProxyERC20';

export async function getSnx(amount = 100) {
  const wallet = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const RewardsDistributionContract = new ethers.Contract(
    RewardsDistribution.address,
    RewardsDistribution.abi,
    provider
  );
  const ProxyERC20Contract = new ethers.Contract(ProxyERC20.address, ProxyERC20.abi, provider);

  const myBalance = parseFloat(
    ethers.utils.formatUnits(await ProxyERC20Contract.balanceOf(wallet))
  );
  console.log('getSnx', { myBalance });

  if (myBalance < amount) {
    const owner = await RewardsDistributionContract.owner();
    const ownerBalance = parseFloat(
      ethers.utils.formatUnits(await ProxyERC20Contract.balanceOf(owner))
    );
    console.log('getSnx', { ownerBalance });

    await provider.send('anvil_impersonateAccount', [owner]);
    const signer = provider.getSigner(owner);
    const transferTx = await ProxyERC20Contract.connect(signer).transfer(
      wallet,
      ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString())
    );
    const transferTxReceipt = await transferTx.wait();
    console.log('getSnx', { tx: transferTxReceipt.transactionHash });
    await provider.send('anvil_stopImpersonatingAccount', [owner]);

    console.log('getSnx', { result: 'OK' });
  } else {
    console.log('getSnx', { result: 'SKIP' });
  }

  return null;
}
