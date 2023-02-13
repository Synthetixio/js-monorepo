import { ethers } from 'ethers';
import crypto from 'crypto';
import * as CoreProxy from '@synthetixio/v3-contracts/src/goerli/CoreProxy';

export async function createAccount({ privateKey }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);

  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);

  const currentAccountOwner = await coreProxy.getAccountOwner(accountId);
  console.log('createAccount', { accountId, currentAccountOwner });

  const tx = await coreProxy.createAccount(accountId);
  await tx.wait();

  const newAccountOwner = await coreProxy.getAccountOwner(accountId);
  console.log('createAccount', { accountId, newAccountOwner });

  return accountId;
}
