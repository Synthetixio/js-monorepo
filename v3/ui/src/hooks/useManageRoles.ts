import { useMemo } from 'react';
import { contracts } from '../utils/constants';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { utils } from 'ethers';

type Roles = Array<string>;

const getRoleDiff = (
  existing: Roles,
  selected: Roles
): {
  grants: Roles;
  revokes: Roles;
} => {
  let grants: Roles = [],
    revokes: Roles = [];
  existing.concat(selected).forEach((role) => {
    if (!existing.includes(role)) {
      grants = [...grants, role];
    }

    if (!selected.includes(role)) {
      revokes = [...revokes, role];
    }
  });
  return { grants, revokes };
};

export const useManageRoles = (
  accountId: string,
  target: string,
  existing: Roles = [],
  selected: Roles = []
) => {
  const { grants, revokes } = getRoleDiff(existing, selected);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);

  const multicalls: MulticallCall[][] = useMemo(() => {
    const grantCalls: MulticallCall[] = grants.map((role) => [
      snxProxy!.contract,
      'grantRole',
      [accountId, utils.formatBytes32String(role), target],
    ]);
    const revokeCalls: MulticallCall[] = revokes.map((role) => [
      snxProxy!.contract,
      'revokeRole',
      [accountId, utils.formatBytes32String(role), target],
    ]);

    return [[...grantCalls, ...revokeCalls]];
  }, [accountId, grants, revokes, snxProxy, target]);

  return useMulticall(multicalls);
};
