#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { getsnx } from '../lib/getsnx.mjs';
import { utils } from 'ethers';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID, TENDERLY_WALLET_ADDRESS, TENDERLY_SNX_WHALE_ADDRESS } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    const [toAddress = TENDERLY_WALLET_ADDRESS, fromAddress = TENDERLY_SNX_WHALE_ADDRESS] =
      process.argv.slice(2);

    if (!utils.isAddress(toAddress) || !utils.isAddress(fromAddress)) {
      throw new Error(
        [
          'Correct wallet address is required',
          'Usage:',
          '  - TENDERLY_WALLET_ADDRESS=<TO_ADDRESS> TENDERLY_SNX_WHALE_ADDRESS=<FROM_WHALE_ADDRESS> tenderly-getsnx',
          '  - tenderly-getsnx <TO_ADDRESS> <FROM_WHALE_ADDRESS>',
          '',
          'Or with ".env.local" present',
          '  - tenderly-getsnx',
          '',
        ].join('\n')
      );
    }

    return {
      TENDERLY_FORK_ID: forkId,
      TENDERLY_WALLET_ADDRESS: toAddress,
      TENDERLY_SNX_WHALE_ADDRESS: fromAddress,
    };
  })
  .then(getsnx)
  .then((txn) => console.log(txn))
  .catch(console.error);
