#!/usr/bin/env node

import { env } from '../lib/env.mjs';
import { geteth } from '../lib/geteth.mjs';
import { utils } from 'ethers';

Promise.resolve()
  .then(env)
  .then((envs) => {
    // augment with CLI arguments
    const { TENDERLY_WALLET_ADDRESS = '' } = envs;
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

    return { ...envs, TENDERLY_WALLET_ADDRESS: walletAddress };
  })
  .then(geteth)
  .then((txn) => console.log(txn))
  .catch(console.error);
