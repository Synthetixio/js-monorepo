import { ethers } from 'ethers';
import * as CoreProxy from '@synthetixio/v3-contracts/src/goerli/CoreProxy';
import { setEthBalance } from './setEthBalance';

export async function setConfig({ key, value }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);

  try {
    const owner = await coreProxy.owner();

    const signer = provider.getSigner(owner);
    console.log('setConfig', { owner });

    await setEthBalance({ address: owner, balance: 1000 });

    await provider.send('anvil_impersonateAccount', [owner]);
    const oldValue = ethers.utils.parseBytes32String(
      await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key))
    );
    console.log('setConfig', { key, oldValue });

    const tx = await coreProxy
      .connect(signer)
      .setConfig(
        ethers.utils.formatBytes32String(key),
        ethers.utils.formatBytes32String(`${value}`)
      );
    await tx.wait();

    const newValue = ethers.utils.parseBytes32String(
      await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key))
    );
    console.log('setConfig', { key, newValue });
    await provider.send('anvil_stopImpersonatingAccount', [owner]);
  } catch (err) {
    console.log('setConfig', err);
  }

  return null;
}
