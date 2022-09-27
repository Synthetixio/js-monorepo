#!/usr/bin/env node

import url from 'node:url';
import fetch from 'node-fetch';
import { env } from './lib/env.mjs';
import { rmCachedFork, loadCachedFork } from './lib/cache.mjs';

export async function rmFork({
  TENDERLY_ACCESS_KEY,
  TENDERLY_USER,
  TENDERLY_PROJECT,
  TENDERLY_FORK_ID,
}) {
  const res = await fetch(
    `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork/${TENDERLY_FORK_ID}`,
    {
      method: 'DELETE',
      headers: {
        'X-Access-Key': TENDERLY_ACCESS_KEY,
      },
    }
  );
  const text = await res.text();
  if (res.status !== 200 && text.includes('error')) {
    let message = text;
    try {
      const data = JSON.parse(text);
      if (data?.error?.message) {
        message = data?.error?.message;
      }
    } catch (_e) {
      throw new Error(message);
    }
  }
  return text;
}

export async function unfork({ TENDERLY_FORK_ID, ...envs }) {
  const cachedFork = await loadCachedFork();
  const forkId = cachedFork?.simulation_fork?.id ?? TENDERLY_FORK_ID;

  if (!forkId) {
    throw new Error(
      [
        'Tenderly fork ID is required',
        'Usage:',
        '  - TENDERLY_FORK_ID=<ID_HERE> tenderly-unfork',
        '  - tenderly-unfork <TENDERLY_FORK_ID_HERE>',
        '',
        'Or with "fork.json" present',
        '  - tenderly-unfork',
        '',
      ].join('\n')
    );
  }

  const result = await rmFork({ TENDERLY_FORK_ID: forkId, ...envs });
  await rmCachedFork();
  return result;
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  Promise.resolve()
    .then(env)
    .then(unfork)
    .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
    .catch(console.error);
}
