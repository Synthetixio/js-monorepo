#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(fork)
  .then(async (forkInfo) => {
    const TENDERLY_FORK_ID = forkInfo.simulation_fork.id;
    const [[WALLET_ADDRESS, WALLET_PK]] = Object.entries(forkInfo.simulation_fork.accounts);
    const content = [
      `export CYPRESS_WALLET_ADDRESS="${WALLET_ADDRESS}"`,
      `export CYPRESS_WALLET_PK="${WALLET_PK}"`,
      `export CYPRESS_TENDERLY_RPC_URL="https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}"`,
    ].join('\n');
    console.log(content);
  })
  .catch(console.error);
