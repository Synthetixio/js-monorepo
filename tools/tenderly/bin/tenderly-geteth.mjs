#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { geteth } from '../lib/geteth.mjs';
import { fork } from '../lib/fork.mjs';
import { utils } from 'ethers';

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID, TENDERLY_WALLET_ADDRESS } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    const [walletAddress = TENDERLY_WALLET_ADDRESS] = process.argv.slice(2);

    if (!utils.isAddress(walletAddress)) {
      throw new Error(
        [
          'Correct wallet address is required',
          'Usage:',
          '  - TENDERLY_WALLET_ADDRESS=<WALLET_ADDRESS> tenderly-geteth',
          '  - tenderly-geteth <WALLET_ADDRESS>',
          '',
          'Or with ".env.local" present',
          '  - tenderly-geteth',
          '',
        ].join('\n')
      );
    }

    return {
      TENDERLY_FORK_ID: forkId,
      TENDERLY_WALLET_ADDRESS: walletAddress,
    };
  })
  .then(geteth)
  .then((txn) => console.log(txn))
  .catch(console.error);
