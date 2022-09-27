#!/usr/bin/env node

import { env } from '../lib/env.mjs';
// import { geteth } from '../lib/geteth.mjs';

Promise.resolve()
  .then(env)
  //  .then(geteth)
  //  .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
  .catch(console.error);
