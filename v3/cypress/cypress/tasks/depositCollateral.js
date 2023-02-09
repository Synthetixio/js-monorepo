import { ethers } from 'ethers';
import * as CoreProxy from '@synthetixio/v3-contracts/src/goerli/CoreProxy';
import { getCollateralConfig } from './getCollateralConfig';

export async function depositCollateral({ privateKey, accountId, symbol, amount }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log('depositCollateral', { address: wallet.address, accountId, symbol, amount });

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);

  const tx = await coreProxy.deposit(
    ethers.BigNumber.from(accountId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`)
  );
  await tx.wait();

  return accountId;
}
