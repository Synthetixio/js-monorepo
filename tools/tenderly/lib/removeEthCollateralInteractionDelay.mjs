import { ethers, providers } from 'ethers';
import * as CollateralEth from '@synthetixio/contracts/build/mainnet/deployment/CollateralEth.js';

export async function removeEthCollateralInteractionDelay(envs) {
  const { TENDERLY_FORK_ID: forkId } = envs;
  if (!forkId) {
    throw new Error('TENDERLY_FORK_ID is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${forkId}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);
  const CollateralEthContract = new ethers.Contract(
    CollateralEth.address,
    CollateralEth.abi,
    provider
  );

  const owner = await CollateralEthContract.owner();
  console.log({ owner });

  const interactionDelayPre = await CollateralEthContract.interactionDelay();
  console.log({ interactionDelayPre: interactionDelayPre.toNumber() });

  const tx = await CollateralEthContract.connect(provider.getSigner(owner)).setInteractionDelay(0);
  console.log({ tx });

  const receipt = await tx.wait();
  console.log({ receipt });

  const interactionDelayPost = await CollateralEthContract.interactionDelay();
  console.log({ interactionDelayPost: interactionDelayPost.toNumber() });

  return {
    interactionDelayPre: interactionDelayPre.toNumber(),
    interactionDelayPost: interactionDelayPost.toNumber(),
    tx,
    receipt,
  };
}
