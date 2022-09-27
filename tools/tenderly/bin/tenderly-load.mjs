#!/usr/bin/env node

import { env } from '../lib/env.mjs';
// import { load } from '../lib/load.mjs';

Promise.resolve()
  .then(env)
  //  .then(load)
  //  .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
  .catch(console.error);
