#!/usr/bin/env node

import * as fs from 'node:fs';
import { env } from '../lib/env.mjs';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(fork)
  .then(async (forkInfo) => {
    const TENDERLY_FORK_ID = forkInfo.simulation_fork.id;
    const [[WALLET_ADDRESS, WALLET_MNEMONIC]] = Object.entries(forkInfo.simulation_fork.accounts);
    const content = [
      `export WALLET_ADDRESS="${WALLET_ADDRESS}"`,
      `export WALLET_MNEMONIC="${WALLET_MNEMONIC}"`,
      `export TENDERLY_RPC_URL="https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}"`,
    ].join('\n');
    await fs.promises.writeFile(process.env.BASH_ENV, content, { flag: 'a' });
  })
  .catch(console.error);
