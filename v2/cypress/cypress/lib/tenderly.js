import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs/promises';

function cache(testname) {
  return path.resolve(__dirname, `../forks/${testname}.json`);
}

export async function loadCachedFork(testname) {
  try {
    return JSON.parse(await fs.readFile(cache(testname), 'utf8'));
  } catch (_e) {
    return null;
  }
}

export async function saveCachedFork(testname, fork) {
  await fs.mkdir(path.dirname(cache(testname)), { recursive: true });
  return await fs.writeFile(cache(testname), JSON.stringify(fork, null, 2), 'utf8');
}

export async function rmCachedFork(testname) {
  return await fs.unlink(cache(testname));
}

export async function createFork() {
  const { TENDERLY_ACCESS_KEY, TENDERLY_USER, TENDERLY_PROJECT } = process.env;
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

export async function rmFork(forkId) {
  const { TENDERLY_ACCESS_KEY, TENDERLY_USER, TENDERLY_PROJECT } = process.env;
  const res = await fetch(
    `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork/${forkId}`,
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
