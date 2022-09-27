import path from 'node:path';
import fs from 'node:fs/promises';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE = path.resolve(__dirname, '..', 'fork.json');

export async function loadCachedFork() {
  try {
    return JSON.parse(await fs.readFile(CACHE, 'utf8'));
  } catch (_e) {
    return null;
  }
}

export async function saveCachedFork(fork) {
  return await fs.writeFile(CACHE, JSON.stringify(fork, null, 2), 'utf8');
}

export async function rmCachedFork() {
  return await fs.unlink(CACHE);
}
