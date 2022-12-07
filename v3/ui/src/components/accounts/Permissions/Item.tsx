import { Tag, Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Address } from '../../shared/Address';
import { PermissionsEditor } from './PermissionsEditor';
interface Props {
  address: string;
  permissions: Array<string>;
}

const permissionColors: Record<string, string> = {
  deposit: 'green',
  burn: 'red',
  'claim rewards': 'blue',
};

export const Item: FC<Props> = ({ address, permissions }) => {
  return (
    <Tr>
      <Td py="4" width="200px">
        <Address address={address} />
      </Td>
      <Td>
        {permissions.map((r) => (
          <Tag
            key={r}
            colorScheme={permissionColors[r]}
            size="sm"
            mr="1"
            my="1"
            textTransform="capitalize"
          >
            {r}
          </Tag>
        ))}
      </Td>
      <Td>
        {/* only render below if owner or has modify permissions */}
        <PermissionsEditor address={address} permissions={permissions} />
      </Td>
    </Tr>
  );
};
