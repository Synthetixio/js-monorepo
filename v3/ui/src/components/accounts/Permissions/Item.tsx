import { FC } from 'react';
import { Tr, Td, Tag } from '@chakra-ui/react';
import { PermissionsEditor } from './PermissionsEditor';
import { Address } from '../../shared/Address';
import { utils } from 'ethers';
interface Props {
  address: string;
  roles: Array<string>;
}

const roleColors: Record<string, string> = {
  stake: 'green',
  burn: 'red',
  'claim rewards': 'blue',
};

export const Item: FC<Props> = ({ address, roles }) => {
  return (
    <Tr>
      <Td py="4" width="200px">
        <Address address={address} />
      </Td>
      <Td>
        {roles.map((r) => (
          <Tag
            key={r}
            colorScheme={roleColors[r]}
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
        {/* only render below if owner or has modify permissions role */}
        <PermissionsEditor address={address} roles={roles} />
      </Td>
    </Tr>
  );
};
