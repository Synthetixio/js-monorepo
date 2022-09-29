#!/usr/bin/env node

import { ethers, providers, utils } from 'ethers';
import * as RewardsDistribution from '@synthetixio/contracts/build/mainnet/deployment/RewardsDistribution.js';
import { env } from './lib/env.mjs';
import { fork } from './lib/fork.mjs';

async function run(envs) {
  const { TENDERLY_FORK_ID } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);
  const RewardsDistributionContract = new ethers.Contract(
    RewardsDistribution.address,
    RewardsDistribution.abi,
    provider
  );

  const rewardsOwner = await RewardsDistributionContract.owner();
  console.log({ 'RewardsDistribution.owner': rewardsOwner });

  const distributionsLength = await RewardsDistributionContract.distributionsLength();
  console.log({ distributionsLength: distributionsLength.toNumber() });

  const RewardsDistributionContractConnected = RewardsDistributionContract.connect(
    provider.getSigner(rewardsOwner)
  );

  await new Array(distributionsLength.toNumber()).fill(0).reduce(async (previous) => {
    await previous;
    const distribution = await RewardsDistributionContract.distributions(0);
    console.log({
      distributionToRemove: {
        destination: distribution.destination,
        amount: utils.formatUnits(distribution.amount),
      },
    });
    const tx = await RewardsDistributionContractConnected.removeRewardDistribution(0);
    const receipt = await tx.wait();
    console.log({ tx, receipt });
  }, Promise.resolve);
}

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    return {
      TENDERLY_FORK_ID: forkId,
    };
  })
  .then(run)
  .catch(console.error);
