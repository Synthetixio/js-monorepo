#!/usr/bin/env node

import { env } from '../lib/env.mjs';
// import { save } from '../lib/save.mjs';

Promise.resolve()
  .then(env)
  //  .then(save)
  //  .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
  .catch(console.error);
