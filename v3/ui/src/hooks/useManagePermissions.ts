import { useMemo } from 'react';
import { contracts } from '../utils/constants';
import { useContract } from './useContract';
import { MulticallCall, useMulticall } from './useMulticall';
import { utils } from 'ethers';

type Permissions = Array<string>;

const getPermissionDiff = (
  existing: Permissions,
  selected: Permissions
): {
  grants: Permissions;
  revokes: Permissions;
} => {
  let grants: Permissions = [],
    revokes: Permissions = [];
  existing.concat(selected).forEach((permission) => {
    if (!existing.includes(permission)) {
      grants = [...grants, permission];
    }

    if (!selected.includes(permission)) {
      revokes = [...revokes, permission];
    }
  });
  return { grants, revokes };
};

export const useManagePermissions = ({
  accountId,
  target,
  existing = [],
  selected = [],
}: {
  accountId?: string;
  target: string;
  existing: Permissions;
  selected: Permissions;
}) => {
  const { grants, revokes } = getPermissionDiff(existing, selected);
  const snxProxy = useContract(contracts.SYNTHETIX_PROXY);

  const multicalls: MulticallCall[] = useMemo(() => {
    const grantCalls: MulticallCall[] = grants.map((permission) => ({
      contract: snxProxy!.contract,
      functionName: 'grantPermission',
      callArgs: [accountId, utils.formatBytes32String(permission), target],
    }));

    const revokeCalls: MulticallCall[] = revokes.map((permission) => ({
      contract: snxProxy!.contract,
      functionName: 'revokePermission',
      callArgs: [accountId, utils.formatBytes32String(permission), target],
    }));

    return [...grantCalls, ...revokeCalls];
  }, [accountId, grants, revokes, snxProxy, target]);

  return useMulticall(multicalls);
};
