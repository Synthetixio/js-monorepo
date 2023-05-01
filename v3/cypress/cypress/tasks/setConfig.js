import { ethers } from 'ethers';
import { importCoreProxy } from './importCoreProxy';
import { setEthBalance } from './setEthBalance';

export async function setConfig({ key, value }) {
  const CoreProxy = await importCoreProxy();
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);

  const owner = await coreProxy.owner();

  const signer = provider.getSigner(owner);
  console.log('setConfig', { owner });

  await setEthBalance({ address: owner, balance: 1000 });

  await provider.send('anvil_impersonateAccount', [owner]);
  console.log(
    `await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key))`,
    await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key))
  );
  const oldValue = parseInt(
    await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key)),
    16
  );
  console.log('setConfig', { key, oldValue });

  const tx = await coreProxy
    .connect(signer)
    .setConfig(ethers.utils.formatBytes32String(key), ethers.utils.formatBytes32String(`${value}`));
  await tx.wait();

  const newValue = parseInt(
    await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key)),
    16
  );
  console.log('setConfig', { key, newValue });
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  return null;
}
