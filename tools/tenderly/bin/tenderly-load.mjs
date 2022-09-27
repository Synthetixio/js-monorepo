#!/usr/bin/env node

import { env, UUID_REGEX } from '../lib/env.mjs';
import { load } from '../lib/load.mjs';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID, TENDERLY_CHECKPOINT } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    const [checkpoint = TENDERLY_CHECKPOINT] = process.argv.slice(2);

    if (checkpoint?.length > 0 && !UUID_REGEX.test(checkpoint)) {
      throw new Error(`TENDERLY_CHECKPOINT must be correct UUID`);
    }
    return {
      TENDERLY_FORK_ID: forkId,
      TENDERLY_CHECKPOINT: checkpoint,
    };
  })
  .then(load)
  .then((result) => console.log(result))
  .catch(console.error);
