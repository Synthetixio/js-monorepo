#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { save } from '../lib/save.mjs';

Promise.resolve()
  .then(env)
  .then(save)
  .then((checkpoint) => console.log(checkpoint))
  .catch(console.error);
