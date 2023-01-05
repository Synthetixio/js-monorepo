import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount } from '@snx-v3/useBlockchain';
import { useAccountRead, useSynthetixRead } from '../../../hooks/useDeploymentRead';
import { useSynthetixProxyEvent } from '../../../hooks/useContractEvent';
import { Address } from '../../shared/Address';
import { Item } from './Item';
import { PermissionsEditor } from './PermissionsEditor';
import { TransferOwnership } from './TransferOwnership';

export default function Permissions() {
  const [accountPermissions, setAccountPermissions] = useState<Record<string, Array<string>>>({});

  // Only show edit icon if current account is owner or modify permissions
  const { address: accountAddress } = useAccount();
  const params = useParams();

  const { isLoading: loadingAccountPermissions, data: permissionData } = useSynthetixRead({
    functionName: 'getAccountPermissions',
    args: [params.accountId],
    enabled: Boolean(params.accountId),
    select: (data) => {
      return data.reduce(
        (acc, { user, permissions }) => ({
          ...acc,
          [user]: permissions.map((r: string) => utils.parseBytes32String(r)),
        }),
        {}
      );
    },
  });

  useEffect(() => {
    if (permissionData && !loadingAccountPermissions) {
      setAccountPermissions(permissionData);
    }
  }, [loadingAccountPermissions, permissionData]);

  useSynthetixProxyEvent({
    eventName: 'PermissionGranted',
    listener: (event) => {
      const [eventAccountId, permission, target] = event;

      if (params.accountId === eventAccountId.toString()) {
        setAccountPermissions((currentPermissions) => {
          const parsedPermission = utils.parseBytes32String(permission);
          const targetPermissions = currentPermissions[target];

          if (!targetPermissions?.includes(parsedPermission)) {
            return {
              ...currentPermissions,
              [target]: targetPermissions
                ? [...targetPermissions, utils.parseBytes32String(permission)]
                : [utils.parseBytes32String(permission)],
            };
          } else {
            return currentPermissions;
          }
        });
      }
    },
  });

  useSynthetixProxyEvent({
    eventName: 'PermissionRevoked',
    listener: (event) => {
      const [eventAccountId, permission, target] = event;
      if (params.accountId === eventAccountId.toString()) {
        setAccountPermissions((currentPermissions) => {
          const targetPermissions = currentPermissions[target];
          return {
            ...currentPermissions,
            [target]: targetPermissions
              ? targetPermissions.filter((r) => r !== utils.parseBytes32String(permission))
              : [],
          };
        });
      }
    },
  });

  const { isLoading: loadingOwner, data: accountOwner } = useAccountRead({
    functionName: 'ownerOf',
    args: [params.accountId],
    enabled: Boolean(params.accountId),
    cacheTime: 0,
  });

  return (
    <Box>
      <Flex mb="2">
        <Heading size="md" mb="1">
          Permissions
        </Heading>
        <Box ml="auto">
          {/* only render below if owner or has modify permissions */}
          <PermissionsEditor />
        </Box>
      </Flex>
      {Boolean(accountOwner) ? (
        <Stack>
          <Table size="sm" variant="simple" mb="8">
            <Thead>
              <Tr>
                <Th color="white" pb="2">
                  Address
                </Th>
                <Th color="white" pb="2">
                  Permissions
                </Th>
                <Th color="white" pb="2"></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td py="4">
                  <Skeleton isLoaded={!loadingOwner}>
                    {/* wagmi types return Result which needs to be generic but currently assumes is an object */}
                    {/* @ts-ignore */}
                    <Address address={accountOwner} />
                  </Skeleton>
                </Td>
                <Td>
                  <Tag colorScheme="purple" size="sm" mr="1">
                    Owner
                  </Tag>
                </Td>
                <Td>{accountAddress == accountOwner && <TransferOwnership />}</Td>
              </Tr>

              {Object.keys(accountPermissions)
                .filter((target) => accountPermissions[target].length > 0)
                .map((target) => {
                  return (
                    <Item key={target} address={target} permissions={accountPermissions[target]} />
                  );
                })}
            </Tbody>
          </Table>
        </Stack>
      ) : (
        <Text>No permissions</Text>
      )}
    </Box>
  );
}
