#!/usr/bin/env node

import { ethers, providers } from 'ethers';
import * as SystemSettings from '@synthetixio/contracts/build/mainnet/deployment/SystemSettings.js';
import { env } from '../lib/env.mjs';
import { fork } from '../lib/fork.mjs';

async function run(envs) {
  const { TENDERLY_FORK_ID } = envs;
  if (!TENDERLY_FORK_ID) {
    throw new Error('TENDERLY_FORK_ID is required');
  }

  const RPC_URL = `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`;
  const provider = new providers.JsonRpcProvider(RPC_URL);
  const SystemSettingsContract = new ethers.Contract(
    SystemSettings.address,
    SystemSettings.abi,
    provider
  );

  const owner = await SystemSettingsContract.owner();
  console.log({ owner });

  const minimumStakeTime = await SystemSettingsContract.minimumStakeTime();
  console.log({ minimumStakeTime: minimumStakeTime.toNumber() });
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
