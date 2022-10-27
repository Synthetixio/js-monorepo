import { createFork, loadCachedFork, rmCachedFork, rmFork, saveCachedFork } from '../lib/tenderly';

export async function fork(testname) {
  const cachedFork = await loadCachedFork(testname);
  if (cachedFork?.simulation_fork?.id) {
    return cachedFork;
  }
  const forkInfo = await createFork();
  await saveCachedFork(testname, forkInfo);
  return forkInfo;
}

export async function unfork(testname) {
  const cachedFork = await loadCachedFork(testname);
  if (!cachedFork?.simulation_fork?.id) {
    throw new Error('No cached fork to remove');
  }
  await rmFork(cachedFork?.simulation_fork?.id);
  await rmCachedFork(testname);
  return true;
}
