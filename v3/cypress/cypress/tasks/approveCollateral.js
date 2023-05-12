import { ethers } from 'ethers';
import { importCoreProxy } from './importCoreProxy';
import { getCollateralConfig } from './getCollateralConfig';

export async function approveCollateral({ privateKey, symbol }) {
  const CoreProxy = await importCoreProxy();
  const wethConfig = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log('approveCollateral', { wallet: wallet.address, symbol });

  const wethContract = new ethers.Contract(
    wethConfig.tokenAddress,
    ['function approve(address spender, uint256 amount) returns (bool)'],
    wallet
  );
  const tx = await wethContract.approve(CoreProxy.address, ethers.constants.MaxUint256);
  await tx.wait();
  return null;
}
