#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(fork)
  .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
  .catch(console.error);
