#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { removeEthCollateralInteractionDelay } from '../lib/removeEthCollateralInteractionDelay.mjs';
import { fork } from '../lib/fork.mjs';

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
  .then(removeEthCollateralInteractionDelay)
  .catch(console.error);
