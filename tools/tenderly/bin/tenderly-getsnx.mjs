#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { getsnx } from '../lib/getsnx.mjs';

Promise.resolve()
  .then(env)
  .then(getsnx)
  .then((txn) => console.log(txn))
  .catch(console.error);
