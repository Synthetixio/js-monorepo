import { ethers } from 'ethers';

export async function setEthBalance({ address, balance }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const oldBalance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(address)));
  console.log('setEthBalance', { oldBalance });
  await provider.send('anvil_setBalance', [
    address,
    ethers.utils.parseEther(`${balance}`).toHexString(),
  ]);
  const newBalance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(address)));
  console.log('setEthBalance', { newBalance });
  return newBalance;
}
