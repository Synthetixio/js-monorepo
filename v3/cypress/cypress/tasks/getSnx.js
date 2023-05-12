import { ethers } from 'ethers';
import { getCollateralConfig } from './getCollateralConfig';
import { setEthBalance } from './setEthBalance';

async function getOwner() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();

  switch (network.chainId) {
    case 1:
      return '0xAc86855865CbF31c8f9FBB68C749AD5Bd72802e3'; // RewardEscrowV2
    case 5:
      return '0x48914229dedd5a9922f44441ffccfc2cb7856ee9';
    case 10:
      return '0x6330D5F08f51057F36F46d6751eCDc0c65Ef7E9e'; // ImportableRewardEscrowV2
    case 420:
      return '0x48914229dedd5a9922f44441ffccfc2cb7856ee9';
    default:
      throw new Error(`Unsupported chain ${network.chainId}`);
  }
}

export async function getSnx({ address, amount }) {
  const config = await getCollateralConfig('SNX');
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const owner = await getOwner();
  //  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  //  const owner = await coreProxy.owner();
  //  console.log('getSnx', { owner });
  await setEthBalance({ address: owner, balance: 1000 });

  const erc20 = new ethers.Contract(
    config.tokenAddress,
    [
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
    ],
    provider
  );

  const oldBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  console.log('getSnx', {
    address,
    oldBalance,
  });

  if (oldBalance > amount) {
    console.log('getSnx', { result: 'SKIP' });
    return;
  }

  const ownerBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(owner)));
  console.log('getSnx', { owner, ownerBalance });

  await provider.send('anvil_impersonateAccount', [owner]);
  const signer = provider.getSigner(owner);
  const transferTx = await erc20
    .connect(signer)
    .transfer(address, ethers.utils.parseEther(`${amount}`));
  await transferTx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  console.log('getSnx', { address, newBalance });

  return null;
}
