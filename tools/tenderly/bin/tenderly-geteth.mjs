#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { geteth } from '../lib/geteth.mjs';

Promise.resolve()
  .then(env)
  .then(geteth)
  .then((txn) => console.log(txn))
  .catch(console.error);
