import { ethers } from 'ethers';

export async function setEthBalance({ pk, balance }) {
  const wallet = new ethers.Wallet(pk);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const oldBalance = parseFloat(
    ethers.utils.formatUnits(await provider.getBalance(wallet.address))
  );
  console.log('getEth', { oldBalance });
  await provider.send('anvil_setBalance', [
    wallet.address,
    ethers.utils.parseEther(`${balance}`).toHexString(),
  ]);
  const newBalance = parseFloat(
    ethers.utils.formatUnits(await provider.getBalance(wallet.address))
  );
  console.log('getEth', { newBalance });
  console.log('setEthBalance', { result: 'OK' });
  return newBalance;
}
