#!/usr/bin/env node

import { env, UUID_REGEX } from '../lib/env.mjs';
import { load } from '../lib/load.mjs';

Promise.resolve()
  .then(env)
  .then((envs) => {
    // augment with CLI arguments
    const { TENDERLY_CHECKPOINT = '' } = envs;
    const [checkpoint = TENDERLY_CHECKPOINT] = process.argv.slice(2);

    if (checkpoint?.length > 0 && !UUID_REGEX.test(checkpoint)) {
      throw new Error(`TENDERLY_CHECKPOINT must be correct UUID`);
    }
    return { ...envs, TENDERLY_CHECKPOINT: checkpoint };
  })
  .then(load)
  .then((result) => console.log(result))
  .catch(console.error);
