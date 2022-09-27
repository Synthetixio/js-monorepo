#!/usr/bin/env node

import { env } from '../lib/env.mjs';
// import { getsnx } from '../lib/getsnx.mjs';

Promise.resolve()
  .then(env)
  //  .then(getsnx)
  //  .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
  .catch(console.error);
