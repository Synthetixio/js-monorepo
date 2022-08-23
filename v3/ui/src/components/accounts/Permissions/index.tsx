import { Address } from '../../shared/Address';
import { Item } from './Item';
import { PermissionsEditor } from './PermissionsEditor';
import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Stack,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useParams } from 'react-router-dom';
import { useAccountRead, useSynthetixProxyEvent, useSynthetixRead } from '../../../hooks';
import { BigNumber, utils } from 'ethers';
import { useEffect, useState } from 'react';
import { AddressInput } from './AddressInput';
import { TransferOwnership } from './TransferOwnership';

export default function Permissions() {
  const [accountPermissions, setAccountPermissions] = useState<Record<string, Array<string>>>({});

  // Only show edit icon if current account is owner or modify permissions
  const { address: accountAddress } = useAccount();
  const { id: accountId } = useParams();

  const { isLoading: loadingAccountPermissions, data: permissionData } = useSynthetixRead({
    functionName: 'getAccountPermissions',
    args: [accountId],
    enabled: Boolean(accountId),
    select: (data) => {
      return data.reduce(
        (acc, { target, roles }) => ({
          ...acc,
          [target]: roles.map((r: string) => utils.parseBytes32String(r)),
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

  // useSynthetixProxyEvent({
  //   eventName: 'RoleGranted',
  //   listener: (event) => {
  //     const [eventAccountId, role, target] = event;
  //     if (accountId === eventAccountId.toString()) {
  //       console.log('GRANT', event);
  //       const parsedRole = utils.parseBytes32String(role);
  //       if (!accountPermissions[target].includes(parsedRole)) {
  //         setAccountPermissions({
  //           ...accountPermissions,
  //           [target]: [...accountPermissions[target], utils.parseBytes32String(role)],
  //         });
  //       }
  //     }
  //   },
  // });

  // useSynthetixProxyEvent({
  //   eventName: 'RoleRevoked',
  //   listener: (event) => {
  //     const [eventAccountId, role, target] = event;
  //     if (accountId === eventAccountId.toString()) {
  //       console.log('REMOVE', event);
  //       setAccountPermissions({
  //         ...accountPermissions,
  //         [target]: accountPermissions[target].filter((r) => r !== utils.parseBytes32String(role)),
  //       });
  //     }
  //   },
  // });

  const { isLoading: loadingOwner, data: accountOwner } = useAccountRead({
    functionName: 'ownerOf',
    args: [accountId],
    enabled: Boolean(accountId),
  });

  // Need to listen for events to rerender this when changes are made?

  return (
    <Box>
      <Flex mb="2">
        <Heading size="md" mb="1">
          Permissions
        </Heading>
        <Box ml="auto">
          {/* only render below if owner or has modify permissions role */}
          <PermissionsEditor />
        </Box>
      </Flex>
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
            {Object.keys(accountPermissions).map((target) => {
              return <Item key={target} address={target} roles={accountPermissions[target]} />;
            })}
          </Tbody>
        </Table>
      </Stack>
    </Box>
  );
}
