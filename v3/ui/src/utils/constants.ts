export const contracts = {
  SYNTHETIX_PROXY: 'SYNTHETIX_PROXY',
  SNX_USD_PROXY: 'SNX_USD_PROXY',
  ACCOUNT_PROXY: 'ACCOUNT_PROXY',
  SNX_REWARD: 'SNX_REWARD',
  CCIP: 'CCIP',
};

export const poolsData: Record<string, { name: string }> = {
  1: {
    name: 'Spartan Council',
  },
  0: {
    name: 'None',
  },
};

export const INFURA_KEY = '23087ce9f88c44d1b1c54fd7c07c65fb';

export const ALCHEMY_KEY_MAPPING: Record<number, string> = {
  1: 'Yq-4rzpsP9Dz8mvjHRQ8lUrmNLNocuQs',
  5: '6btiU37vkhQ8DJkdV4qggEWXehpgw2aI',
  10: '-ktIzLrAY_Sf7AAlM1aTuZ-PObMop5sU',
  420: 'lc1tSn8B8fmURkjmZLeyT1ibNpgqlsnr',
};

export const DEFAULT_REQUEST_REFRESH_INTERVAL = 300000; // 5min
