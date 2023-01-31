import { ethers } from 'ethers';
import * as CoreProxy from '@synthetixio/v3-contracts/src/goerli/CoreProxy';

const erc20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
];

export async function wrapEth(amount = 1) {
  const wallet = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const signer = provider.getSigner(wallet);

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, signer);
  const collateralConfigs = await coreProxy.getCollateralConfigurations(true);
  const collaterals = await Promise.all(
    collateralConfigs.map(async (config) => {
      const contract = new ethers.Contract(config.tokenAddress, erc20Abi, signer);
      const symbol = await contract.symbol();
      return { contract, symbol };
    })
  );
  const weth = collaterals.find(({ symbol }) => symbol === 'WETH').contract;
  const balance = parseFloat(ethers.utils.formatUnits(await weth.balanceOf(wallet)));

  if (balance >= amount) {
    console.log('wrapEth', { balance });
    console.log('wrapEth', { result: 'SKIP' });
    return balance;
  }

  const wrapTx = await weth.deposit({
    value: ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString()),
  });
  const receipt = await wrapTx.wait();
  console.log('wrapEth', { tx: receipt.transactionHash });
  const newBalance = parseFloat(ethers.utils.formatUnits(await weth.balanceOf(wallet)));
  console.log('wrapEth', {
    balance: newBalance,
  });
  console.log('wrapEth', { result: 'OK' });
  return newBalance;
}
