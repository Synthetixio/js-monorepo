import { atom } from 'recoil';
import { useContractRead } from 'wagmi';
import { CollateralType } from './types';

export const collateralTypesState = atom<Array<CollateralType>>({
  key: 'collateralTypes',
  default: [],
});

export const fundsState = atom<Array<string>>({
  key: 'funds',
  default: [],
});

type RefetchType = ReturnType<typeof useContractRead>['refetch'];
export const accountsState = atom<{
  accounts: Array<number>;
  refetchAccounts?: RefetchType;
}>({
  key: 'userAccounts',
  default: {
    accounts: [],
  },
});

export const chainIdState = atom({
  key: 'localChainId',
  default: 0,
});
