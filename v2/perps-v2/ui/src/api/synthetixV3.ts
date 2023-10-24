import { DuneDelegation, DuneMintBurn, DuneTvl } from './types';

import requester from './index';

export async function getTVLs() {
  return requester.get('/tvl').then((res: any) => res?.data?.result as DuneTvl);
}

export async function getMintBurns() {
  return requester
    .get('/mintburn')
    .then((res: any) => res?.data?.result?.mintburn as DuneMintBurn[]);
}

export async function getDelegations() {
  return requester.get('/delegation').then((res: any) => {
    return res?.data?.result?.delegation as DuneDelegation[];
  });
}
