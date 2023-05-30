import { ethers } from 'ethers';
import { getCollateralConfig } from './getCollateralConfig';
import { importCoreProxy } from './importCoreProxy';

export async function delegateCollateral({ privateKey, accountId, symbol, amount, poolId }) {
  const CoreProxy = await importCoreProxy();
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log('delegateCollateral', { address: wallet.address, accountId, symbol, amount, poolId });

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);

  const tx = await coreProxy.delegateCollateral(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
    ethers.utils.parseEther(`1`),
    { gasLimit: 10_000_000 }
  );
  await tx.wait();

  return accountId;
}
