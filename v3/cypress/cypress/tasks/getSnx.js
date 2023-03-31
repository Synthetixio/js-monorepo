import { ethers } from 'ethers';
// import * as CoreProxy from '@synthetixio/v3-contracts/src/goerli/CoreProxy';
import { getCollateralConfig } from './getCollateralConfig';

// TODO: make it more dynamic, for now just want to fix tests
const owner = '0x48914229deDd5A9922f44441ffCCfC2Cb7856Ee9';

export async function getSnx({ address, amount }) {
  const config = await getCollateralConfig('SNX');
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  //  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  //  const owner = await coreProxy.owner();
  //  console.log('getSnx', { owner });
  console.log('getSnx', { owner });

  const erc20 = new ethers.Contract(
    config.tokenAddress,
    [
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
    ],
    provider
  );

  const oldBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  console.log('getSnx', { address, oldBalance });

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
