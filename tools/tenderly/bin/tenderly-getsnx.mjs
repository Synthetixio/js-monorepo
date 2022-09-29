#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { getsnx } from '../lib/getsnx.mjs';
import { utils } from 'ethers';
import { fork } from '../lib/fork.mjs';

Promise.resolve()
  .then(env)
  .then(async (envs) => {
    // augment with CLI arguments
    const { TENDERLY_FORK_ID, TENDERLY_WALLET_ADDRESS, TENDERLY_SNX_OWNER_ADDRESS } = envs;
    const forkId = TENDERLY_FORK_ID ? TENDERLY_FORK_ID : (await fork(envs))?.simulation_fork?.id;

    const [walletAddress = TENDERLY_WALLET_ADDRESS, deployerAddress = TENDERLY_SNX_OWNER_ADDRESS] =
      process.argv.slice(2);

    if (!utils.isAddress(walletAddress) || !utils.isAddress(deployerAddress)) {
      throw new Error(
        [
          'Correct wallet address is required',
          'Usage:',
          '  - TENDERLY_WALLET_ADDRESS=<WALLET_ADDRESS> TENDERLY_SNX_OWNER_ADDRESS=<OWNER_ADDRESS> tenderly-getsnx',
          '  - tenderly-getsnx <WALLET_ADDRESS> <OWNER_ADDRESS>',
          '',
          'Or with ".env.local" present',
          '  - tenderly-getsnx',
          '',
        ].join('\n')
      );
    }

    return {
      TENDERLY_FORK_ID: forkId,
      TENDERLY_WALLET_ADDRESS: walletAddress,
      TENDERLY_SNX_OWNER_ADDRESS: deployerAddress,
    };
  })
  .then(getsnx)
  .then((txn) => console.log(txn))
  .catch(console.error);
