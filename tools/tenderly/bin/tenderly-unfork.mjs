#!/usr/bin/env node

import { env, UUID_REGEX } from '../lib/env.mjs';
import { unfork } from '../lib/unfork.mjs';

Promise.resolve()
  .then(env)
  .then((envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID = '' } = envs;
    const [forkId = TENDERLY_FORK_ID] = process.argv.slice(2);

    if (forkId?.length > 0 && !UUID_REGEX.test(forkId)) {
      throw new Error(`TENDERLY_FORK_ID must be correct UUID`);
    }
    return { ...envs, TENDERLY_FORK_ID: forkId };
  })
  .then(unfork)
  .then((result) => console.log(result))
  .catch(console.error);
