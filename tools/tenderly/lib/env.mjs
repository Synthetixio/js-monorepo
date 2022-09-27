import path from 'node:path';
import url from 'node:url';
import * as dotenv from 'dotenv';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  debug: false,
  override: true,
  path: path.resolve(__dirname, '..', '.env.local'),
});

export function required(env) {
  throw new Error(`${env} is required`);
}

export const UUID_REGEX = new RegExp(
  '^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$'
);

export function env() {
  const {
    TENDERLY_ACCESS_KEY = required('TENDERLY_ACCESS_KEY'),
    TENDERLY_USER = 'synthetix',
    TENDERLY_PROJECT = 'mainnet',
    TENDERLY_FORK_ID = '',
    TENDERLY_WALLET_ADDRESS = '',
    TENDERLY_SNX_WHALE_ADDRESS = '',
    TENDERLY_CHECKPOINT = '',
  } = process.env;

  return {
    TENDERLY_ACCESS_KEY,
    TENDERLY_USER,
    TENDERLY_PROJECT,
    TENDERLY_FORK_ID,
    TENDERLY_WALLET_ADDRESS,
    TENDERLY_SNX_WHALE_ADDRESS,
    TENDERLY_CHECKPOINT,
  };
}
