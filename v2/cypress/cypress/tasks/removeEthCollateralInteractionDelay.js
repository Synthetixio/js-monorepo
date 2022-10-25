import { ethers } from 'ethers';
import * as CollateralEth from '@synthetixio/contracts/src/mainnet/deployment/CollateralEth';

export async function removeEthCollateralInteractionDelay(fork) {
  const rpc = `https://rpc.tenderly.co/fork/${fork.simulation_fork.id}`;

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const CollateralEthContract = new ethers.Contract(
    CollateralEth.address,
    CollateralEth.abi,
    provider
  );

  const owner = await CollateralEthContract.owner();
  console.log('removeEthCollateralInteractionDelay', { owner });

  const interactionDelay = await CollateralEthContract.interactionDelay();
  console.log('removeEthCollateralInteractionDelay', {
    interactionDelay: interactionDelay.toNumber(),
  });

  if (interactionDelay > 0) {
    const tx = await CollateralEthContract.connect(provider.getSigner(owner)).setInteractionDelay(
      0
    );
    const receipt = await tx.wait();
    console.log('removeEthCollateralInteractionDelay', { tx: receipt.transactionHash });
    console.log('removeMinimumStakeTime', { result: 'OK' });
  } else {
    console.log('removeMinimumStakeTime', { result: 'SKIP' });
  }

  return null;
}
