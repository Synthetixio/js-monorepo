#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { unfork } from '../lib/unfork.mjs';

Promise.resolve()
  .then(env)
  .then(unfork)
  .then((result) => console.log(result))
  .catch(console.error);
