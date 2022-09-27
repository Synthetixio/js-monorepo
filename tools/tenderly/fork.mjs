#!/usr/bin/env node

import url from 'node:url';
import fetch from 'node-fetch';
import { env } from './lib/env.mjs';
import { loadCachedFork, saveCachedFork } from './lib/cache.mjs';

export async function getFork({
  TENDERLY_FORK_ID,
  TENDERLY_ACCESS_KEY,
  TENDERLY_USER,
  TENDERLY_PROJECT,
}) {
  const res = await fetch(
    `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork/${TENDERLY_FORK_ID}`,
    {
      method: 'GET',
      headers: {
        'X-Access-Key': TENDERLY_ACCESS_KEY,
      },
    }
  );
  return res.json();
}

export async function createFork({ TENDERLY_ACCESS_KEY, TENDERLY_USER, TENDERLY_PROJECT }) {
  const res = await fetch(
    `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`,
    {
      method: 'POST',
      headers: {
        'X-Access-Key': TENDERLY_ACCESS_KEY,
      },
      body: JSON.stringify({
        network_id: 1,
        name: 'Staking tests',
      }),
    }
  );
  return res.json();
}

export async function fork(envs) {
  const { TENDERLY_FORK_ID } = envs;
  const cachedFork = await loadCachedFork();

  // 1. Check if we have fork.json from previous runs and re-use it
  if (!TENDERLY_FORK_ID && cachedFork?.simulation_fork?.id) {
    return cachedFork;
  }

  // 2 If we want to always work with same fork and have it set as ENV, skip creation of a new fork

  // 2.1 We have fork with same ID already cached
  if (
    TENDERLY_FORK_ID &&
    cachedFork?.simulation_fork?.id &&
    `${cachedFork.simulation_fork.id}` === `${TENDERLY_FORK_ID}`
  ) {
    return cachedFork;
  }

  // 2.1 We have stale cache, so fetch the fork info and update the cache
  if (TENDERLY_FORK_ID && `${cachedFork.simulation_fork.id}` !== `${TENDERLY_FORK_ID}`) {
    const forkInfo = await getFork(envs);
    await saveCachedFork(forkInfo);
    return forkInfo;
  }

  // 3. We don't have a fork yet, let's create one
  const forkInfo = await createFork(envs);
  await saveCachedFork(forkInfo);
  return forkInfo;
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  Promise.resolve()
    .then(env)
    .then(fork)
    .then((forkInfo) => console.log(JSON.stringify(forkInfo, null, 2)))
    .catch(console.error);
}
