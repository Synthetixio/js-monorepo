#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { removeMinimumStakeTime } from '../lib/removeMinimumStakeTime.mjs';
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
  .then(removeMinimumStakeTime)
  .catch(console.error);
