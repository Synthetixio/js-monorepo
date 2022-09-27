#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { save } from '../lib/save.mjs';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    const { TENDERLY_FORK_ID } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    return {
      TENDERLY_FORK_ID: forkId,
    };
  })
  .then(save)
  .then((checkpoint) => console.log(checkpoint))
  .catch(console.error);
