import { ethers } from 'ethers';
import * as CollateralEth from '@synthetixio/contracts/src/mainnet/deployment/CollateralEth';

export async function removeEthCollateralInteractionDelay() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const CollateralEthContract = new ethers.Contract(
    CollateralEth.address,
    CollateralEth.abi,
    provider
  );

  const interactionDelay = await CollateralEthContract.interactionDelay();
  console.log('removeEthCollateralInteractionDelay', {
    interactionDelay: interactionDelay.toNumber(),
  });

  if (interactionDelay > 0) {
    const owner = await CollateralEthContract.owner();
    console.log('removeEthCollateralInteractionDelay', { owner });

    await provider.send('anvil_impersonateAccount', [owner]);
    const signer = provider.getSigner(owner);
    const tx = await CollateralEthContract.connect(signer).setInteractionDelay(0);
    const receipt = await tx.wait();
    console.log('removeEthCollateralInteractionDelay', { tx: receipt.transactionHash });
    await provider.send('anvil_stopImpersonatingAccount', [owner]);

    console.log('removeEthCollateralInteractionDelay', { result: 'OK' });
  } else {
    console.log('removeEthCollateralInteractionDelay', { result: 'SKIP' });
  }

  return null;
}
